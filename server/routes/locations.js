import express from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

// GET Locations with dynamic property counts
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const locations = await db.all(`SELECT * FROM locations ORDER BY is_popular DESC, name ASC`);

    // Dynamically recount properties per location
    const updated = await Promise.all(
      locations.map(async (loc) => {
        const countRow = await db.get(
          `SELECT COUNT(*) as cnt FROM properties WHERE location LIKE ?`,
          [`%${loc.name}%`]
        );
        return {
          ...loc,
          property_count: countRow ? countRow.cnt : loc.property_count
        };
      })
    );

    res.json({ locations: updated });
  } catch (error) {
    console.error('Fetch locations error:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// Admin CREATE Location
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { name, image, description, is_popular = 1 } = req.body;

    let slug = slugify(name);
    const result = await db.run(
      `INSERT INTO locations (name, slug, image, description, is_popular) VALUES (?, ?, ?, ?, ?)`,
      [name, slug, image, description || '', is_popular ? 1 : 0]
    );

    res.status(201).json({ message: 'Location created', id: result.lastID });
  } catch (error) {
    console.error('Create location error:', error);
    res.status(500).json({ error: 'Failed to create location' });
  }
});

// Admin DELETE Location
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { id } = req.params;
    await db.run(`DELETE FROM locations WHERE id = ?`, [id]);
    res.json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

export default router;
