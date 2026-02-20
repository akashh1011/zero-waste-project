# Smart Waste API — MAVU

A robust backend API for a smart waste management platform built with **Node.js**, **Express**, **MongoDB**, and **Zod** validation.

---

## Folder Structure

```
zero-waste-assignment/
├── controllers/
│   └── assignmentController.js
├── database/
│   └── dbconfig.js
├── models/
│   └── assignmentModel.js
├── routes/
│   └── assignmentRoute.js
├── validations/
│   └── assignmentValidation.js
├── .env
├── .gitignore
├── constants.js
├── package.json
└── server.js
```

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB (Mongoose)
- **Validation** — Zod
- **Environment Variables** — dotenv

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/zero-waste-assignment.git
cd zero-waste-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the server

```bash
npm start
```

Server will run on `http://localhost:8000`

---

## API Endpoint

### POST `/waste/upload`

Upload waste data for a user.

**Request Body:**

```json
{
  "userId": "u_12345",
  "wasteType": "plastic",
  "weightInKg": 5.5,
  "location": {
    "latitude": 28.7041,
    "longitude": 77.1025
  }
}
```

**Success Response `201`:**

```json
{
  "message": "Waste entry created successfully",
  "data": {
    "userId": "u_12345",
    "wasteType": "plastic",
    "weightInKg": 5.5,
    "location": {
      "latitude": 28.7041,
      "longitude": 77.1025
    },
    "createdAt": "2026-02-19T18:00:00.000Z"
  },
  "calculatedCoins": 55
}
```

**Validation Error Response `400`:**

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "wasteType",
      "message": "wasteType must be one of: plastic, paper, metal, organic"
    }
  ]
}
```

---

## Validation Rules

| Field | Rule |
|-------|------|
| `userId` | Required, cannot be empty |
| `wasteType` | Must be one of: `plastic`, `paper`, `metal`, `organic` |
| `weightInKg` | Must be a number greater than `0.1` |
| `location.latitude` | Must be between `-90` and `90` |
| `location.longitude` | Must be between `-180` and `180` |
| `location` | Coordinates must be **inside India** only |

---

##  Karma Coin Calculation

Coins are calculated based on waste type and weight:

| Waste Type | Rate |
|------------|------|
| Plastic | 10 coins/kg |
| Paper | 5 coins/kg |
| Metal | 15 coins/kg |
| Organic | 2 coins/kg |

**Formula:** `calculatedCoins = rate × weightInKg`

---

##  India Location Validation

Requests are rejected if coordinates fall outside India's bounding box:

| | Min | Max |
|-|-----|-----|
| Latitude | 8.4° | 37.6° |
| Longitude | 68.7° | 97.25° |

**Error message:** `"Invalid location: Service available only in India"`

---

##  Base URL

```
If you are using PORT=8000 in env then, http://localhost:8000

Deployed Base URL = https://zero-waste-project-1.onrender.com
```

##  Deployed URL of RENDOR

```
https://zero-waste-project-1.onrender.com

```

##  Video Link (Google Drive)

https://drive.google.com/file/d/1ELX0ocjZJmgHe5rjrdJehfyVjoMNfUt_/view?usp=sharing



---

##  Author

**Akash Prajapati**
