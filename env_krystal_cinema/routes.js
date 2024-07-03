const express = require('express');
const router = express.Router();
const db = require('./db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/book', async (req, res) => {
  const { name, movie, date, time, is_3d, tickets } = req.body;

  if (!name || !movie || !date || !time || tickets == null || is_3d == null) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO bookings (name, movie, date, time, is_3d, tickets) VALUES (?, ?, ?, ?, ?, ?)',
      [name, movie, date, time, is_3d, tickets]
    );

    const [similarMovies] = await db.query(
      'SELECT * FROM movies WHERE genre = (SELECT genre FROM movies WHERE title = ?) AND title != ?',
      [movie, movie]
    );

    res.status(201).json({ message: 'Booking created', bookingId: result.insertId, similarMovies });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const [bookings] = await db.query('SELECT * FROM bookings');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

router.get('/booking/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [booking] = await db.query('SELECT * FROM bookings WHERE id = ?', [id]);

    if (booking.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

module.exports = router;
