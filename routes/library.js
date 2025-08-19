const express = require("express");
const router = express.Router();

let books = [
  { id: 1, nama_buku: "Malin Kundang" },
  { id: 2, nama_buku: "Resep Masakan" },
];

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Buku tidak ditemukan!");
  res.json(book);
});

router.post("/", (req, res) => {
  if (!req.body.nama_buku) return res.status(400).json({ error: "Books name is required" });
  const newBook = {
    id: books.length + 1,
    nama_buku: req.body.nama_buku,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Buku tidak ditemukan");
  if (!req.body.nama_buku) return res.status(400).json({ error: "Books name is required" });
  book.nama_buku = req.body.nama_buku;
  res.json(book);
});

router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send("Buku tidak ditemukan!");

  books.splice(bookIndex, 1);
  res.status(204).send();
});

module.exports = router;