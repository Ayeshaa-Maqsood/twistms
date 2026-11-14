import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AIAssistantWidget from './components/common/AIAssistantWidget';
import FavoritesDrawer from './components/common/FavoritesDrawer';
import ScrollProgressBar from './components/common/ScrollProgressBar';
import IntroCurtain from './components/motion/IntroCurtain';
import PageTransition from './components/motion/PageTransition';
import Home from './pages/Home';
import Search from './pages/Search';
import Agents from './pages/Agents';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import PropertyDetail from './pages/PropertyDetail';
import SubmitProperty from './pages/SubmitProperty';

function App() {
  return (
    // reducedMotion="user": Framer Motion drops transform/layout animation
    // (keeps opacity) whenever the OS requests reduced motion.
    <MotionConfig reducedMotion="user">
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col architect-grid relative selection:bg-[#B4B4B4]/20 selection:text-[#111111]">
            <IntroCurtain />
            <ScrollProgressBar />
            <Header />
            <main className="flex-1">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/agents" element={<Agents />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/submit" element={<SubmitProperty />} />
                  <Route path="/property/:id" element={<PropertyDetail />} />
                </Routes>
              </PageTransition>
            </main>

            {/* 24/7 AI Real Estate Assistant Floating Hub */}
            <AIAssistantWidget />

            {/* Saved Properties Slide-out Drawer */}
            <FavoritesDrawer />

            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </MotionConfig>
  );
}

export default App;
