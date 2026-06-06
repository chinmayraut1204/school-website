import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SchoolDataProvider } from './context/SchoolDataContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/common/ProtectedRoute';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AboutSchoolPage = lazy(() => import('./pages/AboutSchoolPage'));
const AdmissionPage = lazy(() => import('./pages/AdmissionPage'));
const AdmissionDetailsPage = lazy(() => import('./pages/AdmissionDetailsPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const AboutFounderPage = lazy(() => import('./pages/AboutFounderPage'));
const StaffPage = lazy(() => import('./pages/StaffPage'));
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage'));
const SponsorsPage = lazy(() => import('./pages/SponsorsPage'));
const StudentsPage = lazy(() => import('./pages/StudentsPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <SchoolDataProvider>
        <ToastProvider>
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about-school" element={<AboutSchoolPage />} />
                <Route path="/admission" element={<AdmissionPage />} />
                <Route path="/admission-details" element={<AdmissionDetailsPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/about-founder" element={<AboutFounderPage />} />
                <Route path="/primary-staff" element={<StaffPage section="primary" />} />
                <Route path="/secondary-staff" element={<StaffPage section="secondary" />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/sponsors" element={<SponsorsPage />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Suspense>
          </Router>
        </ToastProvider>
      </SchoolDataProvider>
    </ThemeProvider>
  );
}

export default App;
