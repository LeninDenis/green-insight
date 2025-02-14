import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ThemesPage from './components/ThemesPage';
import TrendsPage from './components/TrendsPage';
import RecommendedPage from './components/RecommendedPage';
import NewsPage from './components/NewsPage';
import AboutPage from './components/AboutPage';
import ContactsPage from './components/ContactsPage';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/themes" element={<ThemesPage />} />
              <Route path="/trends" element={<TrendsPage />} />
              <Route path="/recommended" element={<RecommendedPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
