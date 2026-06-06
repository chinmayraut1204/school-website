import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  FileCheck, 
  Upload, 
  User, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { useSchoolData } from '../context/SchoolDataContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import Button from '../components/common/Button';
import api from '../utils/api';

const AdmissionPage = () => {
  const { schoolContact } = useSchoolData();
  const { showToast } = useToast();

  // Accordion Dropdowns State
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Form Step State
  const [step, setStep] = useState(1);

  // Form Fields State
  const [formData, setFormData] = useState({
    branch: 'Science',
    year: 'F.Y.J.C.',
    ssc_percentage: '',
    surname: '',
    first_name: '',
    father_name: '',
    mother_name: '',
    dob: '',
    place_of_birth: '',
    nationality: 'Indian',
    religion: '',
    gender: '',
    caste: '',
    sub_caste: '',
    category: 'OPEN',
    native_place: '',
    parent_name: '',
    parent_occupation: '',
    parent_relationship: '',
    residential_address: '',
    permanent_address: '',
    residence_no: '',
    mobile_no: '',
    parent_mobile: '',
    student_mobile: '',
    extra_curricular: '',
    student_name_declaration: '',
    parent_name_declaration: '',
    parent_email: '',
  });

  const [sameAddress, setSameAddress] = useState(false);

  // Academic Records State
  const [sscRecord, setSscRecord] = useState({
    board: '',
    year: '',
    seat_no: '',
    marks_obtained: '',
    marks_out_of: '',
    percentage: '',
    school_name: ''
  });

  // Subject-wise Marks Grid
  const [subjectMarks, setSubjectMarks] = useState([
    { name: 'English', obtained: '', outOf: '100', isFixed: true },
    { name: 'Marathi', obtained: '', outOf: '100', isFixed: true },
    { name: 'Hindi', obtained: '', outOf: '100', isFixed: true },
    { name: 'Mathematics', obtained: '', outOf: '100', isFixed: true },
    { name: 'Science', obtained: '', outOf: '100', isFixed: true },
    { name: 'Social Science', obtained: '', outOf: '100', isFixed: true },
    { name: '', obtained: '', outOf: '', isFixed: false },
    { name: '', obtained: '', outOf: '', isFixed: false }
  ]);

  // Uploaded Files State
  const [documents, setDocuments] = useState({
    ssc_marksheet: { name: '', data: '' }
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Subject packages offered based on branch choice
  const offeredSubjects = {
    Science: ['English', 'Marathi', 'Geography', 'Physics', 'Chemistry', 'Biology'],
    Arts: ['English', 'Marathi', 'Geography', 'History', 'Political Science', 'Economics']
  };

  // Sync permanent address with residential if checked
  useEffect(() => {
    if (sameAddress) {
      setFormData(prev => ({
        ...prev,
        permanent_address: prev.residential_address
      }));
    }
  }, [sameAddress, formData.residential_address]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle subject marks changes
  const handleSubjectMarkChange = (index, field, value) => {
    const updated = [...subjectMarks];
    updated[index][field] = value;
    setSubjectMarks(updated);
  };

  // Auto-calculate S.S.C. percentage based on subject marks
  useEffect(() => {
    let totalObtained = 0;
    let totalOutOf = 0;
    let count = 0;

    subjectMarks.forEach(sub => {
      const ob = parseFloat(sub.obtained);
      const out = parseFloat(sub.outOf);
      if (!isNaN(ob) && !isNaN(out) && out > 0) {
        totalObtained += ob;
        totalOutOf += out;
        count++;
      }
    });

    if (totalOutOf > 0) {
      const pct = ((totalObtained / totalOutOf) * 100).toFixed(2);
      setFormData(prev => ({ ...prev, ssc_percentage: pct }));
      setSscRecord(prev => ({
        ...prev,
        marks_obtained: totalObtained.toString(),
        marks_out_of: totalOutOf.toString(),
        percentage: pct
      }));
    }
  }, [subjectMarks]);

  // Handle File Input and validation (Max 500kb, Base64 conversion)
  const handleFileChange = (e, docKey) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check File size (500kb = 512,000 bytes)
    if (file.size > 512000) {
      showToast(`${file.name} exceeds the 500kb size limit. Please upload a compressed document.`, 'error');
      e.target.value = null; // Clear input
      return;
    }

    setUploadProgress(prev => ({ ...prev, [docKey]: 'processing' }));

    const reader = new FileReader();
    reader.onload = () => {
      setDocuments(prev => ({
        ...prev,
        [docKey]: {
          name: file.name,
          data: reader.result
        }
      }));
      setUploadProgress(prev => ({ ...prev, [docKey]: 'complete' }));
      showToast(`${file.name} uploaded successfully.`, 'success');
    };
    reader.onerror = () => {
      showToast(`Error reading file ${file.name}.`, 'error');
      setUploadProgress(prev => ({ ...prev, [docKey]: 'error' }));
    };
    reader.readAsDataURL(file);
  };

  // Toggle accordions
  const toggleAccordion = (index) => {
    setActiveAccordion(prev => (prev === index ? null : index));
  };

  // Validate current step before going forward
  const validateStep = () => {
    if (step === 1) {
      // Step 1: Course & Personal
      const required = [
        'surname', 'first_name', 'father_name', 'mother_name',
        'dob', 'nationality', 'religion', 'gender', 'category'
      ];
      for (const field of required) {
        if (!formData[field].trim()) {
          showToast(`Please fill in the personal field: ${field.replace('_', ' ')}.`, 'warning');
          return false;
        }
      }
    } else if (step === 2) {
      // Step 2: Parent info and addresses
      const required = ['parent_name', 'permanent_address', 'parent_mobile', 'parent_email'];
      for (const field of required) {
        if (!formData[field].trim()) {
          showToast(`Please fill in the contact/parent field: ${field.replace('_', ' ')}.`, 'warning');
          return false;
        }
      }
    } else if (step === 3) {
      // Step 3: Academic Records
      if (!sscRecord.school_name.trim() || !sscRecord.board.trim() || !sscRecord.year.trim() || !sscRecord.seat_no.trim()) {
        showToast('Please fill in all S.S.C. academic and school details.', 'warning');
        return false;
      }
      if (!formData.ssc_percentage || isNaN(parseFloat(formData.ssc_percentage))) {
        showToast('Please enter/calculate your S.S.C. percentage.', 'warning');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.student_name_declaration.trim() || !formData.parent_name_declaration.trim()) {
      showToast('Declaration signatures are required.', 'warning');
      return;
    }

    // Verify critical documents are uploaded
    if (!documents.ssc_marksheet.data) {
      showToast('Please attach the required S.S.C. Mark Sheet.', 'warning');
      return;
    }

    setSubmitting(true);

    const payload = {
      ...formData,
      residential_address: formData.permanent_address, // Map permanent to residential for backend
      academic_records: {
        ssc: sscRecord,
        last_school: {
          board: sscRecord.board,
          school_name: sscRecord.school_name,
          year: sscRecord.year,
          seat_no: sscRecord.seat_no,
          marks_obtained: sscRecord.marks_obtained,
          marks_out_of: sscRecord.marks_out_of,
          percentage: sscRecord.percentage
        },
        subjects_grades: subjectMarks.filter(s => s.name && s.obtained)
      },
      subjects: offeredSubjects[formData.branch],
      documents: {
        ssc_marksheet: documents.ssc_marksheet.name,
        birth_certificate: null,
        leaving_certificate: null,
        aadhaar_card: null,
        photograph: null,
        signature: null,
        domicile: null,
        caste_certificate: null
      }
    };

    try {
      // Post to Node database backend
      await api.post('/admissions', payload);
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      setIsSubmitted(true);
      showToast('Admission application submitted successfully to database!', 'success');
    } catch (err) {
      console.warn('Backend server database insertion failed, triggering local storage fallback sandbox...', err.message);

      // Local storage fallback if database offline
      const localSubmissions = JSON.parse(localStorage.getItem('eklavya_admissions') || '[]');
      const newSubmission = {
        id: `adm-${Date.now()}`,
        ...payload,
        submitted_at: new Date().toISOString()
      };
      localSubmissions.push(newSubmission);
      localStorage.setItem('eklavya_admissions', JSON.stringify(localSubmissions));

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      setIsSubmitted(true);
      showToast('Application Saved (Offline Mode - Local Sandbox Storage Successful)', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  // Generate downloadable PDF form receipt
  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Page border
      doc.rect(5, 5, 200, 287);
      
      // Header Trust
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Shri Gagangiri Adivasi Shikshan Prasarak Sanstha Jamsar's", 105, 12, { align: 'center' });
      
      // Header Title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(15);
      doc.text("EKLAVYA JUNIOR COLLEGE, HIRADPADA", 105, 18, { align: 'center' });
      
      // Header Location
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Tal. Jawhar, Dist. Palghar. Pin - 401603", 105, 23, { align: 'center' });
      
      doc.setLineWidth(0.5);
      doc.line(10, 26, 200, 26);
      
      // Form Sub-Title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text("APPLICATION FOR ADMISSION (F.Y.J.C. 2026-27)", 105, 32, { align: 'center' });
      doc.rect(30, 28, 150, 6);
      
      // 1. Admission Details
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 38, 190, 7, 'F');
      doc.rect(10, 38, 190, 7);
      doc.text("1. ADMISSION & COURSE DETAILS", 13, 43);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Selected Branch: ${formData.branch}`, 15, 50);
      doc.text(`Academic Year: ${formData.year}`, 80, 50);
      doc.text(`SSC Percentage: ${formData.ssc_percentage}%`, 140, 50);
      
      // 2. Personal Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 56, 190, 7, 'F');
      doc.rect(10, 56, 190, 7);
      doc.text("2. APPLICANT PERSONAL DETAILS", 13, 61);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Full Name: ${formData.surname} ${formData.first_name} ${formData.father_name} ${formData.mother_name}`, 15, 68);
      doc.text(`Date of Birth: ${formData.dob}`, 15, 74);
      doc.text(`Place of Birth: ${formData.place_of_birth || 'N/A'}`, 80, 74);
      doc.text(`Nationality: ${formData.nationality}`, 145, 74);
      
      doc.text(`Religion: ${formData.religion}`, 15, 80);
      doc.text(`Category: ${formData.category}`, 80, 80);
      doc.text(`Caste & Sub-Caste: ${formData.caste || 'N/A'}`, 145, 80);
      
      doc.text(`Gender: ${formData.gender}`, 15, 86);
      
      // 3. Contacts & Parent Info
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 92, 190, 7, 'F');
      doc.rect(10, 92, 190, 7);
      doc.text("3. PARENT / GUARDIAN & CONTACT DETAILS", 13, 97);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Parent/Guardian Name: ${formData.parent_name}`, 15, 104);
      doc.text(`Occupation: ${formData.parent_occupation || 'N/A'}`, 120, 104);
      doc.text(`Relationship: ${formData.parent_relationship || 'Parents'}`, 15, 110);
      
      doc.text(`Student's Email: ${formData.parent_email}`, 15, 116);
      doc.text(`Parent's Mobile No: ${formData.parent_mobile}`, 120, 116);
      
      doc.text(`Permanent Address: ${formData.permanent_address}`, 15, 122, { maxWidth: 180 });
      
      // 4. School Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 134, 190, 7, 'F');
      doc.rect(10, 134, 190, 7);
      doc.text("4. ACADEMIC RECORDS & PREVIOUS SCHOOL DETAILS", 13, 139);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`School Last Attended: ${sscRecord.school_name || 'N/A'}`, 15, 146);
      doc.text(`Exam Board: ${sscRecord.board || 'N/A'}`, 15, 152);
      doc.text(`Passing Month/Year: ${sscRecord.year || 'N/A'}`, 100, 152);
      doc.text(`Seat Number: ${sscRecord.seat_no || 'N/A'}`, 150, 152);
      
      // 5. Subject Table
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 158, 190, 7, 'F');
      doc.rect(10, 158, 190, 7);
      doc.text("5. SUBJECT-WISE MARKS STATEMENT", 13, 163);
      
      doc.rect(15, 170, 180, 6);
      doc.text("Subject Name", 17, 174.5);
      doc.text("Marks Obtained", 95, 174.5);
      doc.text("Out Of", 150, 174.5);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      let yOffset = 176;
      subjectMarks.forEach((sub) => {
        if (sub.name.trim() || sub.obtained) {
          doc.rect(15, yOffset, 180, 5.5);
          doc.text(sub.name || 'Extra Subject', 17, yOffset + 4);
          doc.text(sub.obtained || '-', 95, yOffset + 4);
          doc.text(sub.outOf || '-', 150, yOffset + 4);
          yOffset += 5.5;
        }
      });
      
      doc.setFont("Helvetica", "bold");
      doc.rect(15, yOffset, 180, 5.5);
      doc.text("Total S.S.C. Marks / Percentage", 17, yOffset + 4);
      doc.text(`${sscRecord.marks_obtained || '-'}`, 95, yOffset + 4);
      doc.text(`${sscRecord.marks_out_of || '-'}  (${sscRecord.percentage || formData.ssc_percentage}%)`, 150, yOffset + 4);
      yOffset += 9;
      
      // 6. Declarations
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, yOffset, 190, 7, 'F');
      doc.rect(10, yOffset, 190, 7);
      doc.text("6. APPLICANT & PARENT DECLARATION", 13, yOffset + 5);
      yOffset += 11;
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      const declarationText1 = "1. I have read the prospectus of the College and hereby agree, if admitted, to conform to the rules and regulations of the College and to maintain good discipline. I also undertake to comply with the provisions of the ordinances.";
      const declarationText2 = "2. I hereby declare that all the information given in this Application Form by me is true and correct to the best of my knowledge. I will observe all the rules and regulations of the Institution.";
      
      doc.text(declarationText1, 15, yOffset, { maxWidth: 180 });
      yOffset += 7;
      doc.text(declarationText2, 15, yOffset, { maxWidth: 180 });
      yOffset += 10;
      
      // Signatures
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(`Student Signature: ${formData.student_name_declaration}`, 15, yOffset);
      doc.text(`Parent Signature: ${formData.parent_name_declaration}`, 100, yOffset);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, yOffset);
      
      doc.save(`eklavya_admission_${formData.first_name}_${formData.surname}.pdf`);
      showToast('Form PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF Generation error:', err);
      showToast('Error generating PDF download. Please try print dialog.', 'error');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-10 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-emerald-500/10 rounded-full blur-[140px]" />
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80" 
            alt="Graduation Caps" 
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Enrollment Portal 2026-27</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            Junior College Admissions
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Apply online for admission to Eklavya Junior College (Arts & Science branches) for F.Y.J.C. residential courses.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 relative z-10 space-y-16">
        
        {/* Accordion dropdown details (Photo 1) */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-left text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            Admission Procedure & Guidelines
          </h2>

          {/* Accordion 1: Eligibility */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm transition-all duration-300">
            <button
              onClick={() => toggleAccordion(1)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850/30 transition-colors"
            >
              <span className="text-sm uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4.5 h-4.5 text-indigo-500" />
                1. Eligibility Criteria
              </span>
              {activeAccordion === 1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {activeAccordion === 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-slate-100 dark:border-slate-850"
                >
                  <div className="p-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed text-left">
                    <p className="font-bold text-slate-800 dark:text-slate-350">ARTS & SCIENCE BRANCHES:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Candidate must have passed the Class X (SSC) Std. Examination of the Maharashtra State Board of Secondary Education or its equivalent.</li>
                      <li>Students who have passed the equivalent examination from CBSE, ICSE, or other recognized state boards are eligible to apply subject to submitting an eligibility certificate.</li>
                      <li>As a Government Aided Residential Ashramschool, preference is given to underprivileged tribal (ST) children from Jawhar and surrounding rural pockets. Admission is governed by local merit lists.</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 2: Reservation Categories */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm transition-all duration-300">
            <button
              onClick={() => toggleAccordion(2)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850/30 transition-colors"
            >
              <span className="text-sm uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4.5 h-4.5 text-indigo-500" />
                2. Application Categories
              </span>
              {activeAccordion === 2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {activeAccordion === 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-slate-100 dark:border-slate-850"
                >
                  <div className="p-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed text-left">
                    <p className="font-semibold text-slate-800 dark:text-slate-350">Categories under which students can apply:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li><strong>Scheduled Tribe (ST) / Tribal Ashramschool quota</strong> (Aided residential seat covering room boarding, textbooks, and nutrition).</li>
                      <li><strong>Open Merit</strong> (Non-residential or local day-scholar seats as per capacity guidelines).</li>
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 3: Required Documents */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm transition-all duration-300">
            <button
              onClick={() => toggleAccordion(3)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850/30 transition-colors"
            >
              <span className="text-sm uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4.5 h-4.5 text-indigo-500" />
                3. Required Documents Checklist
              </span>
              {activeAccordion === 3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {activeAccordion === 3 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-slate-100 dark:border-slate-850"
                >
                  <div className="p-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed text-left">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-300 mb-2">A. Documents for Maharashtra State Board Candidates:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Duly completed Online Admission Application Form</li>
                        <li>Original S.S.C. Mark Sheet + 4 self-attested photocopies</li>
                        <li>Original School leaving certificate (TC) + 4 self-attested photocopies</li>
                        <li>4 clear photocopies of Student's Aadhaar Card</li>
                        <li>Recent passport size color photograph & student signature scan</li>
                        <li>Caste Certificate & Domicile Certificate (if applicable for ST quota)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-300 mb-2">B. Documents for Other Board Candidates (CBSE, ICSE, Out of State):</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>All standard documents mentioned above</li>
                        <li>Original Migration Certificate + 4 attested photocopies</li>
                        <li>Board Eligibility Certificate along with standard undertaking deed</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Admission Form (Photo 2 styling and theme matches) */}
        <section className="relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-10 bg-indigo-500/10 blur-2xl rounded-full" />
          
          <h2 className="text-xl sm:text-2xl font-black text-left text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-indigo-500" />
            Application Form
          </h2>

          <GlassCard hoverEffect={false} className="p-6 sm:p-10 border-slate-200/60 dark:border-slate-805/40">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Application Dispatched Successfully!</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                    The admission records for <strong>{formData.first_name} {formData.surname}</strong> have been submitted to Eklavya Junior College administration. We will review your S.S.C. record percentage ({formData.ssc_percentage}%) and reach out to you via email.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="md" 
                    onClick={generatePDF}
                    className="flex items-center gap-2 font-bold"
                  >
                    <Download className="w-4 h-4 text-indigo-500" />
                    Download PDF Receipt
                  </Button>
                  <Button 
                    variant="primary" 
                    size="md" 
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                      setFormData({
                        branch: 'Science',
                        year: 'F.Y.J.C.',
                        ssc_percentage: '',
                        surname: '',
                        first_name: '',
                        father_name: '',
                        mother_name: '',
                        dob: '',
                        place_of_birth: '',
                        nationality: 'Indian',
                        religion: '',
                        gender: '',
                        caste: '',
                        sub_caste: '',
                        category: 'OPEN',
                        native_place: '',
                        parent_name: '',
                        parent_occupation: '',
                        parent_relationship: '',
                        residential_address: '',
                        permanent_address: '',
                        residence_no: '',
                        mobile_no: '',
                        parent_mobile: '',
                        student_mobile: '',
                        extra_curricular: '',
                        student_name_declaration: '',
                        parent_name_declaration: '',
                        parent_email: '',
                      });
                      setSameAddress(false);
                      setSscRecord({ board: '', year: '', seat_no: '', marks_obtained: '', marks_out_of: '', percentage: '', school_name: '' });
                      setSubjectMarks([
                        { name: 'English', obtained: '', outOf: '100', isFixed: true },
                        { name: 'Marathi', obtained: '', outOf: '100', isFixed: true },
                        { name: 'Hindi', obtained: '', outOf: '100', isFixed: true },
                        { name: 'Mathematics', obtained: '', outOf: '100', isFixed: true },
                        { name: 'Science', obtained: '', outOf: '100', isFixed: true },
                        { name: 'Social Science', obtained: '', outOf: '100', isFixed: true },
                        { name: '', obtained: '', outOf: '', isFixed: false },
                        { name: '', obtained: '', outOf: '', isFixed: false }
                      ]);
                      setDocuments({
                        ssc_marksheet: { name: '', data: '' }
                      });
                    }}
                  >
                    Submit Another Application
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    Eklavya Junior College Admission Form
                  </h3>
                  <p className="text-xs uppercase font-extrabold tracking-widest text-indigo-500">
                    APPLICATION TO ADMISSION
                  </p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center justify-between max-w-md mx-auto relative px-4">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
                  {[1, 2, 3, 4].map(idx => (
                    <div 
                      key={idx}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs relative z-10 border transition-all duration-300 ${
                        step === idx 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/25' 
                          : step > idx 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-400'
                      }`}
                    >
                      {idx}
                    </div>
                  ))}
                </div>

                {/* Form contents based on steps */}
                <div className="text-left">
                  {step === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-4 border-b border-slate-100 dark:border-slate-850 pb-2">
                        1. Branch Selection & Personal Details
                      </h4>

                      {/* Branch & Year select */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Select Branch</label>
                          <div className="flex items-center gap-6 py-2">
                            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                              <input 
                                type="radio" 
                                name="branch" 
                                value="Science" 
                                checked={formData.branch === 'Science'} 
                                onChange={handleInputChange}
                                className="text-indigo-600 border-slate-300 dark:border-slate-800 bg-transparent focus:ring-0"
                              />
                              Science
                            </label>
                            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                              <input 
                                type="radio" 
                                name="branch" 
                                value="Arts" 
                                checked={formData.branch === 'Arts'} 
                                onChange={handleInputChange}
                                className="text-indigo-600 border-slate-300 dark:border-slate-800 bg-transparent focus:ring-0"
                              />
                              Arts
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Select Year</label>
                          <input 
                            type="text" 
                            name="year" 
                            value="F.Y.J.C." 
                            readOnly
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 focus:outline-none cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-2">S.S.C. Percentage (%)</label>
                          <input 
                            type="text"
                            name="ssc_percentage"
                            value={formData.ssc_percentage}
                            onChange={handleInputChange}
                            placeholder="e.g. 84.60"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-850 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Surname</label>
                          <input 
                            type="text" 
                            name="surname" 
                            value={formData.surname}
                            onChange={handleInputChange}
                            placeholder="Surname"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">First Name</label>
                          <input 
                            type="text" 
                            name="first_name" 
                            value={formData.first_name}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Father's Name</label>
                          <input 
                            type="text" 
                            name="father_name" 
                            value={formData.father_name}
                            onChange={handleInputChange}
                            placeholder="Father's Name"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Mother's Name</label>
                          <input 
                            type="text" 
                            name="mother_name" 
                            value={formData.mother_name}
                            onChange={handleInputChange}
                            placeholder="Mother's Name"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* DOB & Place of Birth */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Date of Birth</label>
                          <input 
                            type="date" 
                            name="dob" 
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Place of Birth</label>
                          <input 
                            type="text" 
                            name="place_of_birth" 
                            value={formData.place_of_birth}
                            onChange={handleInputChange}
                            placeholder="e.g. Jawhar, Palghar"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Nationality</label>
                          <input 
                            type="text" 
                            name="nationality" 
                            value={formData.nationality}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Religion & Gender */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Religion</label>
                          <input 
                            type="text" 
                            name="religion" 
                            value={formData.religion}
                            onChange={handleInputChange}
                            placeholder="e.g. Hindu / Christian"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Gender</label>
                          <select 
                            name="gender" 
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 focus:outline-none"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Category</label>
                          <select 
                            name="category" 
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 focus:outline-none"
                          >
                            <option value="OPEN">OPEN</option>
                            <option value="ST">ST (Scheduled Tribe)</option>
                            <option value="SC">SC (Scheduled Caste)</option>
                            <option value="OBC">OBC</option>
                            <option value="VJ/NT">VJ/NT</option>
                            <option value="SBC">SBC</option>
                          </select>
                        </div>
                      </div>

                      {/* Caste & Sub-caste */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Caste & Sub-Caste</label>
                          <input 
                            type="text" 
                            name="caste" 
                            value={formData.caste}
                            onChange={handleInputChange}
                            placeholder="e.g. Kokna - Warli"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button type="button" variant="primary" size="sm" onClick={nextStep} className="flex items-center gap-1.5 font-bold">
                          Next Section
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-4 border-b border-slate-100 dark:border-slate-850 pb-2">
                        2. Parent / Guardian Details & Address Info
                      </h4>

                      {/* Parent/Guardian details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Name of Parent / Guardian</label>
                          <input 
                            type="text" 
                            name="parent_name" 
                            value={formData.parent_name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Occupation of Parents/Guardian</label>
                          <input 
                            type="text" 
                            name="parent_occupation" 
                            value={formData.parent_occupation}
                            onChange={handleInputChange}
                            placeholder="Occupation"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Relationship (for Guardian)</label>
                          <input 
                            type="text" 
                            name="parent_relationship" 
                            value={formData.parent_relationship}
                            onChange={handleInputChange}
                            placeholder="Relationship"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Student's Email</label>
                          <input 
                            type="email" 
                            name="parent_email" 
                            value={formData.parent_email}
                            onChange={handleInputChange}
                            placeholder="e.g. student@mail.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Parent's Mobile No.</label>
                          <input 
                            type="tel" 
                            name="parent_mobile" 
                            value={formData.parent_mobile}
                            onChange={handleInputChange}
                            placeholder="Parent Mobile Number"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Permanent Address</label>
                        <textarea 
                          rows="4" 
                          name="permanent_address" 
                          value={formData.permanent_address}
                          onChange={handleInputChange}
                          placeholder="Full Permanent Address"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-850 dark:text-slate-200 focus:outline-none resize-none leading-relaxed"
                        />
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" size="sm" onClick={prevStep} className="flex items-center gap-1.5 font-bold">
                          <ArrowLeft className="w-4 h-4" />
                          Previous Section
                        </Button>
                        <Button type="button" variant="primary" size="sm" onClick={nextStep} className="flex items-center gap-1.5 font-bold">
                          Next Section
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-4 border-b border-slate-100 dark:border-slate-850 pb-2">
                        3. Academic Records & Offered Subjects
                      </h4>

                      {/* Merged Academic Record & Previous School Details */}
                      <div className="space-y-4">
                        <h5 className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-wide">
                          A. Academic Record & Previous School Details (S.S.C. / Equivalent)
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">School / College Last Attended</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Jawhar High School"
                              value={sscRecord.school_name || ''}
                              onChange={(e) => setSscRecord({ ...sscRecord, school_name: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Name of Exam Board</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Maharashtra State Board"
                              value={sscRecord.board}
                              onChange={(e) => setSscRecord({ ...sscRecord, board: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Month & Year of Passing</label>
                            <input 
                              type="text" 
                              placeholder="e.g. March 2026"
                              value={sscRecord.year}
                              onChange={(e) => setSscRecord({ ...sscRecord, year: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Exam Seat Number</label>
                            <input 
                              type="text" 
                              placeholder="Seat No."
                              value={sscRecord.seat_no}
                              onChange={(e) => setSscRecord({ ...sscRecord, seat_no: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Marks Obtained / Out Of</label>
                            <input 
                              type="text" 
                              readOnly
                              value={sscRecord.marks_obtained && sscRecord.marks_out_of ? `${sscRecord.marks_obtained} / ${sscRecord.marks_out_of}` : ''}
                              placeholder="Auto calculated"
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-xs font-semibold text-slate-500 focus:outline-none cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Percentage (%)</label>
                            <input 
                              type="text" 
                              readOnly
                              value={formData.ssc_percentage}
                              placeholder="Auto calculated"
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-xs font-semibold text-indigo-500 focus:outline-none cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subject wise marks table (calculated) */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h5 className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-wide">
                            B. Subject-wise Academic Record (For S.S.C. / F.Y.J.C. Percentage calculation)
                          </h5>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-550 dark:text-indigo-400 px-2 py-0.5 rounded-md font-bold self-start">
                            SSC Percentage: {formData.ssc_percentage || '0.00'}%
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50/50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/60">
                          {subjectMarks.map((sub, index) => (
                            <div key={index} className="space-y-2 border border-slate-200/40 dark:border-slate-800/40 p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-left">
                              {sub.isFixed ? (
                                <div className="w-full border-b border-slate-100 dark:border-slate-800 pb-1.5 text-xs font-black text-indigo-600 dark:text-indigo-400">
                                  {sub.name}
                                </div>
                              ) : (
                                <input 
                                  type="text"
                                  placeholder="Extra Subject"
                                  value={sub.name}
                                  onChange={(e) => handleSubjectMarkChange(index, 'name', e.target.value)}
                                  className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 pb-1.5 text-xs font-extrabold focus:outline-none focus:border-indigo-550 dark:text-slate-200"
                                />
                              )}
                              <div className="grid grid-cols-2 gap-2 pt-1.5">
                                <div>
                                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Obtained</label>
                                  <input 
                                    type="number"
                                    placeholder="Marks"
                                    value={sub.obtained}
                                    onChange={(e) => handleSubjectMarkChange(index, 'obtained', e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 px-2 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Out Of</label>
                                  <input 
                                    type="number"
                                    placeholder="Max"
                                    value={sub.outOf}
                                    onChange={(e) => handleSubjectMarkChange(index, 'outOf', e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 px-2 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Subject offered based on branch choice */}
                      <div className="space-y-4">
                        <h5 className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-wide">
                          C. Subjects Offered at Junior College (Offered Package)
                        </h5>
                        <div className="bg-slate-50/50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 text-left">
                          <p className="text-xs text-slate-500 mb-4">
                            You have selected the <strong>{formData.branch}</strong> branch. You will be enrolled in the following core academic subjects:
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            {offeredSubjects[formData.branch].map((sub, idx) => (
                              <div 
                                key={idx}
                                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 text-xs font-bold text-center text-slate-700 dark:text-slate-300 shadow-sm capitalize"
                              >
                                {sub}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" size="sm" onClick={prevStep} className="flex items-center gap-1.5 font-bold">
                          <ArrowLeft className="w-4 h-4" />
                          Previous Section
                        </Button>
                        <Button type="button" variant="primary" size="sm" onClick={nextStep} className="flex items-center gap-1.5 font-bold">
                          Next Section
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-4 border-b border-slate-100 dark:border-slate-850 pb-2">
                        4. Upload Documents & Declaration Agreement
                      </h4>

                      {/* Upload documents panel */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-300">
                          <AlertCircle className="w-4 h-4 text-indigo-500" />
                          <p className="text-[10px] sm:text-xs font-semibold text-slate-500">
                            Scanned files must be in <strong>PDF, JPG, or PNG</strong> format, with a maximum size of <strong>500kb</strong> per document.
                          </p>
                        </div>

                        <div className="max-w-md mx-auto">
                          <div className="border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between gap-4 text-left">
                            <div>
                              <span className="text-sm font-bold text-slate-850 dark:text-slate-250 block mb-1">
                                S.S.C. Mark Sheet *
                              </span>
                              <span className="text-[10px] text-slate-400 block mb-3 font-semibold uppercase">
                                {documents.ssc_marksheet.name ? `Selected: ${documents.ssc_marksheet.name.slice(-30)}` : 'No file chosen'}
                              </span>
                            </div>

                            <div className="relative">
                              <input 
                                type="file" 
                                accept=".pdf,image/*"
                                onChange={(e) => handleFileChange(e, 'ssc_marksheet')}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                              />
                              <div className={`w-full py-3 border border-dashed rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-colors ${
                                uploadProgress.ssc_marksheet === 'complete' 
                                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                                  : uploadProgress.ssc_marksheet === 'processing' 
                                    ? 'bg-amber-500/10 border-amber-500 text-amber-500 animate-pulse'
                                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100'
                              }`}>
                                <Upload className="w-3.5 h-3.5" />
                                {uploadProgress.ssc_marksheet === 'complete' 
                                  ? 'Replace File' 
                                  : uploadProgress.ssc_marksheet === 'processing' 
                                    ? 'Processing...' 
                                    : 'Select File'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Offline Submission Notice */}
                        <div className="border border-amber-250/30 dark:border-amber-900/30 bg-amber-50/40 dark:bg-amber-950/15 p-6 rounded-3xl text-left space-y-4 shadow-sm backdrop-blur-md">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500/15 text-amber-600 dark:text-amber-400 rounded-xl">
                              <AlertCircle className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                              <h5 className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                                Required Documents for Offline Submission
                              </h5>
                              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                                The following original documents and self-attested photocopies must be submitted offline to the college administration office:
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                            {[
                              'Aadhaar Card',
                              'Passport size photo',
                              'Domicile certificate',
                              '10th marksheet',
                              'Leaving certificate',
                              'Caste certificate'
                            ].map((docName, idx) => (
                              <div 
                                key={idx} 
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-250/40 dark:border-slate-800/40 text-xs font-bold text-slate-700 dark:text-slate-350 shadow-xs"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                {docName}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Declarations */}
                      <div className="space-y-4 bg-slate-50/50 dark:bg-slate-900/30 p-5 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 text-left text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        <h5 className="font-extrabold text-slate-800 dark:text-slate-350 mb-3 uppercase tracking-wider text-[10px]">
                          Candidate & Parent Declaration Agreement
                        </h5>
                        <div className="space-y-3">
                          <p>
                            <strong>Declaration 1:</strong> I have read the prospectus of the College and hereby agree, if admitted, to conform to the rules and regulations of the College and to maintain good discipline. I also undertake to comply with the provisions of the ordinances.
                          </p>
                          <p>
                            <strong>Declaration 2:</strong> I hereby declare that all the information given in this Application Form by me is true and correct to the best of my knowledge. I will observe all the rules and regulations of the Institution and violation of College discipline, my admission may be treated as canceled.
                          </p>
                        </div>

                        {/* Signatures */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-850 mt-6">
                          <div>
                            <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1.5">Name of Student (Signature Name)</label>
                            <input 
                              type="text" 
                              name="student_name_declaration"
                              value={formData.student_name_declaration}
                              onChange={handleInputChange}
                              placeholder="Student Sign Name"
                              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-250 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1.5">Name of Parent/Guardian (Signature Name)</label>
                            <input 
                              type="text" 
                              name="parent_name_declaration"
                              value={formData.parent_name_declaration}
                              onChange={handleInputChange}
                              placeholder="Parent/Guardian Sign Name"
                              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-250 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1.5">Verification Date</label>
                            <input 
                              type="text" 
                              readOnly
                              value={new Date().toLocaleDateString()}
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-xs font-semibold text-slate-500 focus:outline-none cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" size="sm" onClick={prevStep} className="flex items-center gap-1.5 font-bold">
                          <ArrowLeft className="w-4 h-4" />
                          Previous Section
                        </Button>
                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="md" 
                          glow
                          className="flex items-center gap-1.5 font-black text-white shadow-lg"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-amber-350 fill-amber-300 animate-pulse" />
                              Submit Application
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </form>
            )}
          </GlassCard>
        </section>
      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default AdmissionPage;
