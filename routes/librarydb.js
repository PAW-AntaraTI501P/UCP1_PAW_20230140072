const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM buku', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM buku WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Buku tidak ditemukan');
        res.json(results[0]);
    });
});

router.post('/', (req, res) => {
    const { nama_buku } = req.body;
    if (!nama_buku || nama_buku.trim() === '') {
        return res.status(400).send('Nama Buku tidak boleh kosong');
    }

    db.query('INSERT INTO buku (nama_buku) VALUES (?)', [nama_buku.trim()], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newBook = { id: results.insertId, nama_buku: nama_buku.trim(), completed: false };
        res.status(201).json(newBook);
    });
});

router.put('/:id', (req, res) => {
    const { nama_buku } = req.body;

    db.query('UPDATE buku SET nama_buku = ? WHERE id = ?', [nama_buku, req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Buku tidak ditemukan');
        res.json({ id: req.params.id, nama_buku });
    });
});

router.delete('/:id', (req, res) => {
    db.query('DELETE FROM buku WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Buku tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;