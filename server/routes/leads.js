import express from 'express';
import nodemailer from 'nodemailer';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Helper to send instant Email Alert to Owner
const sendEmailLeadNotification = async (leadData) => {
  try {
    const appPassword = process.env.NOTIFICATION_EMAIL_PASS || 'fwumrtvllaszldon';
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NOTIFICATION_EMAIL || 'info.vedikrealty@gmail.com',
        pass: appPassword
      }
    });

    const mailOptions = {
      from: `"Vedik Realty Lead Alert" <info.vedikrealty@gmail.com>`,
      to: 'info.vedikrealty@gmail.com',
      subject: `🚨 NEW LEAD ALERT: ${leadData.name} - ${leadData.phone}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #FAF7F2; border: 1px solid #C59B27; border-radius: 12px;">
          <h2 style="color: #1A1A1A; margin-top: 0;">🏡 New Lead Submitted on Vedik Realty Website</h2>
          <hr style="border: 0; border-top: 1px solid #C59B27;" />
          <p><strong>Customer Name:</strong> ${leadData.name}</p>
          <p><strong>Mobile Number:</strong> <a href="tel:${leadData.phone}">${leadData.phone}</a></p>
          <p><strong>Email Address:</strong> ${leadData.email || 'N/A'}</p>
          <p><strong>Property Interest:</strong> ${leadData.property_title || 'General Property Inquiry'}</p>
          <p><strong>Inquiry Source:</strong> ${leadData.source || 'Website'}</p>
          <p><strong>Customer Message:</strong> ${leadData.message || 'No additional message.'}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 11px; color: #666;">This is an automated instant alert from your Vedik Realty website system.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Instant Lead Email Notification sent to info.vedikrealty@gmail.com');
// Helper to send instant Text SMS Alert to Mobile Phone (+91 90538 48222)
const sendSmsLeadNotification = async (leadData) => {
  try {
    const smsApiKey = process.env.FAST2SMS_API_KEY;
    if (!smsApiKey) return;

    const messageText = `Vedik Realty Lead: ${leadData.name} (${leadData.phone}) interested in ${leadData.property_title || 'Property'}. Source: ${leadData.source}`;
    
    await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': smsApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',
        message: messageText,
        language: 'english',
        flash: 0,
        numbers: '9053848222'
      })
    });
    console.log('Instant Lead SMS Alert sent to +91 90538 48222');
  } catch (err) {
    console.error('SMS alert error:', err.message);
  }
};

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

    // Send instant email & SMS alerts
    await Promise.allSettled([
      sendEmailLeadNotification({ name, phone, email, property_title, message, source }),
      sendSmsLeadNotification({ name, phone, email, property_title, message, source })
    ]);

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
