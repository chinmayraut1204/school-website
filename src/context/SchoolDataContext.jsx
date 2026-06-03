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

export const SchoolDataProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('school_announcements_v2');
    return saved ? JSON.parse(saved) : initialAnnouncements;
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

  const [campusLife, setCampusLife] = useState(() => {
    const saved = localStorage.getItem('school_campus_life_v2');
    return saved ? JSON.parse(saved) : initialCampusLife;
  });

  const [isDbOffline, setIsDbOffline] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync to database if online
  useEffect(() => {
    const loadDbData = async () => {
      try {
        const [annRes, contentRes, galleryRes, campusLifeRes] = await Promise.all([
          api.get('/announcements'),
          api.get('/content'),
          api.get('/gallery'),
          api.get('/campus-life')
        ]);
        
        setAnnouncements(annRes.data);
        setSchoolContent({
          ...initialSchoolContent,
          ...contentRes.data
        });
        setGallery(galleryRes.data);
        setCampusLife(campusLifeRes.data);
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
    localStorage.setItem('school_announcements_v2', JSON.stringify(announcements));
  }, [announcements]);

  // Methods
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

  const addCampusLifeItem = async (item) => {
    try {
      const response = await api.post('/campus-life', item);
      const newItem = response.data;
      setCampusLife(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      const localItem = {
        id: `cl-${Date.now()}`,
        ...item
      };
      setCampusLife(prev => [localItem, ...prev]);
      return localItem;
    }
  };

  const deleteCampusLifeItem = async (id) => {
    try {
      await api.delete(`/campus-life/${id}`);
    } catch (err) {
      console.warn('DB delete error, removing locally.');
    }
    setCampusLife(prev => prev.filter(c => c.id !== id));
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

  useEffect(() => {
    localStorage.setItem('school_campus_life_v2', JSON.stringify(campusLife));
  }, [campusLife]);

  return (
    <SchoolDataContext.Provider value={{
      announcements,
      schoolContact,
      schoolContent,
      faculty,
      gallery,
      sponsors,
      campusLife,
      isDbOffline,
      loading,
      addAnnouncement,
      deleteAnnouncement,
      updateSchoolContact,
      updateSchoolContent,
      addGalleryItem,
      deleteGalleryItem,
      addCampusLifeItem,
      deleteCampusLifeItem,
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
