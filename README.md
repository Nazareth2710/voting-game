# Voting Game 🎉

This project was created for the DataArt Winter IT Camp 2025 workshop.

## Overview 🚀

Voting Game is a fun web application where users can vote on daily jokes using emoji reactions! The project consists of:

- A **React** frontend built with **Tailwind CSS v3** for a modern, responsive UI.
- A **Node.js/Express** backend that handles API requests and data persistence.
- **MongoDB Atlas** for cloud-based data storage, with **Mongoose** for database interaction.

## Technologies Used 💻

### Frontend
- **React**
- **Tailwind CSS v3**

### Backend
- **Node.js** & **Express**
- **MongoDB Atlas**
- **Mongoose**

## Installation & Setup 🛠️

### Prerequisites
- Node.js
- A MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone https://github.com/Nazareth2710/voting-game.git
cd voting-game
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a .env file in the backend folder with the following content, but **do not forget make necessary changes** (For more details of connecting Atlas cluster with app, check out [this guide](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/#connect-to-your-atlas-cluster)):
```env
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.2zkoa1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

Start the backend server:
```bash
node server.js
```

### 3. Set Up the Frontend

Navigate to the frontend folder, install dependencies and start the app:
```bash
cd ../frontend
npm install
npm start
```