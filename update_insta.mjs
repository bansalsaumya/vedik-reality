import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function updateInsta() {
  const db = await open({ filename: 'vedik_reality.db', driver: sqlite3.Database });
  await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('instagram', 'https://www.instagram.com/vedik_realty/')");
  console.log('✅ Instagram link updated in SQLite DB');
}
updateInsta();
