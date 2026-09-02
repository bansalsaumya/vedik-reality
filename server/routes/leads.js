import express from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// CREATE Lead (Public form submission)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, property_title, property_id, message, source = 'Website' } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone number are required' });
    }

    const db = await getDb();
    const result = await db.run(
      `INSERT INTO leads (name, phone, email, property_title, property_id, message, source, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        email || '',
        property_title || 'General Enquiry',
        property_id || null,
        message || '',
        source,
        'NEW',
        'Lead submitted via website'
      ]
    );

    // Track analytics lead event
    await db.run(
      `INSERT INTO analytics_events (event_type, target_id, metadata) VALUES (?, ?, ?)`,
      ['lead_submit', result.lastID.toString(), JSON.stringify({ name, phone, property: property_title, source })]
    );

    res.status(201).json({
      message: 'Thank you! Your enquiry has been received. Our luxury estate advisor will connect with you shortly.',
      leadId: result.lastID
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    res.status(500).json({ error: 'Failed to process lead inquiry' });
  }
});

// GET All Leads (Admin Protected)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { status, source, search } = req.query;

    let query = `SELECT * FROM leads WHERE 1=1`;
    const params = [];

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }

    if (source) {
      query += ` AND source = ?`;
      params.push(source);
    }

    if (search) {
      query += ` AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR property_title LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ` ORDER BY id DESC`;

    const leads = await db.all(query, params);
    res.json({ leads });
  } catch (error) {
    console.error('Fetch leads error:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// UPDATE Lead Status / Notes (Admin Protected)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { id } = req.params;
    const { status, notes } = req.body;

    const lead = await db.get(`SELECT * FROM leads WHERE id = ?`, [id]);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    await db.run(
      `UPDATE leads SET
        status = COALESCE(?, status),
        notes = COALESCE(?, notes)
       WHERE id = ?`,
      [status, notes, id]
    );

    res.json({ message: 'Lead updated successfully' });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE Lead (Admin Protected)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { id } = req.params;

    await db.run(`DELETE FROM leads WHERE id = ?`, [id]);
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

export default router;
