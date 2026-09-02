import express from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Log interactive click/view event
router.post('/event', async (req, res) => {
  try {
    const { event_type, target_id, metadata } = req.body;
    if (!event_type) return res.status(400).json({ error: 'event_type required' });

    const db = await getDb();
    await db.run(
      `INSERT INTO analytics_events (event_type, target_id, metadata) VALUES (?, ?, ?)`,
      [event_type, target_id || null, metadata ? JSON.stringify(metadata) : null]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Analytics event log error:', error);
    res.status(500).json({ error: 'Failed to log event' });
  }
});

// GET Dashboard Overview Metrics (Admin Protected)
router.get('/metrics', authenticateAdmin, async (req, res) => {
  try {
    const db = await getDb();

    const totalProperties = await db.get(`SELECT COUNT(*) as count FROM properties`);
    const activeProperties = await db.get(`SELECT COUNT(*) as count FROM properties WHERE status = 'Available'`);
    const featuredProperties = await db.get(`SELECT COUNT(*) as count FROM properties WHERE is_featured = 1`);
    const totalProjects = await db.get(`SELECT COUNT(*) as count FROM projects`);
    
    const totalLeads = await db.get(`SELECT COUNT(*) as count FROM leads`);
    const newLeads = await db.get(`SELECT COUNT(*) as count FROM leads WHERE status = 'NEW'`);
    const contactedLeads = await db.get(`SELECT COUNT(*) as count FROM leads WHERE status = 'CONTACTED'`);
    const interestedLeads = await db.get(`SELECT COUNT(*) as count FROM leads WHERE status = 'INTERESTED'`);
    const convertedLeads = await db.get(`SELECT COUNT(*) as count FROM leads WHERE status = 'CONVERTED'`);

    const whatsappClicks = await db.get(`SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'whatsapp_click'`);
    const callClicks = await db.get(`SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'call_click'`);

    // Most Viewed Properties
    const mostViewed = await db.all(
      `SELECT id, title, price, location, views FROM properties ORDER BY views DESC LIMIT 5`
    );

    // Lead Sources breakdown
    const leadSources = await db.all(
      `SELECT source, COUNT(*) as count FROM leads GROUP BY source ORDER BY count DESC`
    );

    res.json({
      metrics: {
        totalProperties: totalProperties.count,
        activeProperties: activeProperties.count,
        featuredProperties: featuredProperties.count,
        totalProjects: totalProjects.count,
        totalLeads: totalLeads.count,
        newLeads: newLeads.count,
        contactedLeads: contactedLeads.count,
        interestedLeads: interestedLeads.count,
        convertedLeads: convertedLeads.count,
        whatsappClicks: whatsappClicks.count,
        callClicks: callClicks.count,
      },
      mostViewed,
      leadSources
    });
  } catch (error) {
    console.error('Analytics metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics metrics' });
  }
});

export default router;
