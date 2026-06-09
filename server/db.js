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



    // Announcements Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id VARCHAR(50) PRIMARY KEY,
        text TEXT NOT NULL,
        type VARCHAR(20),
        date VARCHAR(20)
      )
    `);



    // School Needs Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS school_needs (
        id VARCHAR(50) PRIMARY KEY,
        text TEXT NOT NULL,
        date VARCHAR(20)
      )
    `);



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
      `, ['current', '', '', '']);
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

    const [existingStudentCounts] = await conn.query('SELECT * FROM student_counts');
    if (existingStudentCounts.length === 0) {
      await conn.query(
        'INSERT INTO student_counts (id, academic_year, boys, girls, total) VALUES (?, ?, ?, ?, ?)',
        ['sc-1780774459117', '2025-26', 542, 545, 1087]
      );
      console.log('Database initialized: Seeded default student count summary data.');
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


    
    // Staff Table
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
