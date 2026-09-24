import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function run() {
  const db = await open({ filename: 'vedik_reality.db', driver: sqlite3.Database });
  await db.run("UPDATE settings SET value = '+91 90538 48222' WHERE key = 'phone'");
  await db.run("UPDATE settings SET value = '919053848222' WHERE key = 'whatsapp'");
  
  const rows = await db.all("SELECT key, value FROM settings WHERE key IN ('phone', 'whatsapp')");
  console.log(rows);
  await db.close();
}
run();
