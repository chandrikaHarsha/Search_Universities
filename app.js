const express = require("express");
const path = require("path");
const db = require("./configuration/config");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  const file = path.join(__dirname, "/index");
  res.render(file);
});

app.post("/add-fav-university", async (req, res) => {
  const { name, user } = req.body; // Destructure the request body
  console.log(req.body); // For debugging
  //
  const table = "fav_universities";
  const sql = `INSERT INTO ${table} (university_name, user_name) VALUES (?, ?)`;
  try {
    // Execute the query with sanitized input
    const [result] = await db.query(sql, [name, user]);
    // Check if any rows were affected
    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "University added to favorites successfully!" });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to add the university to favorites." });
    }
  } catch (err) {
    // Log the error and send a generic response
    console.error("Error adding university:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("app is running at port 4000");
});
