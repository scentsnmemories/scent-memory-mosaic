
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import Layout from "../components/layout/Layout";
import { useApp } from "../context/AppContext";
import PerfumeCard from "../components/perfume/PerfumeCard";
import { Button } from "../components/ui/button";

const FavoritesPage: React.FC = () => {
  const { getFavorites } = useApp();
  const favoritePerfumes = getFavorites();

  return (
    <Layout>
      <div className="page-transition">
        <div className="luxury-container py-12">
          <div className="mb-8">
            <Link to="/catalog" className="inline-flex items-center text-luxury-purple hover:text-luxury-accent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Link>
          </div>

          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-purple mb-8">
            Your Wishlist
          </h1>

          {favoritePerfumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoritePerfumes.map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-luxury-muted/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-luxury-purple" />
                </div>
              </div>
              <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-luxury-muted mb-6">
                You haven't added any fragrances to your wishlist yet. Explore our collection and save your favorites.
              </p>
              <Link to="/catalog">
                <Button className="bg-luxury-purple hover:bg-luxury-purple/90">
                  Explore Fragrances
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
