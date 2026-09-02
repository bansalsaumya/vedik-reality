import express from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Helper to create slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// GET all properties with filtering, search & pagination
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const {
      location,
      type,
      category,
      status,
      bhk,
      minPrice,
      maxPrice,
      search,
      is_featured,
      sort,
      limit = 50,
      offset = 0
    } = req.query;

    let query = `SELECT * FROM properties WHERE 1=1`;
    const params = [];

    if (location) {
      query += ` AND location LIKE ?`;
      params.push(`%${location}%`);
    }

    if (type) {
      query += ` AND type = ?`;
      params.push(type);
    }

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }

    if (bhk) {
      query += ` AND bhk LIKE ?`;
      params.push(`%${bhk}%`);
    }

    if (is_featured !== undefined) {
      query += ` AND is_featured = ?`;
      params.push(Number(is_featured));
    }

    if (minPrice) {
      query += ` AND price_numeric >= ?`;
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += ` AND price_numeric <= ?`;
      params.push(Number(maxPrice));
    }

    if (search) {
      query += ` AND (title LIKE ? OR description LIKE ? OR location LIKE ? OR address LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    // Sort order
    if (sort === 'price_asc') {
      query += ` ORDER BY price_numeric ASC`;
    } else if (sort === 'price_desc') {
      query += ` ORDER BY price_numeric DESC`;
    } else if (sort === 'views') {
      query += ` ORDER BY views DESC`;
    } else {
      query += ` ORDER BY id DESC`;
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const properties = await db.all(query, params);

    // Format JSON fields
    const formatted = properties.map(p => ({
      ...p,
      amenities: p.amenities ? JSON.parse(p.amenities) : [],
      images: p.images ? JSON.parse(p.images) : [],
    }));

    // Get total count for pagination
    const totalRow = await db.get(`SELECT COUNT(*) as count FROM properties`);

    res.json({
      properties: formatted,
      total: totalRow.count
    });
  } catch (error) {
    console.error('Properties fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET Single Property by ID or Slug
router.get('/:slugOrId', async (req, res) => {
  try {
    const db = await getDb();
    const { slugOrId } = req.params;

    const property = await db.get(
      `SELECT * FROM properties WHERE slug = ? OR id = ?`,
      [slugOrId, slugOrId]
    );

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Increment View Counter asynchronously
    db.run(`UPDATE properties SET views = views + 1 WHERE id = ?`, [property.id]);
    db.run(
      `INSERT INTO analytics_events (event_type, target_id, metadata) VALUES (?, ?, ?)`,
      ['property_view', property.id.toString(), JSON.stringify({ title: property.title })]
    );

    res.json({
      ...property,
      amenities: property.amenities ? JSON.parse(property.amenities) : [],
      images: property.images ? JSON.parse(property.images) : [],
    });
  } catch (error) {
    console.error('Single property error:', error);
    res.status(500).json({ error: 'Failed to fetch property details' });
  }
});

// CREATE Property (Admin Protected)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const {
      title,
      type,
      category = 'Sale',
      price,
      price_numeric = 0,
      location,
      address,
      bhk,
      area,
      status = 'Available',
      is_featured = 0,
      description,
      amenities = [],
      images = [],
      video_url,
      rera_number,
      builder_name,
      meta_title,
      meta_description
    } = req.body;

    if (!title || !type || !price || !location || !area) {
      return res.status(400).json({ error: 'Missing required property fields' });
    }

    let slug = slugify(title);
    // ensure unique slug
    const existing = await db.get(`SELECT id FROM properties WHERE slug = ?`, [slug]);
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const result = await db.run(
      `INSERT INTO properties (
        slug, title, type, category, price, price_numeric, location, address, bhk, area, status,
        is_featured, description, amenities, images, video_url, rera_number, builder_name, meta_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug, title, type, category, price, price_numeric, location, address, bhk, area, status,
        is_featured ? 1 : 0, description, JSON.stringify(amenities), JSON.stringify(images),
        video_url || '', rera_number || '', builder_name || 'Vedik Reality Partner',
        meta_title || title, meta_description || description.slice(0, 160)
      ]
    );

    res.status(201).json({
      message: 'Property created successfully',
      id: result.lastID,
      slug
    });
  } catch (error) {
    console.error('Property creation error:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// UPDATE Property (Admin Protected)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { id } = req.params;
    const {
      title,
      type,
      category,
      price,
      price_numeric,
      location,
      address,
      bhk,
      area,
      status,
      is_featured,
      description,
      amenities,
      images,
      video_url,
      rera_number,
      builder_name,
      meta_title,
      meta_description
    } = req.body;

    const prop = await db.get(`SELECT * FROM properties WHERE id = ?`, [id]);
    if (!prop) {
      return res.status(404).json({ error: 'Property not found' });
    }

    await db.run(
      `UPDATE properties SET
        title = COALESCE(?, title),
        type = COALESCE(?, type),
        category = COALESCE(?, category),
        price = COALESCE(?, price),
        price_numeric = COALESCE(?, price_numeric),
        location = COALESCE(?, location),
        address = COALESCE(?, address),
        bhk = COALESCE(?, bhk),
        area = COALESCE(?, area),
        status = COALESCE(?, status),
        is_featured = COALESCE(?, is_featured),
        description = COALESCE(?, description),
        amenities = COALESCE(?, amenities),
        images = COALESCE(?, images),
        video_url = COALESCE(?, video_url),
        rera_number = COALESCE(?, rera_number),
        builder_name = COALESCE(?, builder_name),
        meta_title = COALESCE(?, meta_title),
        meta_description = COALESCE(?, meta_description)
       WHERE id = ?`,
      [
        title, type, category, price, price_numeric, location, address, bhk, area, status,
        is_featured !== undefined ? (is_featured ? 1 : 0) : undefined,
        description,
        amenities ? JSON.stringify(amenities) : undefined,
        images ? JSON.stringify(images) : undefined,
        video_url, rera_number, builder_name, meta_title, meta_description, id
      ]
    );

    res.json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Property update error:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

// DELETE Property (Admin Protected)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { id } = req.params;

    const result = await db.run(`DELETE FROM properties WHERE id = ?`, [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Property delete error:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

export default router;
