require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const libraryRoutes = require("./routes/librarydb.js");
const { books } = require("./routes/library.js");
const db = require("./database/db");
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

app.use("/perpustakaan", libraryRoutes);

app.get("/books-data", (req, res) => {
  res.json(books);
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM buku", (err, todos) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("books", {
        books: books,
      layout: "layouts/main-layout",
    });
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
  });
});

app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});