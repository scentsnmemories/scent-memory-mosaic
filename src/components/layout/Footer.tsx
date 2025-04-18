
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-purple text-white pt-12 pb-8">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="block mb-4">
              <h2 className="text-2xl font-playfair font-bold text-white">
                Scents & Memories
              </h2>
            </Link>
            <p className="text-luxury-muted mb-6 text-sm">
              Discover your perfect signature scent with our luxury fragrance app.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-playfair mb-4 text-luxury-gold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog" className="hover:text-luxury-gold transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link to="/catalog?filter=new" className="hover:text-luxury-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/catalog?filter=bestsellers" className="hover:text-luxury-gold transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-luxury-gold transition-colors">
                  Find Your Scent
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-playfair mb-4 text-luxury-gold">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-luxury-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-luxury-gold transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-luxury-gold transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-luxury-gold transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-playfair mb-4 text-luxury-gold">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-luxury-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/philosophy" className="hover:text-luxury-gold transition-colors">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="hover:text-luxury-gold transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-luxury-gold transition-colors">
                  Fragrance Journal
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-luxury-muted/30 text-sm text-luxury-muted flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Scents & Memories. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link to="/privacy" className="hover:text-luxury-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-luxury-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
