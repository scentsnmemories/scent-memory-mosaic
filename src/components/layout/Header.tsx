
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, User, Menu, X, LogOut, Loader2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/button";
import { toast } from "../ui/sonner";

const Header: React.FC = () => {
  const { getCartItemCount, signOut, isAuthenticated, loading } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    const { error } = await signOut();
    setIsLoggingOut(false);
    
    if (error) {
      toast.error('Sign out failed', { description: error.message });
      return;
    }
    
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="luxury-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-playfair font-bold text-luxury-purple">
            Scents & Memories
          </h1>
        </Link>

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
          {loading ? (
            <Button variant="outline" size="sm" className="rounded-full" disabled>
              <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
          ) : isAuthenticated() ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full" 
              onClick={handleSignOut}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </>
              )}
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="rounded-full">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>

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
              {loading ? (
                <div className="flex items-center py-2 px-4">
                  <Loader2 className="w-5 h-5 mr-3 animate-spin text-luxury-purple" />
                  Loading...
                </div>
              ) : isAuthenticated() ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center py-2 px-4 w-full text-left hover:bg-luxury-muted/10 rounded-md"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-5 h-5 mr-3 animate-spin text-luxury-purple" />
                  ) : (
                    <LogOut className="w-5 h-5 mr-3 text-luxury-purple" />
                  )}
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center py-2 px-4 hover:bg-luxury-muted/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-3 text-luxury-purple" />
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
