import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { initDB, getPool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supergagangirisecret';

// Enable CORS for frontend Vite client
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

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

// --- STUDENT COUNTS (YEARLY SUMMARY) ROUTES ---

app.get('/api/student-counts', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [counts] = await db.query('SELECT * FROM student_counts ORDER BY academic_year DESC');
    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/student-counts', checkDbStatus, authenticateToken, async (req, res) => {
  const { academic_year, boys, girls } = req.body;
  if (!academic_year || boys === undefined || girls === undefined) {
    return res.status(400).json({ error: 'Missing academic_year, boys, or girls counts.' });
  }

  const bCount = parseInt(boys, 10);
  const gCount = parseInt(girls, 10);
  const total = bCount + gCount;

  try {
    const db = getPool();
    const id = `sc-${Date.now()}`;
    const [existing] = await db.query('SELECT * FROM student_counts WHERE academic_year = ?', [academic_year]);
    
    if (existing.length > 0) {
      await db.query(
        'UPDATE student_counts SET boys = ?, girls = ?, total = ? WHERE academic_year = ?',
        [bCount, gCount, total, academic_year]
      );
      res.json({ id: existing[0].id, academic_year, boys: bCount, girls: gCount, total });
    } else {
      await db.query(
        'INSERT INTO student_counts (id, academic_year, boys, girls, total) VALUES (?, ?, ?, ?, ?)',
        [id, academic_year, bCount, gCount, total]
      );
      res.status(201).json({ id, academic_year, boys: bCount, girls: gCount, total });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/student-counts/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM student_counts WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Student counts record deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CLASS-WISE STUDENT ENROLLMENT ROUTES ---

app.get('/api/class-students', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM class_students ORDER BY sort_order ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/class-students', checkDbStatus, authenticateToken, async (req, res) => {
  const { grade, english_grade, boys, girls, section, sort_order } = req.body;
  if (!grade || !english_grade || boys === undefined || girls === undefined || !section) {
    return res.status(400).json({ error: 'Missing grade, english_grade, boys, girls, or section.' });
  }

  const bCount = parseInt(boys, 10);
  const gCount = parseInt(girls, 10);
  const total = bCount + gCount;
  const order = sort_order ? parseInt(sort_order, 10) : 0;

  try {
    const db = getPool();
    const id = `cs-${Date.now()}`;
    await db.query(
      'INSERT INTO class_students (id, grade, english_grade, boys, girls, total, section, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, grade, english_grade, bCount, gCount, total, section, order]
    );
    res.status(201).json({ id, grade, english_grade, boys: bCount, girls: gCount, total, section, sort_order: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/class-students/:id', checkDbStatus, authenticateToken, async (req, res) => {
  const { grade, english_grade, boys, girls, section, sort_order } = req.body;
  if (!grade || !english_grade || boys === undefined || girls === undefined || !section) {
    return res.status(400).json({ error: 'Missing grade, english_grade, boys, girls, or section.' });
  }

  const bCount = parseInt(boys, 10);
  const gCount = parseInt(girls, 10);
  const total = bCount + gCount;
  const order = sort_order ? parseInt(sort_order, 10) : 0;

  try {
    const db = getPool();
    await db.query(
      'UPDATE class_students SET grade = ?, english_grade = ?, boys = ?, girls = ?, total = ?, section = ?, sort_order = ? WHERE id = ?',
      [grade, english_grade, bCount, gCount, total, section, order, req.params.id]
    );
    res.json({ id: req.params.id, grade, english_grade, boys: bCount, girls: gCount, total, section, sort_order: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/class-students/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM class_students WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Class student record deleted.' });
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

// --- SCHOOL NEEDS ROUTES ---

app.get('/api/needs', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [needs] = await db.query('SELECT * FROM school_needs ORDER BY date DESC, id DESC');
    res.json(needs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/needs', checkDbStatus, authenticateToken, async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text content is required.' });
  }

  try {
    const db = getPool();
    const id = `need-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];
    await db.query('INSERT INTO school_needs (id, text, date) VALUES (?, ?, ?)', [id, text, date]);
    res.status(201).json({ id, text, date });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/needs/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM school_needs WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'School need deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CAMPUS INFRASTRUCTURE ROUTES ---

app.get('/api/infrastructure', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [infra] = await db.query('SELECT * FROM infrastructure');
    res.json(infra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/infrastructure', checkDbStatus, authenticateToken, async (req, res) => {
  const { title, description, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Missing infrastructure title or image url.' });
  }

  try {
    const db = getPool();
    const id = `infra-${Date.now()}`;
    await db.query('INSERT INTO infrastructure (id, title, description, url) VALUES (?, ?, ?, ?)', [id, title, description || '', url]);
    res.status(201).json({ id, title, description: description || '', url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/infrastructure/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM infrastructure WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Campus infrastructure card deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- RESULTS BOARD ROUTES ---

app.get('/api/results', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [results] = await db.query('SELECT * FROM results ORDER BY id DESC');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/results', checkDbStatus, authenticateToken, async (req, res) => {
  const { standard_division, name_of_examination, result_date, pdf_url } = req.body;
  if (!standard_division || !name_of_examination || !result_date) {
    return res.status(400).json({ error: 'Standard/Division, Name of Examination and Result Date are required.' });
  }

  try {
    const db = getPool();
    const query = 'INSERT INTO results (standard_division, name_of_examination, result_date, pdf_url) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [standard_division, name_of_examination, result_date, pdf_url || null]);
    res.status(201).json({ id: result.insertId, standard_division, name_of_examination, result_date, pdf_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/results/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM results WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Result record deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- STAFF MANAGEMENT ROUTES ---

app.get('/api/staff', checkDbStatus, async (req, res) => {
  try {
    const db = getPool();
    const [staff] = await db.query('SELECT * FROM staff');
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/staff', checkDbStatus, authenticateToken, async (req, res) => {
  const { name, role, image, bio, email, type, category, qualification } = req.body;
  if (!name || !role || !image || !type || !category) {
    return res.status(400).json({ error: 'Missing name, role, image, type, or category.' });
  }

  try {
    const db = getPool();
    const id = `fac-${Date.now()}`;
    await db.query(
      'INSERT INTO staff (id, name, role, image, bio, email, type, category, qualification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, role, image, bio || '', email || '', type, category, qualification || 'B.Sc / B.A., B.Ed']
    );
    res.status(201).json({ 
      id, 
      name, 
      role, 
      image, 
      bio: bio || '', 
      email: email || '', 
      type, 
      category,
      qualification: qualification || 'B.Sc / B.A., B.Ed'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/staff/:id', checkDbStatus, authenticateToken, async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM staff WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Staff member deleted.' });
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

// --- ADMISSIONS APPLICATIONS ROUTES ---

app.post('/api/admissions', checkDbStatus, async (req, res) => {
  const {
    branch, year, ssc_percentage, surname, first_name, father_name, mother_name,
    dob, place_of_birth, nationality, religion, gender, caste, sub_caste, category,
    native_place, parent_name, parent_occupation, parent_relationship,
    residential_address, permanent_address, residence_no, mobile_no, parent_mobile,
    student_mobile, extra_curricular, student_name_declaration, parent_name_declaration,
    parent_email, academic_records, subjects, documents
  } = req.body;

  // Validate required fields
  const requiredFields = [
    'branch', 'year', 'ssc_percentage', 'surname', 'first_name', 'father_name', 'mother_name',
    'dob', 'nationality', 'religion', 'gender', 'category', 'parent_name',
    'residential_address', 'permanent_address', 'parent_mobile', 'student_name_declaration',
    'parent_name_declaration', 'parent_email'
  ];

  for (const field of requiredFields) {
    if (!req.body[field] || String(req.body[field]).trim() === '') {
      return res.status(400).json({ error: `Field '${field}' is required.` });
    }
  }

  try {
    const db = getPool();
    const query = `
      INSERT INTO admissions (
        branch, year, ssc_percentage, surname, first_name, father_name, mother_name,
        dob, place_of_birth, nationality, religion, gender, caste, sub_caste, category,
        native_place, parent_name, parent_occupation, parent_relationship,
        residential_address, permanent_address, residence_no, mobile_no, parent_mobile,
        student_mobile, extra_curricular, student_name_declaration, parent_name_declaration,
        parent_email, academic_records, subjects, documents
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      branch, year, ssc_percentage, surname, first_name, father_name, mother_name,
      dob, place_of_birth || null, nationality, religion, gender, caste || null, sub_caste || null, category,
      native_place || null, parent_name, parent_occupation || null, parent_relationship || null,
      residential_address, permanent_address, residence_no || null, mobile_no || null, parent_mobile,
      student_mobile || null, extra_curricular || null, student_name_declaration, parent_name_declaration,
      parent_email, 
      JSON.stringify(academic_records || {}), 
      JSON.stringify(subjects || []), 
      JSON.stringify(documents || {})
    ];

    await db.query(query, values);
    res.status(201).json({ success: true, message: 'Application submitted successfully to database!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CONTACT FORM EMAIL ROUTE ---
app.post('/api/contact', async (req, res) => {
  const { name, email, msg } = req.body;

  if (!name || !email || !msg) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Get SMTP settings from env with defaults
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SMTP_TO || 'gagangiriashram@gmail.com';

  if (!user || !pass) {
    console.warn('⚠️ SMTP credentials not set. Contact form will return 501.');
    return res.status(501).json({ 
      error: 'SMTP credentials are not configured in the server .env file. Please specify SMTP_USER and SMTP_PASS.' 
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass
      }
    });

    const mailOptions = {
      from: `"${name}" <${user}>`,
      replyTo: email,
      to,
      subject: `Inquiry from Website: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Mail sending error:', error);
    res.status(500).json({ error: 'Failed to send mail: ' + error.message });
  }
});

// Start Express Server listener
app.listen(PORT, () => {
  console.log(`🚀 Eklavya Ashramschool Backend Server active on http://localhost:${PORT}`);
});
