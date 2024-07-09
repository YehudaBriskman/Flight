# Flight_Project

By Yehuda Briskman

## Overview

This project is a full-stack application for managing flight data. The server is built with Node.js and Express, while the client is built with React. Follow the steps below to set up and run the application.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/get-npm)
- A MongoDB database (you can create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Server Setup

### Step 1: Install Dependencies

Open the `server` folder in Visual Studio Code (VSC) and enter the terminal. Type:

```
npm i
```

This will download all the modules listed in `package.json`.

### Step 2: Create Environment Variables File

In the same initial layer within the `server` directory, create a file named `.env`. This file will contain your most important information, such as your secret passwords.

Inside the file, write these values:

```
PORT=3001
URLS="http://localhost:5173"
MONGO_URI="mongodb+srv:>>>>>>>>>>>>>>some_URL_here<<<<<<<<<<<<<"
MODE="development"
SECRET_KEY="<password>"
```

- `PORT` is the port for running the server.
- `URLS` specifies which URLs can access the server.
- `MONGO_URI` is the access URL to your MongoDB database.
- `MODE` sets the environment mode (development/production).
- `SECRET_KEY` is a secret key for verifying tokens.

### Step 3: Run the Server

Now, go back to the command line and run the server using the command:

```
npm run dev
```

## Client Setup

### Step 1: Install Dependencies

Open the `client` folder in VSC and enter the terminal. Type:

```sh
npm i
```

This will download all the modules listed in `package.json`.

### Step 2: Run the Client

Now, go back to the command line and run the client using the command:

```
npm run dev
```

## Troubleshooting

If you encounter any issues during setup, consider the following:

- Ensure all dependencies are correctly installed.
- Verify that your `.env` file is properly configured.
- Check if your MongoDB URI is correct and accessible.

For further assistance, feel free to reach out or consult the project documentation.
