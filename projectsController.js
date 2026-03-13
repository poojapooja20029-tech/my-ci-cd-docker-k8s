const path = require("path");
const fs   = require("fs");
const DATA_PATH = path.join(__dirname, "../data/projects.json");

const getAllProjects = (req, res) => {
  try {
    const raw      = fs.readFileSync(DATA_PATH, "utf-8");
    const projects = JSON.parse(raw);
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load projects." });
  }
};
module.exports = { getAllProjects };
