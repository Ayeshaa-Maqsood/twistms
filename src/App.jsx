import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FBF8F2] text-[#1A202C] flex flex-col architect-grid relative selection:bg-[#C5A880]/30 selection:text-[#1A202C]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
