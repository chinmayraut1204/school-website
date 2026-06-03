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

    // Drop unused tables to align with landing home page structures
    await conn.query('DROP TABLE IF EXISTS donations');
    await conn.query('DROP TABLE IF EXISTS school_stats');

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

    // Campus Life Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS campus_life (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url LONGTEXT NOT NULL
      )
    `);

    const [campusLife] = await conn.query('SELECT * FROM campus_life');
    if (campusLife.length === 0) {
      const initialCampusLife = [
        {
          id: "cl-1",
          title: "Classroom Activities",
          description: "Interactive learning in modern digital classrooms.",
          url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-2",
          title: "Science Lab",
          description: "Hands-on experiments in our physics, chemistry, and biology labs.",
          url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-3",
          title: "Computer Lab",
          description: "Coding bootcamps and digital literacy training sessions.",
          url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-4",
          title: "Sports Events",
          description: "Fierce athletics meets, volleyball championships, and archery drills.",
          url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-5",
          title: "Cultural Programs",
          description: "Traditional Warli art workshops and folk music celebrations.",
          url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-6",
          title: "Annual Day",
          description: "Grand stage performances, dramas, and academic prize distributions.",
          url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-7",
          title: "Competitions",
          description: "Inter-school science exhibitions, chess tourneys, and debates.",
          url: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-8",
          title: "School Celebrations",
          description: "Republic Day parades, Independence Day events, and festivals.",
          url: "https://images.unsplash.com/photo-1505232458627-539c1793a52d?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-9",
          title: "Educational Tours",
          description: "Outdoor environmental excursions, museum visits, and science city tours.",
          url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cl-10",
          title: "Student Achievements",
          description: "Celebrating state-level archery champions and top rankers.",
          url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
        }
      ];
      for (const item of initialCampusLife) {
        await conn.query('INSERT INTO campus_life (id, title, description, url) VALUES (?, ?, ?, ?)', [item.id, item.title, item.description, item.url]);
      }
      console.log('Database initialized: Seeded default campus life items.');
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
