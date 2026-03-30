import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import Albums from './components/pages/Albums'
import AlbumDetail from './components/pages/AlbumDetail'
import About from './components/pages/About'
import Contact from './components/pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
          <Header />
          <main>
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/albums"      element={<Albums />} />
              <Route path="/albums/:id"  element={<AlbumDetail />} />
              <Route path="/about"       element={<About />} />
              <Route path="/contact"     element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
