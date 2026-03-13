const express = require("express");
const cors    = require("cors");
const projectsRouter = require("./routes/projects");
const contactRouter  = require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/projects", projectsRouter);
app.use("/api/contact",  contactRouter);
app.get("/api", (req, res) => {
  res.json({ message: "API is running ✅" });
});

module.exports = app;
