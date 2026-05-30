import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

let pool = null;

export const initDB = async () => {
  try {
    // 1. Establish connection to check/create database first
    const initConnection = await mysql.createConnection({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'root',
      password: DB_PASSWORD || '',
      port: DB_PORT || 3306,
      connectTimeout: 5000
    });

    await initConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME || 'eklavya_db'}\``);
    await initConnection.end();

    // 2. Initialize Pool with DB name
    pool = mysql.createPool({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'root',
      password: DB_PASSWORD || '',
      database: DB_NAME || 'eklavya_db',
      port: DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const conn = await pool.getConnection();

    // 3. Create Tables programmatically
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin'
      )
    `);

    // Seed admin user
    const [users] = await conn.query('SELECT * FROM users WHERE username = ?', ['chinmay raut']);
    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash('chinmay@1204', 10);
      await conn.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['chinmay raut', hashedPassword, 'admin']);
      console.log('Database initialized: Seeded default admin user (chinmay raut).');
    }

    // Gallery Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url LONGTEXT NOT NULL,
        category VARCHAR(50) NOT NULL
      )
    `);

    // Alter column to LONGTEXT to prevent truncation of base64 images
    try {
      await conn.query('ALTER TABLE gallery MODIFY url LONGTEXT NOT NULL');
    } catch (err) {
      console.warn('Alter table skipped:', err.message);
    }

    const [gallery] = await conn.query('SELECT * FROM gallery');
    if (gallery.length === 0) {
      const initialGallery = [
        { id: 'gal-1', title: 'Smart Classroom interactive session', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80', category: 'Classrooms' },
        { id: 'gal-2', title: 'Computer training module for girls', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', category: 'Labs' },
        { id: 'gal-3', title: 'Chemistry lab practical test', url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80', category: 'Labs' },
        { id: 'gal-4', title: 'Annual Athletic Relay Winners', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80', category: 'Sports' },
        { id: 'gal-5', title: 'Morning assembly and library hours', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', category: 'Events' },
        { id: 'gal-6', title: 'Healthy midday nutrition meals distribution', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', category: 'Events' }
      ];
      for (const item of initialGallery) {
        await conn.query('INSERT INTO gallery (id, title, url, category) VALUES (?, ?, ?, ?)', [item.id, item.title, item.url, item.category]);
      }
      console.log('Database initialized: Seeded initial gallery images.');
    }

    // Donations Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        amount INT NOT NULL,
        message TEXT,
        category VARCHAR(50),
        date VARCHAR(20)
      )
    `);

    const [donations] = await conn.query('SELECT * FROM donations');
    if (donations.length === 0) {
      const initialDonations = [
        { id: 'don-1', name: 'Rohan Sharma', amount: 500, message: 'For the computer lab desks and keyboards.', category: 'Infrastructure', date: '2026-05-29' },
        { id: 'don-2', name: 'Dr. Anita Desai', amount: 1500, message: 'Sponsoring library books and science equipment.', category: 'Learning Material', date: '2026-05-28' },
        { id: 'don-3', name: 'Anonymous Giver', amount: 100, message: 'Keep up the amazing work with these kids!', category: 'Sports Equipment', date: '2026-05-27' },
        { id: 'don-4', name: 'Vikram & Priya Goel', amount: 3000, message: 'Scholarship fund for bright tribal students.', category: 'Scholarships', date: '2026-05-25' },
        { id: 'don-5', name: 'Sneha Patel', amount: 250, message: 'Midday meal contributions.', category: 'Nutrition', date: '2026-05-22' }
      ];
      for (const item of initialDonations) {
        await conn.query('INSERT INTO donations (id, name, amount, message, category, date) VALUES (?, ?, ?, ?, ?, ?)', [item.id, item.name, item.amount, item.message, item.category, item.date]);
      }
    }

    // Announcements Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id VARCHAR(50) PRIMARY KEY,
        text TEXT NOT NULL,
        type VARCHAR(20),
        date VARCHAR(20)
      )
    `);

    const [announcements] = await conn.query('SELECT * FROM announcements');
    if (announcements.length === 0) {
      const initialAnnouncements = [
        { id: 'ann-1', text: '🏆 Tribal Sports Meet: Eklavya Ashramschool secured 3 gold medals in the District Athletics Meet!', type: 'success', date: '2026-05-28' },
        { id: 'ann-2', text: '💻 Digital Literacy Program: Shri Gagangiri Adivasi Trust starts Phase 2 of coding courses at Hiradpada campus.', type: 'info', date: '2026-05-25' },
        { id: 'ann-3', text: '📝 Admissions Open: Applications for residential Eklavya Ashramschool enrollment (Grades 1-12) are open.', type: 'warning', date: '2026-05-20' },
        { id: 'ann-4', text: '🥛 Nutrition Support: Special dietary additions sponsored for residential tribal hostel students.', type: 'info', date: '2026-05-15' }
      ];
      for (const item of initialAnnouncements) {
        await conn.query('INSERT INTO announcements (id, text, type, date) VALUES (?, ?, ?, ?)', [item.id, item.text, item.type, item.date]);
      }
    }

    // Stats Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS school_stats (
        id VARCHAR(20) PRIMARY KEY,
        totalStudents INT,
        girlsRatio INT,
        passRate FLOAT,
        teachersCount INT,
        classroomsCount INT,
        labsCount INT,
        smartClassrooms INT
      )
    `);

    const [stats] = await conn.query('SELECT * FROM school_stats WHERE id = ?', ['current']);
    if (stats.length === 0) {
      await conn.query(`
        INSERT INTO school_stats (id, totalStudents, girlsRatio, passRate, teachersCount, classroomsCount, labsCount, smartClassrooms)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, ['current', 480, 48, 97.8, 22, 16, 4, 6]);
    }

    // Content Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS school_content (
        id VARCHAR(20) PRIMARY KEY,
        about TEXT,
        mission TEXT,
        vision TEXT
      )
    `);

    const [content] = await conn.query('SELECT * FROM school_content WHERE id = ?', ['current']);
    if (content.length === 0) {
      await conn.query(`
        INSERT INTO school_content (id, about, mission, vision)
        VALUES (?, ?, ?, ?)
      `, [
        'current',
        'Established under the aegis of Shri Gagangiri Adivasi Shikshan Prasarak Sanstha Jamsar, Eklavya Primary, Secondary Ashramschool and Junior College in Hiradpada (Tal: Jawhar, Dist: Palghar) is dedicated to providing high-quality residential education to tribal (Adivasi) children. We are committed to fostering academic brilliance, character growth, and sports proficiency, ensuring that financial status never hinders a child\'s dreams.',
        'To deliver modern residential education and sports training that equips tribal students from marginalized backgrounds with digital skills, analytical capabilities, and ethical values to become self-reliant leaders of tomorrow.',
        'To build a model digital-first residential institution where learning is interactive, creative, inclusive, and accessible to tribal youths, bridging the socio-economic divide through community empowerment.'
      ]);
    }

    conn.release();
    console.log('MySQL Database schema fully checked and initialized.');
    return true;
  } catch (error) {
    console.error('⚠️ MySQL Connection / Initialisation Error:', error.message);
    console.warn('Backend server running in OFFLINE/MOCK mode. Ensure MySQL service is running.');
    return false;
  }
};

// Getter helper for pool execution
export const getPool = () => {
  if (!pool) {
    throw new Error('Database pool not initialized. Run initDB() first.');
  }
  return pool;
};
