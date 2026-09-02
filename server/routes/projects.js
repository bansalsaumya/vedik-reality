import express from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

// Public GET Projects
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const { is_featured } = req.query;

    let query = `SELECT * FROM projects WHERE 1=1`;
    const params = [];

    if (is_featured !== undefined) {
      query += ` AND is_featured = ?`;
      params.push(Number(is_featured));
    }

    query += ` ORDER BY id DESC`;

    const projects = await db.all(query, params);
    const formatted = projects.map(pr => ({
      ...pr,
      amenities: pr.amenities ? JSON.parse(pr.amenities) : [],
      images: pr.images ? JSON.parse(pr.images) : [],
    }));

    res.json({ projects: formatted });
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Admin CREATE Project
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { name, location, type, price_range, status, is_featured, description, amenities, images, rera_number } = req.body;

    let slug = slugify(name);
    const existing = await db.get(`SELECT id FROM projects WHERE slug = ?`, [slug]);
    if (existing) slug = `${slug}-${Date.now()}`;

    const result = await db.run(
      `INSERT INTO projects (slug, name, location, type, price_range, status, is_featured, description, amenities, images, rera_number)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, name, location, type, price_range, status, is_featured ? 1 : 0, description, JSON.stringify(amenities || []), JSON.stringify(images || []), rera_number || '']
    );

    res.status(201).json({ message: 'Project created successfully', id: result.lastID });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Admin UPDATE Project
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { id } = req.params;
    const { name, location, type, price_range, status, is_featured, description, amenities, images, rera_number } = req.body;

    await db.run(
      `UPDATE projects SET
        name = COALESCE(?, name),
        location = COALESCE(?, location),
        type = COALESCE(?, type),
        price_range = COALESCE(?, price_range),
        status = COALESCE(?, status),
        is_featured = COALESCE(?, is_featured),
        description = COALESCE(?, description),
        amenities = COALESCE(?, amenities),
        images = COALESCE(?, images),
        rera_number = COALESCE(?, rera_number)
       WHERE id = ?`,
      [
        name, location, type, price_range, status,
        is_featured !== undefined ? (is_featured ? 1 : 0) : undefined,
        description,
        amenities ? JSON.stringify(amenities) : undefined,
        images ? JSON.stringify(images) : undefined,
        rera_number, id
      ]
    );

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Admin DELETE Project
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { id } = req.params;
    await db.run(`DELETE FROM projects WHERE id = ?`, [id]);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
