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
  const existingAdmin = await db.get(`SELECT * FROM admin_users WHERE email = ?`, ['admin@vedikreality.com']);
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run(
      `INSERT INTO admin_users (email, password, name) VALUES (?, ?, ?)`,
      ['admin@vedikreality.com', hashedPassword, 'Vedik Reality Administrator']
    );
  }

  // Seed Default Settings if empty
  const settingsCount = await db.get(`SELECT COUNT(*) as count FROM settings`);
  if (settingsCount.count === 0) {
    const defaultSettings = [
      ['business_name', 'Vedik Reality'],
      ['tagline', 'Luxury Estates & Thoughtfully Selected Properties'],
      ['phone', '+91 98765 43210'],
      ['whatsapp', '919876543210'],
      ['email', 'contact@vedikreality.com'],
      ['address', 'Level 14, Vedik Horizon Tower, Golf Course Road, Sector 54, Gurgaon, HR - 122002'],
      ['working_hours', 'Mon - Sat: 9:30 AM - 7:00 PM'],
      ['google_map_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.730303698014!2d77.0945!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18d450000001%3A0x10b7eeec932e6005!2sGolf%20Course%20Rd%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1700000000000'],
      ['facebook', 'https://facebook.com/vedikreality'],
      ['instagram', 'https://instagram.com/vedikreality'],
      ['youtube', 'https://youtube.com/@vedikreality'],
      ['meta_default_title', 'Vedik Reality | Luxury Real Estate & Prime Properties'],
      ['meta_default_description', 'Discover luxury residential apartments, villas, commercial spaces, and premium land with Vedik Reality. Gurgaon & Delhi NCR real estate leaders.']
    ];

    for (const [key, val] of defaultSettings) {
      await db.run(`INSERT INTO settings (key, value) VALUES (?, ?)`, [key, val]);
    }
  }

  // Seed Locations if empty
  const locCount = await db.get(`SELECT COUNT(*) as count FROM locations`);
  if (locCount.count === 0) {
    const seedLocations = [
      ['Golf Course Road, Gurgaon', 'golf-course-road-gurgaon', 12, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 'India’s most sought-after ultra-luxury residential corridor.'],
      ['Southern Peripheral Road (SPR)', 'spr-gurgaon', 8, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'High growth investment zone with modern high-rises and townships.'],
      ['Dwarka Expressway', 'dwarka-expressway', 15, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Seamless connectivity to Delhi Airport and IGI corridor.'],
      ['Noida Expressway', 'noida-expressway', 9, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 'Prime commercial hubs, IT parks, and luxury townships.'],
      ['Golf Course Extension Road', 'golf-course-extension', 11, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 'Cosmopolitan living with world-class golf amenities and schools.']
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
        slug: 'the-vedik-pinnacle-residences',
        title: 'The Vedik Pinnacle Residences',
        type: 'Apartment',
        category: 'Sale',
        price: '₹ 4.85 Cr',
        price_numeric: 48500000,
        location: 'Golf Course Road, Gurgaon',
        address: 'Sector 54, Golf Course Road, Gurugram',
        bhk: '4 BHK + Servant',
        area: '3,850 Sq.Ft.',
        status: 'Available',
        is_featured: 1,
        description: 'An architectural masterpiece overlooking the lush green golf courses. Features private elevator access, 11-ft ceiling heights, wraparound balconies, and automated smart home controls.',
        amenities: JSON.stringify(['Private Elevator', 'Golf View Balcony', 'Olympic Size Pool', 'Concierge Desk', 'Clubhouse & Spa', 'Smart Automation', '3 Tier Security', 'EV Charging']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80'
        ]),
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        rera_number: 'HRERA-GGM-2024-891',
        builder_name: 'Vedik Infrastructure Developers',
        meta_title: 'The Vedik Pinnacle Residences | 4 BHK Luxury Apartment Golf Course Road',
        meta_description: 'Buy 4 BHK luxury apartment on Golf Course Road Gurgaon. Private elevator, golf course view, luxury clubhouse amenities.'
      },
      {
        slug: 'aurum-palace-villas',
        title: 'Aurum Palace Luxury Estate Villa',
        type: 'Villa',
        category: 'Sale',
        price: '₹ 9.50 Cr',
        price_numeric: 95000000,
        location: 'Golf Course Extension, Gurgaon',
        address: 'Sector 66, Golf Course Extension, Gurugram',
        bhk: '5 BHK Villa',
        area: '6,200 Sq.Ft.',
        status: 'Available',
        is_featured: 1,
        description: 'Exquisite independent villa situated in an ultra-exclusive gated estate. Comes with private swimming pool, landscaped manicured lawn, rooftop sundeck, and custom Italian marble interiors.',
        amenities: JSON.stringify(['Private Heated Pool', 'Private Garden', 'Terrace Lounge', 'Italian Marble Flooring', 'Modular German Kitchen', '4 Car Covered Parking', 'Solar Energy Backed']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80'
        ]),
        video_url: '',
        rera_number: 'HRERA-GGM-2023-412',
        builder_name: 'Aurum Luxury Living',
        meta_title: 'Aurum Palace Luxury Villa Gurgaon | 5 BHK Private Pool Estate',
        meta_description: 'Explore 5 BHK Independent luxury villa with private pool, private garden on Golf Course Extension Road Gurgaon.'
      },
      {
        slug: 'cyber-horizon-commercial-suites',
        title: 'Cyber Horizon Grade-A Commercial Tower',
        type: 'Commercial',
        category: 'Sale',
        price: '₹ 2.10 Cr',
        price_numeric: 21000000,
        location: 'Southern Peripheral Road (SPR)',
        address: 'Sector 70, SPR Corridor, Gurugram',
        bhk: 'Commercial Office Space',
        area: '1,450 Sq.Ft.',
        status: 'Available',
        is_featured: 1,
        description: 'Grade-A LEED Gold Certified commercial office suite offering high rental yields and guaranteed corporate tenancy. Double height entrance lobby with high-speed elevators.',
        amenities: JSON.stringify(['LEED Gold Certified', '100% Power Backup', 'High Speed Elevators', 'Food Court & Rooftop Cafe', 'Valet Parking', 'Cisco Fiber Internet Ready']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80'
        ]),
        video_url: '',
        rera_number: 'HRERA-GGM-2024-102',
        builder_name: 'Horizon Commercials',
        meta_title: 'Grade A Commercial Office Space SPR Gurgaon | Cyber Horizon',
        meta_description: 'Invest in Grade-A commercial office spaces with high rental return on Southern Peripheral Road, Gurgaon.'
      },
      {
        slug: 'skyline-heights-penthouse',
        title: 'Skyline Heights Duplex Penthouse',
        type: 'Apartment',
        category: 'Sale',
        price: '₹ 7.20 Cr',
        price_numeric: 72000000,
        location: 'Dwarka Expressway',
        address: 'Sector 109, Dwarka Expressway, Gurugram',
        bhk: '5 BHK Penthouse',
        area: '5,100 Sq.Ft.',
        status: 'Available',
        is_featured: 1,
        description: 'Breathtaking duplex penthouse on the 32nd floor offering 360-degree panoramic city skylines. Features private jacuzzi terrace, double height living room, and private lounge.',
        amenities: JSON.stringify(['Terrace Jacuzzi', '360 Skylines View', 'Double Height Living Room', 'Private Elevator Bar', 'All En-Suite Bedrooms', 'Infinity Pool']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80'
        ]),
        video_url: '',
        rera_number: 'HRERA-GGM-2023-771',
        builder_name: 'Skyline Landmark Developers',
        meta_title: 'Duplex Penthouse Dwarka Expressway | Skyline Heights',
        meta_description: '5 BHK Duplex Penthouse with private terrace jacuzzi on Dwarka Expressway Gurugram.'
      },
      {
        slug: 'greenwood-botanica-plots',
        title: 'Greenwood Botanica Luxury Villa Plots',
        type: 'Plot',
        category: 'Sale',
        price: '₹ 3.40 Cr',
        price_numeric: 34000000,
        location: 'Golf Course Extension, Gurgaon',
        address: 'Sector 63, Golf Course Ext, Gurugram',
        bhk: 'Freehold Land Plot',
        area: '250 Sq.Yards',
        status: 'Available',
        is_featured: 0,
        description: 'Gated plot township surrounded by 50 acres of dense green foliage. Complete underground utilities, paved wide roads, street lamps, and boundary wall security.',
        amenities: JSON.stringify(['Gated Township', 'Underground Utilities', '50 Acre Green Cover', 'Clubhouse Membership', 'Basketball & Tennis Courts', '24x7 Security Patrol']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80'
        ]),
        video_url: '',
        rera_number: 'HRERA-GGM-2024-550',
        builder_name: 'Botanica Developers',
        meta_title: 'Luxury Villa Plots Golf Course Extension Gurgaon',
        meta_description: 'Buy premium freehold residential villa plots in gated township on Golf Course Extension Road Gurgaon.'
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
        slug: 'vedik-grand-avenue',
        name: 'Vedik Grand Avenue Township',
        location: 'Golf Course Road, Gurgaon',
        type: 'Ultra Luxury Residential',
        price_range: '₹ 4.5 Cr - ₹ 12.0 Cr',
        status: 'Under Construction',
        is_featured: 1,
        description: 'A 25-acre integrated township designed by international architects featuring private skywalks, 75,000 sq.ft. clubhouse, and 5-star concierge.',
        amenities: JSON.stringify(['75,000 Sq.Ft. Clubhouse', 'Sky Bridge Walkway', 'All Weather Heated Pool', 'Private Movie Theater', 'Tennis & Squash Courts']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80'
        ]),
        rera_number: 'HRERA-GGM-2024-900'
      },
      {
        slug: 'the-sovereign-estates',
        name: 'The Sovereign Estate Villas',
        location: 'Golf Course Extension, Gurgaon',
        type: 'Gated Villa Sanctuary',
        price_range: '₹ 8.0 Cr - ₹ 16.5 Cr',
        status: 'New Launch',
        is_featured: 1,
        description: 'Only 40 ultra-luxurious bespoke villas crafted for leaders and icons. Private lifts, private infinity pools, and personal butler services.',
        amenities: JSON.stringify(['Private Infinity Pool', 'Bespoke Architecture', 'Gated Perimeter', 'Organic Kitchen Garden', 'Exclusive Heli-pad Access']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80'
        ]),
        rera_number: 'HRERA-GGM-2024-901'
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
