import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Contact from './pages/Contact';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <Router>
      <Header />
      <main className="p-8 min-h-screen bg-quantum-dark text-quantum-cyan">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;