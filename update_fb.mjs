import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function updateFb() {
  const db = await open({ filename: 'vedik_reality.db', driver: sqlite3.Database });
  await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('facebook', 'https://www.facebook.com/profile.php?id=61594850518441')");
  console.log('✅ Facebook link updated in SQLite DB');
}
updateFb();
