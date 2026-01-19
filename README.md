# Job Listing Portal

A full-stack job listing application built with React and Node.js/Express.

## Project Structure

```
Job_Listing_Portal/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/          # Node.js/Express backend
│   ├── server.js
│   ├── .env
│   └── package.json
└── package.json     # Root package.json
```

## Features

- React frontend with modern UI
- Express.js REST API backend
- Job listings with CRUD operations
- Proxy configuration for API calls
- Concurrent development mode

## Installation

1. Install all dependencies:
```bash
npm run install-all
```

Or install separately:
```bash
# Install client dependencies
npm run install-client

# Install server dependencies
npm run install-server
```

## Running the Application

### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

This will start:
- React frontend on http://localhost:3000
- Express backend on http://localhost:5000

### Run Separately

**Frontend only:**
```bash
npm run client
```

**Backend only:**
```bash
npm run server
```

## API Endpoints

- `GET /api` - Welcome message
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job

## Technologies Used

### Frontend
- React 18
- React Scripts
- CSS3

### Backend
- Node.js
- Express.js
- CORS
- dotenv

## Environment Variables

Create a `.env` file in the server directory:
```
PORT=5000
NODE_ENV=development
```

## License

ISC
