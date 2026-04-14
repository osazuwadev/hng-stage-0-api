# HNG Stage 0 - Gender Classification API

A REST API that predicts gender from a name using the Genderize.io API.

## Links

- GitHub Repository: https://github.com/osazuwadev/hng-stage-0-api

- Public API base URL:
https://hng-stage-0-api-production.up.railway.app

## Tech Stack

- Node.js
- Express.js
- Axios
- Genderize.io API

## Setup & Installation

    bash
# clone the repo
git clone https://github.com/osazuwadev/hng-stage-0-api.git

# move into the folder
cd hng-stage-0-api

# install dependencies
npm install

# run in development
npm run dev

# run in production
npm start


## Base URL
https://hng-stage-0-api-production.up.railway.app


## Endpoint

### GET /api/classify

Predicts the gender of a given name.


**Example Request:**

GET /api/classify?name=Nelson


**Success Response:**
  json
{
  "status": "success",
  "data": {
    "name": "nelson",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 281761,
    "is_confident": true,
    "processed_at": "2026-04-14T22:09:28.129Z"
  }
}


## Error Responses

### 400 - Missing or empty name
    json
{
  "status": "error",
  "message": "name query parameter is required"
}


### 422 - Name is a number not a string
    json
{
  "status": "error",
  "message": "name must be a string, not a number"
}


### 404 - No prediction available
  json
{
  "status": "error",
  "message": "No prediction available for the provided name"
}


### 502 - Genderize API unreachable
    json
{
  "status": "error",
  "message": "Failed to reach Genderize API, please try again"
}


## Edge Cases

- Name not in Genderize database returns 404
- Genderize API down or unreachable returns 502
- Empty or missing name returns 400
- A number instead of a name returns 422