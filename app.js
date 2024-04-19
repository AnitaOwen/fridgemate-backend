// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
// const { authenticateToken } = require('./middlewares/authenticateToken')

const authController = require("./controllers/authController");
const fridgesController = require('./controllers/fridgesController')


// CONFIGURATION
const app = express();

// cron job to attempt to prevent render from sleeping
// cron.schedule("*/5 * * * *", () => {
//   const currentTime = new Date().toLocaleString("en-US", {
//     timeZone: "America/New_York",
//   });
//   console.log(`Running a task every 5 minutes. Current time: ${currentTime}`);
// });

// MIDDLEWARE change origin to your frontend netlify address for deployment
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: ["https://main--fridgem8.netlify.app", "http://localhost:3000"]
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authController);
app.use('/api/fridges', fridgesController)

// ROUTES
app.get("/", (_req, res) => {
  res.send("Welcome to Fridge M8!");
});

// 404 PAGE
app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
