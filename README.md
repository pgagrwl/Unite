# 1Book Backend

## Overview

This is the backend service for the 1Book application, built with Node.js and Express. It provides RESTful APIs for managing users, books, and related resources.

## Features

- User authentication and authorization (JWT)
- CRUD operations for books and users
- Search and filter functionality
- MongoDB integration via Mongoose

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB

### Installation

```bash
git clone https://github.com/pgagrwl/Unite.git Unite-backend
cd Unite-backend
git checkout backend
npm install
```

### Configuration

Create a `.env` file in the root directory and set the following variables:

```
BASE_URL=https://api.1inch.dev
API_KEY=<1INCH API KEY>
MONGO_URI=mongodb+srv://<mongousername>:<password>@....
```

### Running the Server

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

## API Documentation

See [API.md](API.md) for detailed API endpoints and usage.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
