import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ToastViewport } from './components/ToastViewport';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Collection from './pages/Collection';
import About from './pages/About';
import Support from './pages/Support';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';

function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    document.title = 'DigitX Pro | Smart Living, Audio & Tech Gadgets';
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#222]">
      <ScrollRestoration />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/collections/:slug" element={<Collection />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/pages/about-us" element={<About />} />
          <Route path="/pages/support" element={<Support />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="*"
            element={
              <div className="container mx-auto py-[4rem] text-center">
                <h1 className="text-[3rem] font-bold">404</h1>
                <p className="mt-[1rem] text-[1.5rem] text-[#878787]">Page not found</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <ToastViewport />
    </div>
  );
}

export default App;
