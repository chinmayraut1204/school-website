import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { jsPDF } from 'jspdf';
import { useToast } from '../context/ToastContext';
import { 
  BookOpen, 
  UserCheck, 
  FileText, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle,
  FileCheck,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

const AdmissionDetailsPage = () => {
  const { showToast } = useToast();

  const generateDemoPDF = () => {
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
      doc.text("DEMO / SAMPLE APPLICATION FOR ADMISSION (F.Y.J.C. 2026-27)", 105, 32, { align: 'center' });
      doc.rect(15, 28, 180, 6);
      
      // 1. Admission Details
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 38, 190, 7, 'F');
      doc.rect(10, 38, 190, 7);
      doc.text("1. ADMISSION & COURSE DETAILS", 13, 43);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Selected Branch: Science", 15, 50);
      doc.text("Academic Year: F.Y.J.C.", 80, 50);
      doc.text("SSC Percentage: 85.60%", 140, 50);
      
      // 2. Personal Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 56, 190, 7, 'F');
      doc.rect(10, 56, 190, 7);
      doc.text("2. APPLICANT PERSONAL DETAILS", 13, 61);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Full Name: Deshmukh Rohit Anand Sunita", 15, 68);
      doc.text("Date of Birth: 15/05/2010", 15, 74);
      doc.text("Place of Birth: Jawhar", 80, 74);
      doc.text("Nationality: Indian", 145, 74);
      
      doc.text("Religion: Hindu", 15, 80);
      doc.text("Category: Christian Minority", 80, 80);
      doc.text("Caste & Sub-Caste: Kunbi", 145, 80);
      
      doc.text("Gender: Male", 15, 86);
      
      // 3. Contacts & Parent Info
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 92, 190, 7, 'F');
      doc.rect(10, 92, 190, 7);
      doc.text("3. PARENT / GUARDIAN & CONTACT DETAILS", 13, 97);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Parent/Guardian Name: Anand Deshmukh", 15, 104);
      doc.text("Occupation: Farming", 120, 104);
      doc.text("Relationship: Father", 15, 110);
      
      doc.text("Student's Email: rohit.deshmukh@gmail.com", 15, 116);
      doc.text("Parent's Mobile No: 9876543210", 120, 116);
      
      doc.text("Permanent Address: At Post Hiradpada, Tal. Jawhar, Dist. Palghar, Pin - 401603", 15, 122, { maxWidth: 180 });
      
      // 4. School Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setFillColor(240, 240, 240);
      doc.rect(10, 134, 190, 7, 'F');
      doc.rect(10, 134, 190, 7);
      doc.text("4. ACADEMIC RECORDS & PREVIOUS SCHOOL DETAILS", 13, 139);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text("School Last Attended: Hiradpada Secondary School", 15, 146);
      doc.text("Exam Board: Maharashtra State Board (SSC)", 15, 152);
      doc.text("Passing Month/Year: March 2026", 100, 152);
      doc.text("Seat Number: A102938", 150, 152);
      
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
      const sampleSubjects = [
        { name: "English", obtained: "84", outOf: "100" },
        { name: "Marathi", obtained: "88", outOf: "100" },
        { name: "Hindi", obtained: "82", outOf: "100" },
        { name: "Mathematics", obtained: "92", outOf: "100" },
        { name: "Science & Tech", obtained: "86", outOf: "100" },
        { name: "Social Science", obtained: "86", outOf: "100" },
        { name: "Information Technology (Extra)", obtained: "90", outOf: "100" }
      ];
      sampleSubjects.forEach((sub) => {
        doc.rect(15, yOffset, 180, 5.5);
        doc.text(sub.name, 17, yOffset + 4);
        doc.text(sub.obtained, 95, yOffset + 4);
        doc.text(sub.outOf, 150, yOffset + 4);
        yOffset += 5.5;
      });
      
      doc.setFont("Helvetica", "bold");
      doc.rect(15, yOffset, 180, 5.5);
      doc.text("Total S.S.C. Marks / Percentage", 17, yOffset + 4);
      doc.text("608", 95, yOffset + 4);
      doc.text(`700  (85.60%)`, 150, yOffset + 4);
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
      doc.text("Student Signature: Rohit Anand Deshmukh", 15, yOffset);
      doc.text("Parent Signature: Anand Deshmukh", 100, yOffset);
      doc.text("Date: 06/06/2026", 160, yOffset);
      
      doc.save("eklavya_admission_demo_receipt.pdf");
      showToast('Demo Admission Form PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF Generation error:', err);
      showToast('Error generating Demo PDF.', 'error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-28 pb-10 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Regular Admissions 2026-27</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl mx-auto leading-tight tracking-tight">
            ADMISSION PROCEDURE <span className="text-indigo-400">FYJC REGULAR</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            Review the eligibility criteria, reservation categories, and necessary documentation requirements below before filling out the admission application.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          
          {/* Eligibility & Minority Info Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Eligibility Card */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <GlassCard glowColor="rgba(99, 102, 241, 0.12)" className="h-full p-8 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Eligibility Criteria</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Standard general regulations for streams</p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />

                  <div className="space-y-5">
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 tracking-wider">
                        Arts / Commerce / Science
                      </span>
                    </div>
                    
                    <div className="space-y-4 text-left">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                          Must have passed the <strong className="text-slate-900 dark:text-white">X Std. (SSC) Examination</strong> of the Maharashtra Board of Secondary Education or its equivalent.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                          Open to students who have passed the S.S.C. examination or its equivalent from the Maharashtra Board or any other Board recognized by the Government.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-xs text-slate-500 font-semibold italic">
                  Note: Equivalence certificate and deed of undertaking might be required for non-state board students.
                </div>
              </GlassCard>
            </motion.div>

            {/* Minority & Categories Card */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <GlassCard glowColor="rgba(16, 185, 129, 0.12)" className="h-full p-8 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Minority Status & Seats</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Approved constitutional status</p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 dark:bg-emerald-950/20 dark:border-emerald-500/10">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                        The College enjoys the status of a <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Christian Minority Institution</strong>. Admission is open to eligible candidates matching this status, as well as general merits.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                        Categories under which you can apply:
                      </h4>
                      <ul className="space-y-2.5">
                        <li className="flex items-center gap-2.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Open Merit
                        </li>
                        <li className="flex items-center gap-2.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Christian Minority
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  <UserCheck className="w-4 h-4" />
                  Secured Intake Categories
                </div>
              </GlassCard>
            </motion.div>

          </section>

          {/* List of Required Documents */}
          <motion.section variants={itemVariants} className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-2">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">List of Required Documents</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold">
                Please prepare these documents for physical submission at the college admin office
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Category A: State Board */}
              <GlassCard className="p-8 border border-slate-200/40 dark:border-slate-800/40 text-left space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-extrabold text-indigo-600 dark:text-indigo-400">
                    A
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      Maharashtra State Board (SSC)
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide mt-0.5">
                      For students passing S.S.C. from Maharashtra Board
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800" />

                <ul className="space-y-4">
                  {[
                    "Admission form duly filled online/offline",
                    "Original Mark Sheet + 4 attested photocopies",
                    "Original School Leaving Certificate + 4 attested photocopies",
                    "4 Photocopies of Aadhaar Card",
                    "Fees must be paid in full on the day of admission"
                  ].map((doc, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-350">{doc}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Category B: Other Boards */}
              <GlassCard className="p-8 border border-slate-200/40 dark:border-slate-800/40 text-left space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-extrabold text-emerald-600 dark:text-emerald-400">
                    B
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      Boards other than Maharashtra State Board
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wide mt-0.5">
                      For CBSC, ICSE, NIOS, or other state/national boards
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800" />

                <ul className="space-y-4">
                  {[
                    "All documents mentioned in Section A (Admission form, original Marksheet, original Leaving Certificate, 4 Aadhar copies, fees)",
                    "Eligibility Certificate along with the deed of undertaking",
                    "Original Migration Certificate + 4 attested photocopies",
                    "Foreign Students should complete Appendix “A”"
                  ].map((doc, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-350">{doc}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

            </div>
          </motion.section>

          {/* Important Notice and Demo Form Grid */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-stretch">
            
            {/* Warning Callout */}
            <div className="lg:col-span-7 rounded-3xl bg-amber-500/5 border border-amber-500/20 dark:bg-amber-950/10 dark:border-amber-950/40 p-8 text-left space-y-4 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] text-amber-500 pointer-events-none">
                <AlertTriangle className="w-72 h-72" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0 animate-bounce" />
                  <h3 className="text-lg font-black uppercase tracking-wider">
                    Important Note for Students & Parents
                  </h3>
                </div>

                <div className="h-px bg-amber-500/20 w-full" />

                <div className="space-y-4 text-sm font-semibold text-slate-650 dark:text-slate-300 leading-relaxed">
                  <p>
                    Students are advised in their own interest, that before submitting certificates, mark sheets etc., in the original to the College office, they should <strong className="text-amber-700 dark:text-amber-400 underline font-extrabold decoration-2">retain true copies (photocopies)</strong> of the documents with themselves.
                  </p>
                  <p>
                    The <strong className="text-slate-900 dark:text-white font-extrabold underline decoration-red-500/50 decoration-2">Original School Leaving Certificate or Transfer Certificate will be kept by the College permanently</strong> and under no circumstances will it be given back to the students.
                  </p>
                  <p className="text-amber-600 dark:text-amber-400 font-extrabold">
                    Hence, students should keep a sufficient number of photocopies of the Mark Sheet, School Leaving or Transfer Certificates with them.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Form PDF Generator Card */}
            <div className="lg:col-span-5">
              <GlassCard glowColor="rgba(99, 102, 241, 0.15)" className="p-8 border border-slate-200/40 dark:border-slate-800/40 h-full flex flex-col justify-between text-left space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        Sample Completed Form
                      </h3>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide mt-0.5">
                        Demo Admission PDF
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800" />

                  <p className="text-sm font-semibold text-slate-650 dark:text-slate-400 leading-relaxed">
                    Download a pre-filled sample admission form receipt to see exactly how your application format, selected subjects list, S.S.C. percentage calculations, and parent declarations will appear after final online submission.
                  </p>
                </div>

                <div className="pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateDemoPDF}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs tracking-wider uppercase shadow-md transition-colors"
                  >
                    <FileCheck className="w-4.5 h-4.5" />
                    <span>Download Demo Form PDF</span>
                  </motion.button>
                </div>
              </GlassCard>
            </div>
          </motion.section>

          {/* Call to Action (CTA) */}
          <motion.section variants={itemVariants} className="text-center pt-6">
            <GlassCard className="max-w-xl mx-auto p-8 border border-indigo-500/20 shadow-xl space-y-6">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Ready to fill out your Admission Application?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                You can fill out the Eklavya Junior College Admission Form online. Once submitted, you can download a PDF copy of your application form receipt.
              </p>
              <div className="pt-2">
                <Link to="/admission">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm tracking-wide shadow-md transition-colors"
                  >
                    <span>Proceed to Admission Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </GlassCard>
          </motion.section>

        </motion.div>
      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default AdmissionDetailsPage;
