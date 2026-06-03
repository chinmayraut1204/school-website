import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { initDB, getPool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supergagangirisecret';

// Enable CORS for frontend Vite client
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Initialize Database connection on start
let isDbOnline = false;
initDB().then((online) => {
  isDbOnline = online;
});

// Middleware: Route Guard authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Session expired or token invalid.' });
    }
    req.user = user;
    next();
  });
};

// Check Database Status
const checkDbStatus = (req, res, next) => {
  if (!isDbOnline) {
    return res.status(503).json({ error: 'Database is currently offline. Running in local fallback mode.' });
  }
  next();
};

// --- AUTHENTICATION ROUTES ---

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  if (!isDbOnline) {
    // Local admin login fallback if DB is offline for testing
    if (username === 'chinmay raut' && password === 'chinmay@1204') {
      const token = jwt.sign({ username: 'chinmay raut', role: 'admin' }, JWT_SECRET, { expiresIn: '6h' });
      return res.json({ token, username: 'chinmay raut', role: 'admin', fallback: true });
    }
    return res.status(401).json({ error: 'Invalid local fallback credentials.' });
  }

  try {
    const db = getPool();
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid administrative username.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password credentials.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '6h' });
    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    res.status(550).json({ error: error.message });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// --- GALLERY IMAGES ROUTES ---

app.get('/api/gallery', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [images] = await db.query('SELECT * FROM gallery');
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', checkDbStatus, authenticateToken, async (req, res) => {
  const { title, url, category } = req.body;
  if (!title || !url || !category) {
    return res.status(400).json({ error: 'Missing gallery title, url, or category.' });
  }

  try {
    const db = getPool();
    const id = `gal-${Date.now()}`;
    await db.query('INSERT INTO gallery (id, title, url, category) VALUES (?, ?, ?, ?)', [id, title, url, category]);
    res.status(201).json({ id, title, url, category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gallery/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Image deleted from database.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CAMPUS LIFE / ACTIVITIES CAROUSEL ROUTES ---

app.get('/api/campus-life', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [items] = await db.query('SELECT * FROM campus_life');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/campus-life', checkDbStatus, authenticateToken, async (req, res) => {
  const { title, description, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Missing title or image url.' });
  }

  try {
    const db = getPool();
    const id = `cl-${Date.now()}`;
    await db.query('INSERT INTO campus_life (id, title, description, url) VALUES (?, ?, ?, ?)', [id, title, description || '', url]);
    res.status(201).json({ id, title, description: description || '', url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/campus-life/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM campus_life WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Campus life card deleted from database.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ANNOUNCEMENTS ROUTES ---

app.get('/api/announcements', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [announcements] = await db.query('SELECT * FROM announcements ORDER BY date DESC');
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/announcements', checkDbStatus, authenticateToken, async (req, res) => {
  const { text, type } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text content is required.' });
  }

  try {
    const db = getPool();
    const id = `ann-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];
    await db.query('INSERT INTO announcements (id, text, type, date) VALUES (?, ?, ?, ?)', [id, text, type || 'info', date]);
    res.status(201).json({ id, text, type: type || 'info', date });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/announcements/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM announcements WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Notice bulletin deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CONTENT NARRATIVES ROUTES ---

app.get('/api/content', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [content] = await db.query('SELECT * FROM school_content WHERE id = ?', ['current']);
    res.json(content[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/content', checkDbStatus, authenticateToken, async (req, res) => {
  const { about, mission, vision } = req.body;
  
  try {
    const db = getPool();
    await db.query(`
      UPDATE school_content 
      SET about = ?, mission = ?, vision = ?
      WHERE id = 'current'
    `, [about, mission, vision]);
    
    res.json({ success: true, message: 'Descriptions updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Express Server listener
app.listen(PORT, () => {
  console.log(`🚀 Eklavya Ashramschool Backend Server active on http://localhost:${PORT}`);
});
