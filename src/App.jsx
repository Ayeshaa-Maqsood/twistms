import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AIAssistantWidget from './components/common/AIAssistantWidget';
import FavoritesDrawer from './components/common/FavoritesDrawer';
import Home from './pages/Home';
import Search from './pages/Search';
import Agents from './pages/Agents';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import PropertyDetail from './pages/PropertyDetail';
import SubmitProperty from './pages/SubmitProperty';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-[#FBF8F2] text-[#1A202C] flex flex-col architect-grid relative selection:bg-[#C5A880]/30 selection:text-[#1A202C]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/submit" element={<SubmitProperty />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
            </Routes>
          </main>
          
          {/* 24/7 AI Real Estate Assistant Floating Hub */}
          <AIAssistantWidget />

          {/* Saved Properties Slide-out Drawer */}
          <FavoritesDrawer />

          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
