import express from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET Services
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const services = await db.all(`SELECT * FROM services WHERE is_active = 1 ORDER BY id ASC`);
    res.json({ services });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Admin CREATE Service
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { title, description, icon = 'Home' } = req.body;
    const result = await db.run(
      `INSERT INTO services (title, description, icon) VALUES (?, ?, ?)`,
      [title, description, icon]
    );
    res.status(201).json({ message: 'Service created', id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Admin DELETE Service
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    await db.run(`DELETE FROM services WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
