const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/users");
const sequelize = require("./utils/database");
const User = require("./models/user");
const PORT = process.env.PORT || 5002;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// CORS Policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

// Test route
app.get("/", (req, res, next) => {
  res.send("The API That Works!");
});

// Routes
app.use("/users", userRoutes);

// Error Handling
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status = err.status || 500;
  res.json({ message: err.message || "Internal Server Error" });
});

// Sync database then start server
sequelize
  .sync()
  .then((result) => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
