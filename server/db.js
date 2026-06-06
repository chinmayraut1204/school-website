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
    
    // Set max_allowed_packet globally using the initial root connection before creating the pool
    try {
      await initConnection.query('SET GLOBAL max_allowed_packet = 33554432');
      console.log('Database initialized: max_allowed_packet set to 32MB globally.');
    } catch (err) {
      console.warn('Set global max_allowed_packet failed:', err.message);
    }

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

    // School Needs Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS school_needs (
        id VARCHAR(50) PRIMARY KEY,
        text TEXT NOT NULL,
        date VARCHAR(20)
      )
    `);

    const [needs] = await conn.query('SELECT * FROM school_needs');
    if (needs.length === 0) {
      const initialNeeds = [
        { id: 'need-1', text: 'IEEE IC3ET Papers in IEEE Xplore.' },
        { id: 'need-2', text: 'Staff Recruitment 2026-27' },
        { id: 'need-3', text: 'CUT OFF F.E 2025-26' },
        { id: 'need-4', text: 'DSE CUT OFF 2025-26' },
        { id: 'need-5', text: 'ME CUT OFF 2025-26' },
        { id: 'need-6', text: 'MMS CUT OFF 2025-26' },
        { id: 'need-7', text: 'M.E. Admission Enquiry Form 2026-27' },
        { id: 'need-8', text: 'Admission Enquiry for B.E. Courses (4 years) A.Y. 2026-27' }
      ];
      for (const item of initialNeeds) {
        const date = new Date().toISOString().split('T')[0];
        await conn.query('INSERT INTO school_needs (id, text, date) VALUES (?, ?, ?)', [item.id, item.text, date]);
      }
      console.log('Database initialized: Seeded initial school needs.');
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

    // Admissions Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        branch VARCHAR(20) NOT NULL,
        year VARCHAR(20) NOT NULL,
        ssc_percentage VARCHAR(10) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        father_name VARCHAR(50) NOT NULL,
        mother_name VARCHAR(50) NOT NULL,
        dob VARCHAR(20) NOT NULL,
        place_of_birth VARCHAR(100),
        nationality VARCHAR(50) NOT NULL,
        religion VARCHAR(50) NOT NULL,
        gender VARCHAR(20) NOT NULL,
        caste VARCHAR(50),
        sub_caste VARCHAR(50),
        category VARCHAR(20) NOT NULL,
        native_place VARCHAR(255),
        parent_name VARCHAR(100) NOT NULL,
        parent_occupation VARCHAR(100),
        parent_relationship VARCHAR(50),
        residential_address TEXT NOT NULL,
        permanent_address TEXT NOT NULL,
        residence_no VARCHAR(20),
        mobile_no VARCHAR(20),
        parent_mobile VARCHAR(20) NOT NULL,
        student_mobile VARCHAR(20),
        extra_curricular TEXT,
        student_name_declaration VARCHAR(100) NOT NULL,
        parent_name_declaration VARCHAR(100) NOT NULL,
        parent_email VARCHAR(100) NOT NULL,
        academic_records JSON,
        subjects JSON,
        documents JSON,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Drop parent_type if it was previously created
    try {
      await conn.query('ALTER TABLE admissions DROP COLUMN parent_type');
      console.log('Database initialized: parent_type column dropped from admissions table.');
    } catch (err) {
      // Skips if column does not exist
    }

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

    // Results Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        standard_division VARCHAR(100) NOT NULL,
        name_of_examination VARCHAR(255) NOT NULL,
        result_date VARCHAR(50) NOT NULL,
        pdf_url LONGTEXT
      )
    `);

    // Alter column to LONGTEXT to prevent truncation of base64 PDFs in older schemas
    try {
      await conn.query('ALTER TABLE results MODIFY pdf_url LONGTEXT');
    } catch (err) {
      console.warn('Alter table results skipped:', err.message);
    }

    // Student Counts Table (Yearly Summary)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS student_counts (
        id VARCHAR(50) PRIMARY KEY,
        academic_year VARCHAR(20) UNIQUE NOT NULL,
        boys INT NOT NULL,
        girls INT NOT NULL,
        total INT NOT NULL
      )
    `);

    const [existingCounts] = await conn.query('SELECT * FROM student_counts');
    if (existingCounts.length === 0) {
      const initialCounts = [
        { id: 'sc-1', academic_year: '2026-27', boys: 542, girls: 545, total: 1087 },
        { id: 'sc-2', academic_year: '2025-26', boys: 518, girls: 524, total: 1042 },
        { id: 'sc-3', academic_year: '2024-25', boys: 495, girls: 501, total: 996 }
      ];
      for (const item of initialCounts) {
        await conn.query('INSERT INTO student_counts (id, academic_year, boys, girls, total) VALUES (?, ?, ?, ?, ?)', 
          [item.id, item.academic_year, item.boys, item.girls, item.total]
        );
      }
      console.log('Database initialized: Seeded initial yearly student counts.');
    }

    // Class-wise Student Enrollment Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS class_students (
        id VARCHAR(50) PRIMARY KEY,
        grade VARCHAR(100) NOT NULL,
        english_grade VARCHAR(100) NOT NULL,
        boys INT NOT NULL DEFAULT 0,
        girls INT NOT NULL DEFAULT 0,
        total INT NOT NULL DEFAULT 0,
        section VARCHAR(20) NOT NULL DEFAULT 'primary',
        sort_order INT NOT NULL DEFAULT 0
      )
    `);

    const [existingClassStudents] = await conn.query('SELECT * FROM class_students');
    if (existingClassStudents.length === 0) {
      const initialClassStudents = [
        { id: 'cs-1a', grade: '१ली (अ)', english_grade: '1st Standard (A)', boys: 22, girls: 24, total: 46, section: 'primary', sort_order: 1 },
        { id: 'cs-1b', grade: '१ली (ब)', english_grade: '1st Standard (B)', boys: 21, girls: 22, total: 43, section: 'primary', sort_order: 2 },
        { id: 'cs-2a', grade: '२री (अ)', english_grade: '2nd Standard (A)', boys: 29, girls: 18, total: 47, section: 'primary', sort_order: 3 },
        { id: 'cs-2b', grade: '२री (ब)', english_grade: '2nd Standard (B)', boys: 26, girls: 21, total: 47, section: 'primary', sort_order: 4 },
        { id: 'cs-3a', grade: '३री (अ)', english_grade: '3rd Standard (A)', boys: 26, girls: 22, total: 48, section: 'primary', sort_order: 5 },
        { id: 'cs-3b', grade: '३री (ब)', english_grade: '3rd Standard (B)', boys: 26, girls: 19, total: 45, section: 'primary', sort_order: 6 },
        { id: 'cs-4a', grade: '४थी (अ)', english_grade: '4th Standard (A)', boys: 19, girls: 25, total: 44, section: 'primary', sort_order: 7 },
        { id: 'cs-4b', grade: '४थी (ब)', english_grade: '4th Standard (B)', boys: 22, girls: 23, total: 45, section: 'primary', sort_order: 8 },
        { id: 'cs-5a', grade: '५वी (अ)', english_grade: '5th Standard (A)', boys: 23, girls: 26, total: 49, section: 'primary', sort_order: 9 },
        { id: 'cs-5b', grade: '५वी (ब)', english_grade: '5th Standard (B)', boys: 20, girls: 30, total: 50, section: 'primary', sort_order: 10 },
        { id: 'cs-6a', grade: '६वी (अ)', english_grade: '6th Standard (A)', boys: 25, girls: 23, total: 48, section: 'primary', sort_order: 11 },
        { id: 'cs-6b', grade: '६वी (ब)', english_grade: '6th Standard (B)', boys: 25, girls: 24, total: 49, section: 'primary', sort_order: 12 },
        { id: 'cs-7a', grade: '७वी (अ)', english_grade: '7th Standard (A)', boys: 24, girls: 23, total: 47, section: 'primary', sort_order: 13 },
        { id: 'cs-7b', grade: '७वी (ब)', english_grade: '7th Standard (B)', boys: 22, girls: 23, total: 45, section: 'primary', sort_order: 14 },
        { id: 'cs-8a', grade: '८वी (अ)', english_grade: '8th Standard (A)', boys: 23, girls: 21, total: 44, section: 'secondary', sort_order: 15 },
        { id: 'cs-8b', grade: '८वी (ब)', english_grade: '8th Standard (B)', boys: 22, girls: 25, total: 47, section: 'secondary', sort_order: 16 },
        { id: 'cs-9', grade: '९वी', english_grade: '9th Standard', boys: 38, girls: 36, total: 74, section: 'secondary', sort_order: 17 },
        { id: 'cs-10', grade: '१०वी', english_grade: '10th Standard', boys: 36, girls: 45, total: 81, section: 'secondary', sort_order: 18 },
        { id: 'cs-11a', grade: '११ वी कला', english_grade: '11th Arts', boys: 26, girls: 32, total: 58, section: 'college', sort_order: 19 },
        { id: 'cs-11s', grade: '११ वी विज्ञान', english_grade: '11th Science', boys: 22, girls: 29, total: 51, section: 'college', sort_order: 20 },
        { id: 'cs-12a', grade: '१२ वी कला', english_grade: '12th Arts', boys: 24, girls: 18, total: 42, section: 'college', sort_order: 21 },
        { id: 'cs-12s', grade: '१२ वी विज्ञान', english_grade: '12th Science', boys: 21, girls: 16, total: 37, section: 'college', sort_order: 22 }
      ];
      for (const item of initialClassStudents) {
        await conn.query(
          'INSERT INTO class_students (id, grade, english_grade, boys, girls, total, section, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [item.id, item.grade, item.english_grade, item.boys, item.girls, item.total, item.section, item.sort_order]
        );
      }
      console.log('Database initialized: Seeded initial class-wise student data.');
    }

    // Infrastructure Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS infrastructure (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url LONGTEXT NOT NULL
      )
    `);

    const [infra] = await conn.query('SELECT * FROM infrastructure');
    if (infra.length === 0) {
      const initialInfra = [
        {
          id: 'infra-1',
          title: 'Computer & ICT Lab',
          description: 'Equipped with desktop computer modules, power backup systems, and internet to provide coding, typing, and analytical tools.',
          url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'infra-2',
          title: 'Modern Science Labs',
          description: 'Practical setup for Chemistry, Physics, and Biology experiments, promoting experiential learning and discovery.',
          url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'infra-3',
          title: 'Digital Smart Classrooms',
          description: 'Equipped with digital projectors, audio setups, and visual learning libraries to make education interactive and fun.',
          url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
        }
      ];
      for (const item of initialInfra) {
        await conn.query('INSERT INTO infrastructure (id, title, description, url) VALUES (?, ?, ?, ?)', [item.id, item.title, item.description, item.url]);
      }
      console.log('Database initialized: Seeded default campus infrastructure items.');
    }
    
    // Staff Table
    await conn.query('DROP TABLE IF EXISTS staff');
    await conn.query(`
      CREATE TABLE IF NOT EXISTS staff (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        image LONGTEXT NOT NULL,
        bio TEXT,
        email VARCHAR(255),
        type VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        qualification VARCHAR(255) DEFAULT 'B.Sc / B.A., B.Ed'
      )
    `);

    const [staff] = await conn.query('SELECT * FROM staff');
    if (staff.length === 0) {
      const initialStaff = [
        // Primary Staff
        { id: 'fac-1', name: 'Mrs. Shanti Swaroop', role: 'Principal & Senior Hindi Lit', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80', bio: '25+ years of education leadership, driving social change through girls\' literacy campaigns.', email: 'shanti.s@gagangiri.org', type: 'primary', category: 'primary_school', qualification: 'M.A. (Literature), B.Ed' },
        { id: 'fac-3', name: 'Ms. Katherine Paul', role: 'English & Creative Arts', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Fostering soft skills, dramatic arts, and public speaking in children to boost confidence.', email: 'katherine.p@gagangiri.org', type: 'primary', category: 'primary_school', qualification: 'M.A. (English), D.Ed' },
        { id: 'fac-5', name: 'Mr. Ramesh Patil', role: 'Primary Science & Math Teacher', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Specialist in hands-on science activities and early math modules for younger students.', email: 'ramesh.p@gagangiri.org', type: 'primary', category: 'primary_school', qualification: 'B.Sc, B.Ed' },
        { id: 'fac-6', name: 'Mrs. Neha Joshi', role: 'Primary Marathi & Social Studies', image: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Promoting mother-tongue reading clubs and local historical narrative dramas.', email: 'neha.j@gagangiri.org', type: 'primary', category: 'ashramschool', qualification: 'M.A., B.Ed' },

        // Secondary Staff
        { id: 'fac-2', name: 'Mr. Arvind Saxena', role: 'Head of Science & Math', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Passionate physicist introducing experiential learning kits and robotics to rural students.', email: 'arvind.s@gagangiri.org', type: 'secondary', category: 'ashramschool', qualification: 'M.Sc (Physics), B.Ed' },
        { id: 'fac-4', name: 'Mr. Rajesh Kumar', role: 'Physical Education & Sports Head', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Former state athlete dedicated to discovering rural talent and placing them in national trials.', email: 'rajesh.k@gagangiri.org', type: 'secondary', category: 'ashramschool', qualification: 'B.P.Ed (Physical Education)' },
        { id: 'fac-7', name: 'Mr. Sanjay Deshmukh', role: 'Secondary History & Marathi', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Guides students through board exam syllabus, focusing on critical writing and grammar workshops.', email: 'sanjay.d@gagangiri.org', type: 'secondary', category: 'primary_school', qualification: 'M.A., B.Ed' },
        { id: 'fac-8', name: 'Mrs. Priya Sharma', role: 'Secondary Chemistry & Biology', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Focuses on higher secondary exam board prep, practical chemical titration, and bio-specimens.', email: 'priya.s@gagangiri.org', type: 'secondary', category: 'ashramschool', qualification: 'M.Sc, B.Ed' }
      ];
      for (const item of initialStaff) {
        await conn.query(
          'INSERT INTO staff (id, name, role, image, bio, email, type, category, qualification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [item.id, item.name, item.role, item.image, item.bio, item.email, item.type, item.category, item.qualification]
        );
      }
      console.log('Database initialized: Seeded initial staff records.');
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
