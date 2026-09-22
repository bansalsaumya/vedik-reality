import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance = null;

export async function getDb() {
  if (dbInstance) return dbInstance;

  const dbPath = process.env.VERCEL
    ? path.join('/tmp', 'vedik_reality.db')
    : path.join(__dirname, '../vedik_reality.db');

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });


  await initDb(dbInstance);
  return dbInstance;
}

async function initDb(db) {
  // Create Tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      type TEXT NOT NULL, -- Residential, Commercial, Villa, Apartment, Plot
      category TEXT NOT NULL, -- Sale, Rent, Upcoming
      price TEXT NOT NULL,
      price_numeric REAL,
      location TEXT NOT NULL,
      address TEXT,
      bhk TEXT,
      area TEXT NOT NULL,
      status TEXT NOT NULL, -- Available, Sold Out, Under Construction
      is_featured INTEGER DEFAULT 0,
      description TEXT NOT NULL,
      amenities TEXT, -- JSON array string
      images TEXT NOT NULL, -- JSON array string
      video_url TEXT,
      rera_number TEXT,
      builder_name TEXT,
      meta_title TEXT,
      meta_description TEXT,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT NOT NULL,
      price_range TEXT NOT NULL,
      status TEXT NOT NULL, -- New Launch, Under Construction, Ready to Move
      is_featured INTEGER DEFAULT 0,
      description TEXT NOT NULL,
      amenities TEXT,
      images TEXT NOT NULL,
      rera_number TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      property_count INTEGER DEFAULT 0,
      image TEXT NOT NULL,
      description TEXT,
      is_popular INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      property_title TEXT,
      property_id INTEGER,
      message TEXT,
      source TEXT DEFAULT 'Website', -- Website, Hero Search, Property Detail, Contact Page, WhatsApp
      status TEXT DEFAULT 'NEW', -- NEW, CONTACTED, INTERESTED, FOLLOW-UP, CONVERTED, NOT INTERESTED
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      location TEXT NOT NULL,
      property_purchased TEXT,
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      is_published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL, -- page_view, property_view, whatsapp_click, call_click, lead_submit
      target_id TEXT,
      metadata TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed Admin if not exists
  const defaultAdmins = ['Vedikrealty@gmail.com', 'admin@vedikreality.com'];
  for (const adminEmail of defaultAdmins) {
    const existingAdmin = await db.get(`SELECT * FROM admin_users WHERE LOWER(email) = LOWER(?)`, [adminEmail]);
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.run(
        `INSERT INTO admin_users (email, password, name) VALUES (?, ?, ?)`,
        [adminEmail.toLowerCase(), hashedPassword, 'Vedik Reality Administrator']
      );
    }
  }

  // Seed Default Settings if empty
  const settingsCount = await db.get(`SELECT COUNT(*) as count FROM settings`);
  if (settingsCount.count === 0) {
    const defaultSettings = [
      ['business_name', 'Vedik Reality'],
      ['owners', 'Deepak Lamba, Manish'],
      ['tagline', 'Property Dealer & Real Estate Agent in Dharuhera'],
      ['phone', '+91 90538 48222'],
      ['alt_phone', '+91 97282 95353'],
      ['whatsapp', '919053848222'],
      ['email', 'Vedikrealty@gmail.com'],
      ['address', 'First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana – 123106'],
      ['working_hours', 'Mon - Sat: 9:30 AM - 7:00 PM'],
      ['google_map_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14068.329810577785!2d76.7972!3d28.2045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d359670000001%3A0x10b7eeec932e6005!2sSector%2019%2C%20Dharuhera%2C%20Haryana%20123106!5e0!3m2!1sen!2sin!4v1700000000000'],
      ['facebook', 'https://facebook.com/vedikreality'],
      ['instagram', 'https://instagram.com/vedikreality'],
      ['youtube', 'https://youtube.com/@vedikreality'],
      ['meta_default_title', 'Vedik Reality | Property Dealer & Real Estate Agent in Dharuhera'],
      ['meta_default_description', 'Vedik Reality is a real estate consultant in Dharuhera, Haryana, helping clients explore residential and commercial properties, flats, plots and property investment opportunities. Contact us for property enquiries and professional assistance.']
    ];

    for (const [key, val] of defaultSettings) {
      await db.run(`INSERT INTO settings (key, value) VALUES (?, ?)`, [key, val]);
    }
  }

  // Seed Locations if empty
  const locCount = await db.get(`SELECT COUNT(*) as count FROM locations`);
  // Seed Locations if empty
  const locCount = await db.get(`SELECT COUNT(*) as count FROM locations`);
  if (locCount.count === 0) {
    const seedLocations = [
      ['Sector 19 & 24 Dharuhera', 'sector-19-24-dharuhera', 35, '/anandam/gate.jpg', 'Home to Anandam Awaas & Anandam Estate 71-acre township.'],
      ['Anandam Awaas Township', 'anandam-awaas-dharuhera', 28, '/anandam/housing.jpg', 'Premium gated residential township by MGH offering plots from 72 to 519 Sq.Yds.'],
      ['NH-48 Dharuhera Corridor', 'nh48-dharuhera-corridor', 20, '/anandam/park.jpg', 'Strategic highway location with direct access to Delhi, Gurgaon & Rewari.']
    ];
    for (const loc of seedLocations) {
      await db.run(
        `INSERT INTO locations (name, slug, property_count, image, description) VALUES (?, ?, ?, ?, ?)`,
        loc
      );
    }
  }

  // Seed Properties if empty
  const propCount = await db.get(`SELECT COUNT(*) as count FROM properties`);
  if (propCount.count === 0) {
    const seedProps = [
      {
        slug: 'anandam-awaas-anandam-estate-dharuhera',
        title: 'Anandam Awaas & Anandam Estate Residential Plots',
        type: 'Plot',
        category: 'Sale',
        price: '₹ 25.0 Lakhs Onwards',
        price_numeric: 2500000,
        location: 'Sector 19 & 24, Dharuhera, Haryana',
        address: 'Anandam Awaas & Anandam Estate, Sector 19 & 24, Dharuhera, Haryana – 123106',
        bhk: '72 to 519 Sq.Yards Plots',
        area: '72 – 519 Sq.Yards',
        status: 'Available',
        is_featured: 1,
        description: `Anandam Awaas and Anandam Estate by MGH offer residential plot opportunities in Sector 19 & 24, Dharuhera, Haryana. Spread across a total land area of 71 acres, the projects provide multiple plot-size options for buyers looking for residential property in Dharuhera.

Plot Options:
• Anandam Awaas — 72–177 sq. yards
• Anandam Estate — 150–519 sq. yards

Why Explore This Project?
• Residential plot options in Dharuhera
• Located in Sector 19 & 24
• Multiple plot-size options
• 71-acre total project area
• Suitable for buyers exploring property opportunities in Dharuhera`,
        amenities: JSON.stringify(['Gated Security', '71-Acre Township', 'In-House Temple', 'Kids Play Park', '30ft Wide Roads', 'Underground Utilities', 'Immediate Registry']),
        images: JSON.stringify([
          '/anandam/logo.png',
          '/anandam/housing.jpg',
          '/anandam/gate.jpg',
          '/anandam/temple.jpg',
          '/anandam/park.jpg'
        ]),
        video_url: '',
        rera_number: 'HRERA Registered',
        builder_name: 'MGH Group',
        meta_title: 'Anandam Awaas & Anandam Estate | Residential Plots in Dharuhera',
        meta_description: 'Explore Anandam Awaas and Anandam Estate by MGH in Sector 19 & 24, Dharuhera. Residential plots from 72–519 sq. yards across a 71-acre project.'
      }
    ];

    for (const p of seedProps) {
      await db.run(
        `INSERT INTO properties (
          slug, title, type, category, price, price_numeric, location, address, bhk, area, status,
          is_featured, description, amenities, images, video_url, rera_number, builder_name, meta_title, meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.slug, p.title, p.type, p.category, p.price, p.price_numeric, p.location, p.address, p.bhk, p.area, p.status,
          p.is_featured, p.description, p.amenities, p.images, p.video_url, p.rera_number, p.builder_name, p.meta_title, p.meta_description
        ]
      );
    }
  }

  // Seed Projects if empty
  const projCount = await db.get(`SELECT COUNT(*) as count FROM projects`);
  if (projCount.count === 0) {
    const seedProjects = [
      {
        slug: 'anandam-awaas-anandam-estate',
        name: 'Anandam Awaas & Anandam Estate',
        location: 'Sector 19 & 24, Dharuhera, Haryana',
        type: '71-Acre Residential Plot Township',
        price_range: '72 Sq.Yds to 519 Sq.Yds Plots',
        status: 'Ready to Construct / Registry Ready',
        is_featured: 1,
        description: `Anandam Awaas and Anandam Estate by MGH offer residential plot opportunities in Sector 19 & 24, Dharuhera, Haryana. Spread across a total land area of 71 acres, the projects provide multiple plot-size options for buyers looking for residential property in Dharuhera.

Plot Options:
• Anandam Awaas — 72–177 sq. yards
• Anandam Estate — 150–519 sq. yards

Why Explore This Project?
• Residential plot options in Dharuhera
• Located in Sector 19 & 24
• Multiple plot-size options
• 71-acre total project area
• Suitable for buyers exploring property opportunities in Dharuhera`,
        amenities: JSON.stringify(['71-Acre Integrated Township', 'Gated Security Entrance', 'In-House Temple', 'Children Play Area & Parks', 'Wide Demarcated Roads', 'Underground Utilities']),
        images: JSON.stringify([
          '/anandam/logo.png',
          '/anandam/housing.jpg',
          '/anandam/gate.jpg',
          '/anandam/temple.jpg',
          '/anandam/park.jpg'
        ]),
        rera_number: 'HRERA Approved'
      }
    ];

    for (const pr of seedProjects) {
      await db.run(
        `INSERT INTO projects (slug, name, location, type, price_range, status, is_featured, description, amenities, images, rera_number)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [pr.slug, pr.name, pr.location, pr.type, pr.price_range, pr.status, pr.is_featured, pr.description, pr.amenities, pr.images, pr.rera_number]
      );
    }
  }

  // Seed Services if empty
  const servCount = await db.get(`SELECT COUNT(*) as count FROM services`);
  if (servCount.count === 0) {
    const seedServices = [
      ['Residential Property Advisory', 'Curated selection of high-end apartments, penthouses, and gated community villas tailored to your family requirement.', 'Home', 1],
      ['Commercial & Corporate Advisory', 'Strategic Grade-A office spaces, retail showrooms, and high-yield commercial real estate investments.', 'Building', 1],
      ['Investment Portfolio Advisory', 'Data-backed market insights helping HNIs and investors achieve maximum capital appreciation and rental yield.', 'TrendingUp', 1],
      ['Property Legal & Valuation', 'End-to-end legal verification, RERA compliance check, property valuation, and smooth title transfer support.', 'ShieldCheck', 1],
      ['Property Selling Assistance', 'Exclusively represent sellers to showcase properties to verified high-net-worth buyers with premium marketing.', 'Key', 1],
      ['Luxury NRI Desk', 'Dedicated advisory desk for Non-Resident Indians seeking transparent property investments in India with virtual tours.', 'Globe', 1]
    ];
    for (const s of seedServices) {
      await db.run(`INSERT INTO services (title, description, icon, is_active) VALUES (?, ?, ?, ?)`, s);
    }
  }

  // Seed Testimonials if empty
  const testCount = await db.get(`SELECT COUNT(*) as count FROM testimonials`);
  if (testCount.count === 0) {
    const seedTestimonials = [
      ['Vikramjit & Ananya Singh', 'Golf Course Road, Gurgaon', 'The Vedik Pinnacle Residences', 'Vedik Reality demonstrated exceptional professionalism during our 4 BHK purchase. Their team negotiated transparently, ensured complete RERA verification, and made our transition seamless.', 5, 1],
      ['Rajesh Agarwal (Managing Director)', 'SPR Corridor, Gurgaon', 'Cyber Horizon Commercial', 'Finding high-yield Grade-A commercial office space used to be complicated until we met Vedik Reality. Their deep Gurgaon market insight guided us to an asset yielding over 8.5% annual returns.', 5, 1],
      ['Dr. Meenakshi Sundaram', 'Dwarka Expressway', 'Skyline Heights Duplex', 'As an NRI living in London, trust was paramount. The virtual tours, video walk-throughs, and transparent guidance provided by Vedik Reality made our penthouse purchase totally stress-free.', 5, 1]
    ];
    for (const t of seedTestimonials) {
      await db.run(`INSERT INTO testimonials (client_name, location, property_purchased, content, rating, is_published) VALUES (?, ?, ?, ?, ?, ?)`, t);
    }
  }

  // Seed Initial Sample Lead if empty
  const leadCount = await db.get(`SELECT COUNT(*) as count FROM leads`);
  if (leadCount.count === 0) {
    await db.run(
      `INSERT INTO leads (name, phone, email, property_title, message, source, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Siddharth Malhotra',
        '+91 98112 33445',
        'siddharth.m@gmail.com',
        'The Vedik Pinnacle Residences',
        'Hi, I am looking to schedule a private site visit this Saturday afternoon for the 4 BHK apartment.',
        'Property Detail Page',
        'NEW',
        'Initial inquiry received from website'
      ]
    );
  }

  console.log('✅ SQLite Database Initialized and Seeded Successfully!');
}
