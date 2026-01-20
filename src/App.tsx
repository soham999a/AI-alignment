import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Simulator from './pages/Simulator';
import Scenarios from './pages/Scenarios';
import Challenges from './pages/Challenges';
import About from './pages/About';
import PostSimulationAnalysis from './pages/PostSimulationAnalysis';
import Login from './pages/Login';
import CaseStudy from './pages/CaseStudy';
import { useAuthStore } from './store/useAuthStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading Laboratory...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-[#101622] text-[#111318] dark:text-gray-100 flex flex-col font-sans transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/simulator" element={
              <ProtectedRoute>
                <Simulator />
              </ProtectedRoute>
            } />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/about" element={<About />} />
            <Route path="/story" element={<CaseStudy />} />
            <Route path="/analysis" element={
              <ProtectedRoute>
                <PostSimulationAnalysis />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
