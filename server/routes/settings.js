import express from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all website settings
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all(`SELECT * FROM settings`);
    const settings = {};
    rows.forEach(r => {
      settings[r.key] = r.value;
    });
    res.json({ settings });
  } catch (error) {
    console.error('Fetch settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// UPDATE Website Settings (Admin Protected)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const settingsObject = req.body;

    for (const [key, value] of Object.entries(settingsObject)) {
      await db.run(
        `INSERT INTO settings (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
        [key, String(value)]
      );
    }

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
