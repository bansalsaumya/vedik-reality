import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function reset() {
  const dbPath = path.join(__dirname, '../vedik_reality.db');
  console.log('Connecting to database at:', dbPath);

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Clear existing dummy data
  await db.run(`DELETE FROM projects;`);
  await db.run(`DELETE FROM properties;`);
  await db.run(`DELETE FROM locations;`);

  console.log('Cleared existing projects, properties, and locations tables.');

  // Insert real Anandam Awaas & Anandam Estate Project
  await db.run(
    `INSERT INTO projects (slug, name, location, type, price_range, status, is_featured, description, amenities, images, rera_number)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'anandam-awaas-anandam-estate',
      'Anandam Awaas & Anandam Estate',
      'Sector 19 & 24, Dharuhera, Haryana',
      '71-Acre Residential Plot Township',
      '72 Sq.Yds to 519 Sq.Yds Plots',
      'Ready to Construct / Registry Ready',
      1,
      `Anandam Awaas and Anandam Estate by MGH offer residential plot opportunities in Sector 19 & 24, Dharuhera, Haryana. Spread across a total land area of 71 acres, the projects provide multiple plot-size options for buyers looking for residential property in Dharuhera.

Plot Options:
• Anandam Awaas — 72–177 sq. yards
• Anandam Estate — 150–519 sq. yards

Why Explore This Project?
• Residential plot options in Dharuhera
• Located in Sector 19 & 24
• Multiple plot-size options
• 71-acre total project area
• Suitable for buyers exploring property opportunities in Dharuhera`,
      JSON.stringify(['71-Acre Integrated Township', 'Gated Security Entrance', 'In-House Temple', 'Children Play Area & Parks', 'Wide Demarcated Roads', 'Underground Utilities']),
      JSON.stringify([
        '/anandam/logo.png',
        '/anandam/housing.jpg',
        '/anandam/gate.jpg',
        '/anandam/temple.jpg',
        '/anandam/park.jpg'
      ]),
      'HRERA Approved'
    ]
  );

  // Insert Real Anandam Property
  await db.run(
    `INSERT INTO properties (
      slug, title, type, category, price, price_numeric, location, address, bhk, area, status,
      is_featured, description, amenities, images, video_url, rera_number, builder_name, meta_title, meta_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'anandam-awaas-anandam-estate-dharuhera',
      'Anandam Awaas & Anandam Estate Residential Plots',
      'Plot',
      'Sale',
      '₹ 25.0 Lakhs Onwards',
      2500000,
      'Sector 19 & 24, Dharuhera, Haryana',
      'Anandam Awaas & Anandam Estate, Sector 19 & 24, Dharuhera, Haryana – 123106',
      '72 to 519 Sq.Yards Plots',
      '72 – 519 Sq.Yards',
      'Available',
      1,
      `Anandam Awaas and Anandam Estate by MGH offer residential plot opportunities in Sector 19 & 24, Dharuhera, Haryana. Spread across a total land area of 71 acres, the projects provide multiple plot-size options for buyers looking for residential property in Dharuhera.

Plot Options:
• Anandam Awaas — 72–177 sq. yards
• Anandam Estate — 150–519 sq. yards

Why Explore This Project?
• Residential plot options in Dharuhera
• Located in Sector 19 & 24
• Multiple plot-size options
• 71-acre total project area
• Suitable for buyers exploring property opportunities in Dharuhera`,
      JSON.stringify(['Gated Security', '71-Acre Township', 'In-House Temple', 'Kids Play Park', '30ft Wide Roads', 'Underground Utilities', 'Immediate Registry']),
      JSON.stringify([
        '/anandam/logo.png',
        '/anandam/housing.jpg',
        '/anandam/gate.jpg',
        '/anandam/temple.jpg',
        '/anandam/park.jpg'
      ]),
      '',
      'HRERA Registered',
      'MGH Group',
      'Anandam Awaas & Anandam Estate | Residential Plots in Dharuhera',
      'Explore Anandam Awaas and Anandam Estate by MGH in Sector 19 & 24, Dharuhera. Residential plots from 72–519 sq. yards across a 71-acre project.'
    ]
  );

  // Insert Locations
  await db.run(
    `INSERT INTO locations (name, slug, property_count, image, description) VALUES (?, ?, ?, ?, ?)`,
    ['Sector 19 & 24 Dharuhera', 'sector-19-24-dharuhera', 35, '/anandam/gate.jpg', 'Home to Anandam Awaas & Anandam Estate 71-acre township.']
  );
  await db.run(
    `INSERT INTO locations (name, slug, property_count, image, description) VALUES (?, ?, ?, ?, ?)`,
    ['Anandam Awaas Township', 'anandam-awaas-dharuhera', 28, '/anandam/housing.jpg', 'Premium gated residential township by MGH offering plots from 72 to 519 Sq.Yds.']
  );

  console.log('✅ Real Anandam Awaas & Anandam Estate data successfully seeded into database!');
  await db.close();
}

reset();
