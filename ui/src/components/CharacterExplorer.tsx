import React, {
  useCallback,
  useEffect,
  useRef,
  useState
  } from 'react';
import { SeriesItem } from '../types/SeriesList';
import { useSeries } from '../hooks/useSeries';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Container,
  Box,
  Modal,
} from "@mui/material";

export const CharacterExplorer: React.FC = () => {
  const [isCharacterModalOpen, setIsOpenCharaterModal] = useState(false);
  const { fetchSeriesList, loading, seriesList, nextPage, prevPage, error } =
    useSeries();
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      fetchSeriesList();
      isInitialRender.current = false;
    }
  }, [isInitialRender, fetchSeriesList]);

  const openCharacterModal = useCallback(() => {
    setIsOpenCharaterModal(true);
  }, []);
  const closeCharacterModal = useCallback(() => {
    setIsOpenCharaterModal(false);
  }, []);
  return (
    <div>
      <h1>Marvel Character Explorer</h1>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {seriesList.map((series: SeriesItem) => (
                <Grid item key={series.id} xs={12} sm={6} md={4} lg={3}>
                  <Box display="flex" flexDirection="column" height="100%">
                    <Card
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      onClick={openCharacterModal}
                    >
                      <CardMedia
                        component="img"
                        alt={series.title}
                        height="140"
                        image={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {series.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={2} justifyContent="center" marginTop={2}>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={prevPage}
                  disabled={loading}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={nextPage}
                  disabled={loading}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
      {isCharacterModalOpen && (
        <Modal
          open={true}
          onClose={closeCharacterModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>test</div>
        </Modal>
      )}
    </div>
  );
};
