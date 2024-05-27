
# Marvel Comic Book Library App

## Overview

This repository contains two applications: a UI and a server. The UI is built using React for quick setup, and the server is a rough implementation to fetch API calls from the Marvel API.

## Project Structure

```
marvel-comic-library/
├── api/       # Server-side code
├── ui/        # Client-side code
└── README.md  # This file
```

## Setup and Running the Applications

### Server

Navigate to the `api` directory and start the server:

```bash
cd api
yarn start
# or
npm run start
```

Note: API keys need to be added in `api/.env`

### UI

Navigate to the `ui` directory and start the UI:

```bash
cd ui
yarn start
# or
npm run start
```

## Current Status

- The basic app is working and allows users to explore Marvel characters and their connections.
- The app is created using `create-react-app` for a fast setup.
- The server implementation is basic and rough, mainly focused on fetching API calls.
- The app is not optimized for performance.
- Some components need to be removed or refactored.

## Approach

1. **Initial Setup:**
   - Setting up the project took considerable time due to the extensive Marvel API documentation.
   - Understanding the problem statement and relationships between various APIs was crucial.

2. **Development Process:**
   - Initially took a wrong approach by creating a component to list series, but later realized it was not logically fitting the requirements.
   - Revisited the problem statement and focused on creating a character graph instead.

3. **Frameworks and Libraries:**
   - Chose frameworks to speed up development:
     - **Material-UI (MUI):** Selected to minimize the time spent on writing CSS.
     - **react-force-graph:** Explored various libraries including D3, but this framework had almost all the needed functionalities, hence chosen.

## Areas of Improvement

1. **Loading Time:**
   - Implementing server-side caching could reduce load times by almost 50%.

2. **Graph Building:**
   - Building the graph currently takes significant time. Need to explore the API further to find potential improvements.

3. **State Management:**
   - State changes impact the graph rendering, causing the page to go blank while the graph rebuilds. Optimizations are needed here.

4. **Code Quality:**
   - A substantial amount of code can be cleaned up or improved.

5. **Testing:**
   - While basic functionality is in place, there are several edge cases that need to be handled. The main focus was on building a solid foundation, setting up the component structure, passing data, and managing state. Internals can be improved.

## Future Enhancements

- **Performance Optimization:** Focus on optimizing the graph rendering and API calls.
- **Error Handling:** Add detailed error handling and loading states.
- **Code Refactoring:** Clean up the existing code and remove unnecessary components.
- **Testing:** Add comprehensive tests to cover edge cases and ensure robustness.
