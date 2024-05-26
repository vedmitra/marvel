const express = require("express");
const https = require("https");
const dotenv = require("dotenv");
const crypto = require("crypto");
const url = require("url");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS to allow requests from localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const generateHash = (ts, privateKey, publicKey) => {
  return crypto
    .createHash("md5")
    .update(ts + privateKey + publicKey)
    .digest("hex");
};

const invoker = (req, res, path) => {
  const ts = new Date().getTime().toString();
  const publicKey = process.env.PUBLIC_KEY;
  const privateKey = process.env.PRIVATE_KEY;
  const hash = generateHash(ts, privateKey, publicKey);
  const offset = req?.request?.offset || 0;
  const limit = req?.query?.limit || 100;
  const apiUrl = `https://gateway.marvel.com/v1/public/${path}?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`;
  console.log(res);
  console.log(`Request URL: ${apiUrl}`);
  console.log(`Timestamp: ${ts}`);
  console.log(`Public Key: ${publicKey}`);
  console.log(`Hash: ${hash}`);

  const options = url.parse(apiUrl);

  options.method = "GET";

  const request = https.request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      if (response.statusCode === 200) {
        res.json(JSON.parse(data));
      } else {
        console.error(`Response Code: ${response.statusCode}`);
        console.error(`Response: ${data}`);
        res.status(response.statusCode).send(data);
      }
    });
  });

  request.on("error", (e) => {
    console.error(`Request error: ${e.message}`);
    res.status(500).send("Error fetching data from Marvel API");
  });

  request.end();
};

app.get("/api/series", (req, res) => {
  invoker(req, res, "series");
});
app.get("/api/characters/:id/comics", (req, res) => {
  const id = req?.params?.id;
  invoker(req, res, `characters/${id}/comics`);
});
app.get("/api/characters", (req, res) => {
  invoker(req, res, `characters`);
});

app.get("/api/series/:id/characters", (req, res) => {
  const id = req?.params?.id;
  invoker(req, res, `series/${id}/characters`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
