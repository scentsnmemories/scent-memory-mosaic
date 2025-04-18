
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Perfume } from "../../types";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/button";

interface PerfumeCardProps {
  perfume: Perfume;
}

const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume }) => {
  const { addToCart, isInCart, toggleFavorite, isInFavorites } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(perfume, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(perfume.id);
  };

  return (
    <div className="perfume-card group">
      <div className="relative">
        <Link to={`/perfume/${perfume.id}`}>
          <img
            src={perfume.imageUrl}
            alt={perfume.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute top-0 right-0 p-2">
            <button
              onClick={handleToggleFavorite}
              className="p-2 bg-white rounded-full shadow-md hover:bg-luxury-muted/10 transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  isInFavorites(perfume.id)
                    ? "text-red-500 fill-red-500"
                    : "text-luxury-purple"
                }`}
              />
            </button>
          </div>
          {perfume.isNew && (
            <div className="absolute top-2 left-2">
              <span className="bg-luxury-purple text-white text-xs font-medium px-2.5 py-1 rounded-md">
                New
              </span>
            </div>
          )}
          {perfume.isBestseller && (
            <div className="absolute top-2 left-2">
              <span className="bg-luxury-gold text-luxury-dark text-xs font-medium px-2.5 py-1 rounded-md">
                Bestseller
              </span>
            </div>
          )}
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/perfume/${perfume.id}`}>
          <div className="text-sm text-luxury-muted mb-1">{perfume.brand}</div>
          <h3 className="font-playfair font-medium text-lg text-luxury-purple mb-1">
            {perfume.name}
          </h3>
          <div className="text-sm mb-3">{perfume.size}</div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">${perfume.price.toFixed(2)}</span>
            <span className="text-xs text-luxury-muted">
              {perfume.scentFamily.charAt(0).toUpperCase() + perfume.scentFamily.slice(1)}
            </span>
          </div>
        </Link>
        <Button
          onClick={handleAddToCart}
          disabled={!perfume.inStock || isInCart(perfume.id)}
          className="w-full bg-luxury-purple hover:bg-luxury-purple/90"
          size="sm"
        >
          {!perfume.inStock
            ? "Out of Stock"
            : isInCart(perfume.id)
            ? "Added to Cart"
            : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default PerfumeCard;
