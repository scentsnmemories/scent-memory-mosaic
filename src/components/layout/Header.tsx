
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  const { getCartItemCount, isAuthenticated } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="luxury-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-playfair font-bold text-luxury-purple">
            Scents & Memories
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/catalog" className="nav-link">
            Shop
          </Link>
          <Link to="/quiz" className="nav-link">
            Fragrance Quiz
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/favorites" className="p-2 rounded-full hover:bg-luxury-muted/10">
            <Heart className="w-6 h-6 text-luxury-purple" />
          </Link>
          <Link to="/cart" className="p-2 rounded-full hover:bg-luxury-muted/10 relative">
            <ShoppingBag className="w-6 h-6 text-luxury-purple" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Link>
          <Link to={isAuthenticated() ? "/profile" : "/login"}>
            <Button variant="outline" size="sm" className="rounded-full">
              <User className="w-4 h-4 mr-2" />
              {isAuthenticated() ? "Profile" : "Login"}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="p-2 mr-2 rounded-full hover:bg-luxury-muted/10 relative">
            <ShoppingBag className="w-6 h-6 text-luxury-purple" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-luxury-purple hover:bg-luxury-muted/10"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="luxury-container py-4 flex flex-col space-y-4">
            <Link
              to="/catalog"
              className="block py-2 px-4 hover:bg-luxury-muted/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/quiz"
              className="block py-2 px-4 hover:bg-luxury-muted/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Fragrance Quiz
            </Link>
            <Link
              to="/about"
              className="block py-2 px-4 hover:bg-luxury-muted/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 border-t border-luxury-muted/20">
              <Link
                to="/favorites"
                className="flex items-center py-2 px-4 hover:bg-luxury-muted/10 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-5 h-5 mr-3 text-luxury-purple" />
                Favorites
              </Link>
              <Link
                to={isAuthenticated() ? "/profile" : "/login"}
                className="flex items-center py-2 px-4 hover:bg-luxury-muted/10 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3 text-luxury-purple" />
                {isAuthenticated() ? "My Profile" : "Login / Register"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
