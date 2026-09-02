import express from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET Testimonials
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const testimonials = await db.all(`SELECT * FROM testimonials WHERE is_published = 1 ORDER BY id DESC`);
    res.json({ testimonials });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Admin CREATE Testimonial
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { client_name, location, property_purchased, content, rating = 5 } = req.body;
    const result = await db.run(
      `INSERT INTO testimonials (client_name, location, property_purchased, content, rating)
       VALUES (?, ?, ?, ?, ?)`,
      [client_name, location, property_purchased || '', content, rating]
    );
    res.status(201).json({ message: 'Testimonial added', id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

// Admin DELETE Testimonial
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    await db.run(`DELETE FROM testimonials WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

export default router;
