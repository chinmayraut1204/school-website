import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const SchoolDataContext = createContext();

const initialAnnouncements = [
  { id: 'ann-1', text: '🏆 Tribal Sports Meet: Eklavya Ashramschool secured 3 gold medals in the District Athletics Meet!', type: 'success', date: '2026-05-28' },
  { id: 'ann-2', text: '💻 Digital Literacy Program: Shri Gagangiri Adivasi Trust starts Phase 2 of coding courses at Hiradpada campus.', type: 'info', date: '2026-05-25' },
  { id: 'ann-3', text: '📝 Admissions Open: Applications for residential Eklavya Ashramschool enrollment (Grades 1-12) are open.', type: 'warning', date: '2026-05-20' },
  { id: 'ann-4', text: '🥛 Nutrition Support: Special dietary additions sponsored for residential tribal hostel students.', type: 'info', date: '2026-05-15' }
];

const initialSchoolContact = {
  trustName: 'Shri Gagangiri Adivasi Shikshan Prasarak Sanstha Jamsar',
  schoolName: 'Eklavya Primary, Secondary Ashramschool and Junior College Hiradpada',
  tal: 'Jawhar',
  dist: 'Palghar',
  address: 'Hiradpada, Tal: Jawhar, Dist: Palghar, Maharashtra - 401603',
  email: 'gagangiriashram@gmail.com',
  phone: '9545292231'
};

const initialSchoolContent = {
  about: 'Established under the aegis of Shri Gagangiri Adivasi Shikshan Prasarak Sanstha Jamsar, Eklavya Primary, Secondary Ashramschool and Junior College in Hiradpada (Tal: Jawhar, Dist: Palghar) is dedicated to providing high-quality residential education to tribal (Adivasi) children. We are committed to fostering academic brilliance, character growth, and sports proficiency, ensuring that financial status never hinders a child\'s dreams.',
  mission: 'To deliver modern residential education and sports training that equips tribal students from marginalized backgrounds with digital skills, analytical capabilities, and ethical values to become self-reliant leaders of tomorrow.',
  vision: 'To build a model digital-first residential institution where learning is interactive, creative, inclusive, and accessible to tribal youths, bridging the socio-economic divide through community empowerment.',
  history: [
    { year: '2003', title: 'प्राथमिक नियमित विभाग मान्यता', desc: 'आदिवासी विकास विभाग - शासन निर्णय क्रमांक अआशा-2002/प्र.क्र.49/का.11 मंत्रालय विस्तार, मुंबई-32 दि.22 एप्रिल, 2003' },
    { year: '2011', title: 'प्राथमिक अतिरिक्त तुकडी विभाग मान्यता', desc: 'आदिवासी विकास विभाग - शासन निर्णय क्रमांक अतुवा-2011/प्र.क्र.140/का.11 मंत्रालय विस्तार, मुंबई-400032 दि.17 सप्टेंबर, 2011' },
    { year: '2011', title: 'माध्यमिक नियमित विभाग मान्यता', desc: 'आदिवासी विकास विभाग - शासन निर्णय क्रमांक अआशा-2011/प्र.क्र.159/का.11(1) मंत्रालय, मुंबई-400032 दि.31 डिसेंबर, 2011' },
    { year: '2014', title: 'माध्यमिक अतिरिक्त तुकडी विभाग मान्यता', desc: 'आदिवासी विकास विभाग - शासन निर्णय क्रमांक अतुवा-2014/प्र.क्र.103/का.11 मंत्रालय विस्तार, मुंबई-400032 दि.11 जुलै, 2014' },
    { year: '2019', title: 'कनिष्ठ महाविद्यालय नियमित विभाग मान्यता', desc: 'आदिवासी विकास विभाग - शासन निर्णय क्रमांक अआशा-2015/प्र.क्र.104/का.11 मंत्रालय, मुंबई-400032 दि.10 जून, 2019' }
  ]
};

const initialFaculty = [
  // Primary Staff
  { id: 'fac-1', name: 'Mrs. Shanti Swaroop', role: 'Principal & Senior Hindi Lit', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80', bio: '25+ years of education leadership, driving social change through girls\' literacy campaigns.', email: 'shanti.s@gagangiri.org', type: 'primary', category: 'school_section' },
  { id: 'fac-3', name: 'Ms. Katherine Paul', role: 'English & Creative Arts', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Fostering soft skills, dramatic arts, and public speaking in children to boost confidence.', email: 'katherine.p@gagangiri.org', type: 'primary', category: 'school_section' },
  { id: 'fac-5', name: 'Mr. Ramesh Patil', role: 'Primary Science & Math Teacher', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Specialist in hands-on science activities and early math modules for younger students.', email: 'ramesh.p@gagangiri.org', type: 'primary', category: 'school_section' },
  { id: 'fac-6', name: 'Mrs. Neha Joshi', role: 'Primary Marathi & Social Studies', image: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Promoting mother-tongue reading clubs and local historical narrative dramas.', email: 'neha.j@gagangiri.org', type: 'primary', category: 'ashramschool' },

  // Secondary Staff
  { id: 'fac-2', name: 'Mr. Arvind Saxena', role: 'Head of Science & Math', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Passionate physicist introducing experiential learning kits and robotics to rural students.', email: 'arvind.s@gagangiri.org', type: 'secondary', category: 'ashramschool' },
  { id: 'fac-4', name: 'Mr. Rajesh Kumar', role: 'Physical Education & Sports Head', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Former state athlete dedicated to discovering rural talent and placing them in national trials.', email: 'rajesh.k@gagangiri.org', type: 'secondary', category: 'ashramschool' },
  { id: 'fac-7', name: 'Mr. Sanjay Deshmukh', role: 'Secondary History & Marathi', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Guides students through board exam syllabus, focusing on critical writing and grammar workshops.', email: 'sanjay.d@gagangiri.org', type: 'secondary', category: 'school_section' },
  { id: 'fac-8', name: 'Mrs. Priya Sharma', role: 'Secondary Chemistry & Biology', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Focuses on higher secondary exam board prep, practical chemical titration, and bio-specimens.', email: 'priya.s@gagangiri.org', type: 'secondary', category: 'ashramschool' }
];

const initialGallery = [
  { id: 'gal-1', title: 'Smart Classroom interactive session', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80', category: 'Classrooms' },
  { id: 'gal-2', title: 'Computer training module for girls', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', category: 'Labs' },
  { id: 'gal-3', title: 'Chemistry lab practical test', url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80', category: 'Labs' },
  { id: 'gal-4', title: 'Annual Athletic Relay Winners', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80', category: 'Sports' },
  { id: 'gal-5', title: 'Morning assembly and library hours', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', category: 'Events' },
  { id: 'gal-6', title: 'Healthy midday nutrition meals distribution', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', category: 'Events' }
];

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

const initialSponsors = [
  { id: 'spon-1', name: 'EduGlow Foundation', logoText: 'EGF' },
  { id: 'spon-2', name: 'FutureTech Systems', logoText: 'FTS' },
  { id: 'spon-3', name: 'Caring Hands Trust', logoText: 'CHT' },
  { id: 'spon-4', name: 'Apex Logistics', logoText: 'APEX' },
  { id: 'spon-5', name: 'Star Solar Energy', logoText: 'SSE' },
  { id: 'spon-6', name: 'Pinnacle Foods Corp', logoText: 'PFC' }
];

const initialResults = [];

const initialStudentCounts = [
  { id: 'sc-1', academic_year: '2026-27', boys: 542, girls: 545, total: 1087 },
  { id: 'sc-2', academic_year: '2025-26', boys: 518, girls: 524, total: 1042 },
  { id: 'sc-3', academic_year: '2024-25', boys: 495, girls: 501, total: 996 }
];

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

const initialInfrastructure = [
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

export const SchoolDataProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem('school_announcements_v2');
      return saved ? JSON.parse(saved) : initialAnnouncements;
    } catch (e) {
      console.warn('Failed to load announcements from localStorage:', e);
      return initialAnnouncements;
    }
  });

  const [needs, setNeeds] = useState(() => {
    try {
      const saved = localStorage.getItem('school_needs_v2');
      return saved ? JSON.parse(saved) : initialNeeds;
    } catch (e) {
      console.warn('Failed to load needs from localStorage:', e);
      return initialNeeds;
    }
  });

  const [infrastructure, setInfrastructure] = useState(() => {
    try {
      const saved = localStorage.getItem('school_infrastructure_v2');
      return saved ? JSON.parse(saved) : initialInfrastructure;
    } catch (e) {
      console.warn('Failed to load infrastructure from localStorage:', e);
      return initialInfrastructure;
    }
  });

  const [schoolContact, setSchoolContact] = useState(() => {
    try {
      const saved = localStorage.getItem('school_contact_v2');
      return saved ? JSON.parse(saved) : initialSchoolContact;
    } catch (e) {
      console.warn('Failed to load schoolContact from localStorage:', e);
      return initialSchoolContact;
    }
  });

  const [schoolContent, setSchoolContent] = useState(() => {
    try {
      const saved = localStorage.getItem('school_content_v3');
      return saved ? JSON.parse(saved) : initialSchoolContent;
    } catch (e) {
      console.warn('Failed to load schoolContent from localStorage:', e);
      return initialSchoolContent;
    }
  });

  const [faculty, setFaculty] = useState(() => {
    try {
      const saved = localStorage.getItem('school_faculty_v4');
      return saved ? JSON.parse(saved) : initialFaculty;
    } catch (e) {
      console.warn('Failed to load faculty from localStorage:', e);
      return initialFaculty;
    }
  });

  const [gallery, setGallery] = useState(() => {
    try {
      const saved = localStorage.getItem('school_gallery_v2');
      return saved ? JSON.parse(saved) : initialGallery;
    } catch (e) {
      console.warn('Failed to load gallery from localStorage:', e);
      return initialGallery;
    }
  });

  const [sponsors, setSponsors] = useState(() => {
    try {
      const saved = localStorage.getItem('school_sponsors_v2');
      return saved ? JSON.parse(saved) : initialSponsors;
    } catch (e) {
      console.warn('Failed to load sponsors from localStorage:', e);
      return initialSponsors;
    }
  });

  const [campusLife, setCampusLife] = useState(() => {
    try {
      const saved = localStorage.getItem('school_campus_life_v2');
      return saved ? JSON.parse(saved) : initialCampusLife;
    } catch (e) {
      console.warn('Failed to load campusLife from localStorage:', e);
      return initialCampusLife;
    }
  });

  const [results, setResults] = useState(() => {
    try {
      const saved = localStorage.getItem('school_results_v3');
      return saved ? JSON.parse(saved) : initialResults;
    } catch (e) {
      console.warn('Failed to load results from localStorage:', e);
      return initialResults;
    }
  });

  const [studentCounts, setStudentCounts] = useState(() => {
    try {
      const saved = localStorage.getItem('school_student_counts_v1');
      return saved ? JSON.parse(saved) : initialStudentCounts;
    } catch (e) {
      console.warn('Failed to load studentCounts from localStorage:', e);
      return initialStudentCounts;
    }
  });

  const [classStudents, setClassStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('school_class_students_v1');
      return saved ? JSON.parse(saved) : initialClassStudents;
    } catch (e) {
      console.warn('Failed to load classStudents from localStorage:', e);
      return initialClassStudents;
    }
  });

  const [isDbOffline, setIsDbOffline] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync to database if online
  useEffect(() => {
    const loadDbData = async () => {
      try {
        const [annRes, contentRes, galleryRes, campusLifeRes, resultsRes, needsRes, infraRes, staffRes, countsRes, classStudentsRes] = await Promise.all([
          api.get('/announcements'),
          api.get('/content'),
          api.get('/gallery'),
          api.get('/campus-life'),
          api.get('/results'),
          api.get('/needs'),
          api.get('/infrastructure'),
          api.get('/staff'),
          api.get('/student-counts'),
          api.get('/class-students')
        ]);
        
        setAnnouncements(annRes.data);
        setSchoolContent({
          ...initialSchoolContent,
          ...contentRes.data
        });
        setGallery(galleryRes.data);
        setCampusLife(campusLifeRes.data);
        setResults(resultsRes.data);
        setNeeds(needsRes.data);
        setInfrastructure(infraRes.data);
        setFaculty(staffRes.data);
        setStudentCounts(countsRes.data);
        setClassStudents(classStudentsRes.data);
        setIsDbOffline(false);
        console.log('MySQL Database connection successfully verified.');
      } catch (error) {
        console.warn('MySQL Server is offline. Booting frontend in local state/localStorage mode.');
        setIsDbOffline(true);
      } finally {
        setLoading(false);
      }
    };
    loadDbData();
  }, []);



  // Sync to LocalStorage as secondary backup fallback
  useEffect(() => {
    try {
      localStorage.setItem('school_announcements_v2', JSON.stringify(announcements));
    } catch (e) {
      console.warn('Failed to sync announcements to localStorage:', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem('school_needs_v2', JSON.stringify(needs));
    } catch (e) {
      console.warn('Failed to sync needs to localStorage:', e);
    }
  }, [needs]);

  // Methods
  const addAnnouncement = async (ann) => {
    try {
      const response = await api.post('/announcements', ann);
      const newAnn = response.data;
      setAnnouncements(prev => [newAnn, ...prev]);
      return newAnn;
    } catch (err) {
      console.error('Failed to add announcement:', err);
      throw err;
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await api.delete(`/announcements/${id}`);
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Failed to delete announcement:', err);
      throw err;
    }
  };

  const addNeed = async (need) => {
    try {
      const response = await api.post('/needs', need);
      const newNeed = response.data;
      setNeeds(prev => [newNeed, ...prev]);
      return newNeed;
    } catch (err) {
      console.error('Failed to add need:', err);
      throw err;
    }
  };

  const deleteNeed = async (id) => {
    try {
      await api.delete(`/needs/${id}`);
      setNeeds(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('Failed to delete need:', err);
      throw err;
    }
  };

  const addInfrastructureItem = async (item) => {
    try {
      const response = await api.post('/infrastructure', item);
      const newItem = response.data;
      setInfrastructure(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      console.error('Failed to add infrastructure item:', err);
      throw err;
    }
  };

  const deleteInfrastructureItem = async (id) => {
    try {
      await api.delete(`/infrastructure/${id}`);
      setInfrastructure(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete need:', err);
      throw err;
    }
  };

  const updateSchoolContact = (contact) => {
    setSchoolContact(prev => ({ ...prev, ...contact }));
  };

  const updateSchoolContent = async (content) => {
    try {
      await api.post('/content', content);
      setSchoolContent(prev => ({ ...prev, ...content }));
    } catch (err) {
      console.error('Failed to update school content:', err);
      throw err;
    }
  };

  const addGalleryItem = async (item) => {
    try {
      const response = await api.post('/gallery', item);
      const newItem = response.data;
      setGallery(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      console.error('Failed to add gallery item:', err);
      throw err;
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      await api.delete(`/gallery/${id}`);
      setGallery(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      console.error('Failed to delete gallery item:', err);
      throw err;
    }
  };

  const addSponsor = (spon) => {
    const newSpon = {
      id: `spon-${Date.now()}`,
      ...spon
    };
    setSponsors(prev => [...prev, newSpon]);
    return newSpon;
  };

  const deleteSponsor = (id) => {
    setSponsors(prev => prev.filter(s => s.id !== id));
  };

  const addCampusLifeItem = async (item) => {
    try {
      const response = await api.post('/campus-life', item);
      const newItem = response.data;
      setCampusLife(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      console.error('Failed to add campus life item:', err);
      throw err;
    }
  };

  const deleteCampusLifeItem = async (id) => {
    try {
      await api.delete(`/campus-life/${id}`);
      setCampusLife(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Failed to delete campus life item:', err);
      throw err;
    }
  };

  const addFaculty = async (fac) => {
    try {
      const response = await api.post('/staff', fac);
      const newFac = response.data;
      setFaculty(prev => [...prev, newFac]);
      return newFac;
    } catch (err) {
      console.error('Failed to add staff member:', err);
      throw err;
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await api.delete(`/staff/${id}`);
      setFaculty(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error('Failed to delete staff member:', err);
      throw err;
    }
  };

  const addResult = async (resItem) => {
    try {
      const response = await api.post('/results', resItem);
      const newRes = response.data;
      setResults(prev => [newRes, ...prev]);
      return newRes;
    } catch (err) {
      console.error('Failed to add result:', err);
      throw err;
    }
  };

  const deleteResult = async (id) => {
    try {
      await api.delete(`/results/${id}`);
      setResults(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Failed to delete result:', err);
      throw err;
    }
  };

  const addStudentCount = async (record) => {
    try {
      const response = await api.post('/student-counts', record);
      const newRecord = response.data;
      setStudentCounts(prev => {
        const exists = prev.some(item => item.academic_year === newRecord.academic_year);
        if (exists) {
          return prev.map(item => item.academic_year === newRecord.academic_year ? newRecord : item);
        }
        return [newRecord, ...prev].sort((a, b) => b.academic_year.localeCompare(a.academic_year));
      });
      return newRecord;
    } catch (err) {
      console.error('Failed to add student count:', err);
      throw err;
    }
  };

  const deleteStudentCount = async (id) => {
    try {
      await api.delete(`/student-counts/${id}`);
      setStudentCounts(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete student count:', err);
      throw err;
    }
  };

  const addClassStudent = async (item) => {
    try {
      const response = await api.post('/class-students', item);
      const newItem = response.data;
      setClassStudents(prev => [...prev, newItem].sort((a, b) => a.sort_order - b.sort_order));
      return newItem;
    } catch (err) {
      console.error('Failed to add class student:', err);
      throw err;
    }
  };

  const updateClassStudent = async (id, item) => {
    try {
      const response = await api.put(`/class-students/${id}`, item);
      const updated = response.data;
      setClassStudents(prev => prev.map(cs => cs.id === id ? updated : cs).sort((a, b) => a.sort_order - b.sort_order));
      return updated;
    } catch (err) {
      console.error('Failed to update class student:', err);
      throw err;
    }
  };

  const deleteClassStudent = async (id) => {
    try {
      await api.delete(`/class-students/${id}`);
      setClassStudents(prev => prev.filter(cs => cs.id !== id));
    } catch (err) {
      console.error('Failed to delete class student:', err);
      throw err;
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('school_contact_v2', JSON.stringify(schoolContact));
    } catch (e) {
      console.warn('Failed to sync schoolContact to localStorage:', e);
    }
  }, [schoolContact]);

  useEffect(() => {
    try {
      localStorage.setItem('school_content_v3', JSON.stringify(schoolContent));
    } catch (e) {
      console.warn('Failed to sync schoolContent to localStorage:', e);
    }
  }, [schoolContent]);

  useEffect(() => {
    try {
      localStorage.setItem('school_faculty_v4', JSON.stringify(faculty));
    } catch (e) {
      console.warn('Failed to sync faculty to localStorage:', e);
    }
  }, [faculty]);

  useEffect(() => {
    try {
      localStorage.setItem('school_gallery_v2', JSON.stringify(gallery));
    } catch (e) {
      console.warn('Failed to sync gallery to localStorage:', e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem('school_sponsors_v2', JSON.stringify(sponsors));
    } catch (e) {
      console.warn('Failed to sync sponsors to localStorage:', e);
    }
  }, [sponsors]);

  useEffect(() => {
    try {
      localStorage.setItem('school_campus_life_v2', JSON.stringify(campusLife));
    } catch (e) {
      console.warn('Failed to sync campusLife to localStorage:', e);
    }
  }, [campusLife]);

  useEffect(() => {
    try {
      localStorage.setItem('school_results_v3', JSON.stringify(results));
    } catch (e) {
      console.warn('Failed to sync results to localStorage:', e);
    }
  }, [results]);

  useEffect(() => {
    try {
      localStorage.setItem('school_infrastructure_v2', JSON.stringify(infrastructure));
    } catch (e) {
      console.warn('Failed to sync infrastructure to localStorage:', e);
    }
  }, [infrastructure]);

  useEffect(() => {
    try {
      localStorage.setItem('school_student_counts_v1', JSON.stringify(studentCounts));
    } catch (e) {
      console.warn('Failed to sync studentCounts to localStorage:', e);
    }
  }, [studentCounts]);

  useEffect(() => {
    try {
      localStorage.setItem('school_class_students_v1', JSON.stringify(classStudents));
    } catch (e) {
      console.warn('Failed to sync classStudents to localStorage:', e);
    }
  }, [classStudents]);

  return (
    <SchoolDataContext.Provider value={{
      announcements,
      needs,
      infrastructure,
      schoolContact,
      schoolContent,
      faculty,
      gallery,
      sponsors,
      campusLife,
      results,
      studentCounts,
      classStudents,
      isDbOffline,
      loading,
      addAnnouncement,
      deleteAnnouncement,
      addNeed,
      deleteNeed,
      addInfrastructureItem,
      deleteInfrastructureItem,
      updateSchoolContact,
      updateSchoolContent,
      addGalleryItem,
      deleteGalleryItem,
      addCampusLifeItem,
      deleteCampusLifeItem,
      addSponsor,
      deleteSponsor,
      addFaculty,
      deleteFaculty,
      addResult,
      deleteResult,
      addStudentCount,
      deleteStudentCount,
      addClassStudent,
      updateClassStudent,
      deleteClassStudent
    }}>
      {children}
    </SchoolDataContext.Provider>
  );
};

export const useSchoolData = () => {
  const context = useContext(SchoolDataContext);
  if (!context) throw new Error('useSchoolData must be used within a SchoolDataProvider');
  return context;
};
