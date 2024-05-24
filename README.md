# Indian Cuisine Backend

This is the backend service for the Indian Cuisine web application. It provides APIs to interact with the Indian cuisine dataset.

## Requirements

- Node.js
- npm

## Installation

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

4. The server will run on `http://localhost:5500`.

## API Endpoints

- `GET /api/dishes` - Get all dishes.
- `GET /api/dishes/:name` - Get a dish by name.
- `GET /api/dishes?ingredients=ingredient1,ingredient2` - Get dishes by ingredients.
