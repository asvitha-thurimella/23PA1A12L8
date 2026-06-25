const express = require("express");
const logger = require("./logger");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Campus notification service running"
  });
});

app.listen(5000);