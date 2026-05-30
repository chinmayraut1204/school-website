import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const SchoolDataContext = createContext();

const initialAnnouncements = [
  { id: 'ann-1', text: '🏆 Tribal Sports Meet: Eklavya Ashramschool secured 3 gold medals in the District Athletics Meet!', type: 'success', date: '2026-05-28' },
  { id: 'ann-2', text: '💻 Digital Literacy Program: Shri Gagangiri Adivasi Trust starts Phase 2 of coding courses at Hiradpada campus.', type: 'info', date: '2026-05-25' },
  { id: 'ann-3', text: '📝 Admissions Open: Applications for residential Eklavya Ashramschool enrollment (Grades 1-12) are open.', type: 'warning', date: '2026-05-20' },
  { id: 'ann-4', text: '🥛 Nutrition Support: Special dietary additions sponsored for residential tribal hostel students.', type: 'info', date: '2026-05-15' }
];

const initialDonations = [
  { id: 'don-1', name: 'Rohan Sharma', amount: 500, message: 'For the computer lab desks and keyboards.', category: 'Infrastructure', date: '2026-05-29' },
  { id: 'don-2', name: 'Dr. Anita Desai', amount: 1500, message: 'Sponsoring library books and science equipment.', category: 'Learning Material', date: '2026-05-28' },
  { id: 'don-3', name: 'Anonymous Giver', amount: 100, message: 'Keep up the amazing work with these kids!', category: 'Sports Equipment', date: '2026-05-27' },
  { id: 'don-4', name: 'Vikram & Priya Goel', amount: 3000, message: 'Scholarship fund for bright tribal students.', category: 'Scholarships', date: '2026-05-25' },
  { id: 'don-5', name: 'Sneha Patel', amount: 250, message: 'Midday meal contributions.', category: 'Nutrition', date: '2026-05-22' }
];

const initialSchoolStats = {
  totalStudents: 480,
  girlsRatio: 48,
  passRate: 97.8,
  teachersCount: 22,
  classroomsCount: 16,
  labsCount: 4,
  smartClassrooms: 6
};

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
    { year: '1998', title: 'Trust Founded', desc: 'Shri Gagangiri Adivasi Shikshan Prasarak Sanstha was established in Jamsar, Jawhar to serve tribal welfare.' },
    { year: '2006', title: 'Ashramschool Inception', desc: 'Started Eklavya Primary & Secondary Ashramschool at Hiradpada with basic boarding rooms.' },
    { year: '2016', title: 'Junior College Upgradation', desc: 'Expanded to include Junior College (Grades 11 & 12) offering Science & Arts streams.' },
    { year: '2022', title: 'Digital Literacy Expansion', desc: 'Partnered with NGOs to construct first smart class and computer literacy lab.' },
    { year: '2026', title: 'Smart Residential Campus', desc: 'Scaling digital modules, introducing clean energy, solar arrays, and high-tech labs.' }
  ]
};

const initialFaculty = [
  { id: 'fac-1', name: 'Mrs. Shanti Swaroop', role: 'Principal & Senior Hindi Lit', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80', bio: '25+ years of education leadership, driving social change through girls\' literacy campaigns.', email: 'shanti.s@gagangiri.org' },
  { id: 'fac-2', name: 'Mr. Arvind Saxena', role: 'Head of Science & Math', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Passionate physicist introducing experiential learning kits and robotics to rural students.', email: 'arvind.s@gagangiri.org' },
  { id: 'fac-3', name: 'Ms. Katherine Paul', role: 'English & Creative Arts', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Fostering soft skills, dramatic arts, and public speaking in children to boost confidence.', email: 'katherine.p@gagangiri.org' },
  { id: 'fac-4', name: 'Mr. Rajesh Kumar', role: 'Physical Education & Sports Head', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80', bio: 'Former state athlete dedicated to discovering rural talent and placing them in national trials.', email: 'rajesh.k@gagangiri.org' }
];

const initialGallery = [
  { id: 'gal-1', title: 'Smart Classroom interactive session', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80', category: 'Classrooms' },
  { id: 'gal-2', title: 'Computer training module for girls', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', category: 'Labs' },
  { id: 'gal-3', title: 'Chemistry lab practical test', url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80', category: 'Labs' },
  { id: 'gal-4', title: 'Annual Athletic Relay Winners', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80', category: 'Sports' },
  { id: 'gal-5', title: 'Morning assembly and library hours', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', category: 'Events' },
  { id: 'gal-6', title: 'Healthy midday nutrition meals distribution', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', category: 'Events' }
];

const initialSponsors = [
  { id: 'spon-1', name: 'EduGlow Foundation', logoText: 'EGF' },
  { id: 'spon-2', name: 'FutureTech Systems', logoText: 'FTS' },
  { id: 'spon-3', name: 'Caring Hands Trust', logoText: 'CHT' },
  { id: 'spon-4', name: 'Apex Logistics', logoText: 'APEX' },
  { id: 'spon-5', name: 'Star Solar Energy', logoText: 'SSE' },
  { id: 'spon-6', name: 'Pinnacle Foods Corp', logoText: 'PFC' }
];

export const SchoolDataProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('school_announcements_v2');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('school_donations_v2');
    return saved ? JSON.parse(saved) : initialDonations;
  });

  const [schoolStats, setSchoolStats] = useState(() => {
    const saved = localStorage.getItem('school_stats_v2');
    return saved ? JSON.parse(saved) : initialSchoolStats;
  });

  const [schoolContact, setSchoolContact] = useState(() => {
    const saved = localStorage.getItem('school_contact_v2');
    return saved ? JSON.parse(saved) : initialSchoolContact;
  });

  const [schoolContent, setSchoolContent] = useState(() => {
    const saved = localStorage.getItem('school_content_v2');
    return saved ? JSON.parse(saved) : initialSchoolContent;
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('school_faculty_v2');
    return saved ? JSON.parse(saved) : initialFaculty;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('school_gallery_v2');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [sponsors, setSponsors] = useState(() => {
    const saved = localStorage.getItem('school_sponsors_v2');
    return saved ? JSON.parse(saved) : initialSponsors;
  });

  const [isDbOffline, setIsDbOffline] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync to database if online
  useEffect(() => {
    const loadDbData = async () => {
      try {
        const [annRes, donRes, statsRes, contentRes, galleryRes] = await Promise.all([
          api.get('/announcements'),
          api.get('/donations'),
          api.get('/stats'),
          api.get('/content'),
          api.get('/gallery')
        ]);
        
        setAnnouncements(annRes.data);
        setDonations(donRes.data);
        setSchoolStats(statsRes.data);
        setSchoolContent(contentRes.data);
        setGallery(galleryRes.data);
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

  // Goal settings
  const donationGoal = 50000;

  // Derived donation figures
  const totalRaised = donations.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalDonationsCount = donations.length;

  // Sync to LocalStorage as secondary backup fallback
  useEffect(() => {
    localStorage.setItem('school_announcements_v2', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('school_donations_v2', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('school_stats_v2', JSON.stringify(schoolStats));
  }, [schoolStats]);

  useEffect(() => {
    localStorage.setItem('school_contact_v2', JSON.stringify(schoolContact));
  }, [schoolContact]);

  useEffect(() => {
    localStorage.setItem('school_content_v2', JSON.stringify(schoolContent));
  }, [schoolContent]);

  useEffect(() => {
    localStorage.setItem('school_faculty_v2', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('school_gallery_v2', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('school_sponsors_v2', JSON.stringify(sponsors));
  }, [sponsors]);

  // Methods
  const addDonation = async (donation) => {
    try {
      const response = await api.post('/donations', donation);
      const newDon = response.data;
      setDonations(prev => [newDon, ...prev]);
      return newDon;
    } catch (err) {
      const localDon = {
        id: `don-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...donation
      };
      setDonations(prev => [localDon, ...prev]);
      return localDon;
    }
  };

  const deleteDonation = async (id) => {
    try {
      await api.delete(`/donations/${id}`);
    } catch (err) {
      console.warn('DB delete error, removing locally.');
    }
    setDonations(prev => prev.filter(d => d.id !== id));
  };

  const addAnnouncement = async (ann) => {
    try {
      const response = await api.post('/announcements', ann);
      const newAnn = response.data;
      setAnnouncements(prev => [newAnn, ...prev]);
      return newAnn;
    } catch (err) {
      const localAnn = {
        id: `ann-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...ann
      };
      setAnnouncements(prev => [localAnn, ...prev]);
      return localAnn;
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await api.delete(`/announcements/${id}`);
    } catch (err) {
      console.warn('DB delete error, removing locally.');
    }
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const updateSchoolStats = async (stats) => {
    try {
      await api.post('/stats', stats);
    } catch (err) {
      console.warn('DB update error, setting locally.');
    }
    setSchoolStats(prev => ({ ...prev, ...stats }));
  };

  const updateSchoolContact = (contact) => {
    setSchoolContact(prev => ({ ...prev, ...contact }));
  };

  const updateSchoolContent = async (content) => {
    try {
      await api.post('/content', content);
    } catch (err) {
      console.warn('DB update error, setting locally.');
    }
    setSchoolContent(prev => ({ ...prev, ...content }));
  };

  const addGalleryItem = async (item) => {
    try {
      const response = await api.post('/gallery', item);
      const newItem = response.data;
      setGallery(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      const localItem = {
        id: `gal-${Date.now()}`,
        ...item
      };
      setGallery(prev => [localItem, ...prev]);
      return localItem;
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      await api.delete(`/gallery/${id}`);
    } catch (err) {
      console.warn('DB delete error, removing locally.');
    }
    setGallery(prev => prev.filter(g => g.id !== id));
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

  const addFaculty = (fac) => {
    const newFac = {
      id: `fac-${Date.now()}`,
      ...fac
    };
    setFaculty(prev => [...prev, newFac]);
  };

  const deleteFaculty = (id) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
  };

  return (
    <SchoolDataContext.Provider value={{
      announcements,
      donations,
      schoolStats,
      schoolContact,
      schoolContent,
      faculty,
      gallery,
      sponsors,
      donationGoal,
      totalRaised,
      totalDonationsCount,
      isDbOffline,
      loading,
      addDonation,
      deleteDonation,
      addAnnouncement,
      deleteAnnouncement,
      updateSchoolStats,
      updateSchoolContact,
      updateSchoolContent,
      addGalleryItem,
      deleteGalleryItem,
      addSponsor,
      deleteSponsor,
      addFaculty,
      deleteFaculty
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
