
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Plus, Minus } from "lucide-react";
import Layout from "../components/layout/Layout";
import { getPerfumeById, getRelatedPerfumes } from "../data/perfumes";
import { useApp } from "../context/AppContext";
import PerfumeCard from "../components/perfume/PerfumeCard";
import { Perfume } from "../types";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const PerfumeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleFavorite, isInFavorites, isInCart } = useApp();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [relatedPerfumes, setRelatedPerfumes] = useState<Perfume[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const foundPerfume = getPerfumeById(id);
      
      if (foundPerfume) {
        setPerfume(foundPerfume);
        setRelatedPerfumes(getRelatedPerfumes(id));
      }
    }
  }, [id]);

  if (!perfume) {
    return (
      <Layout>
        <div className="luxury-container py-12 text-center">
          <p>Perfume not found. Please try another one.</p>
          <Link to="/catalog" className="btn-primary inline-block mt-4">
            Browse Catalog
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(perfume, quantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

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

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Image */}
            <div className="w-full lg:w-2/5">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={perfume.imageUrl}
                  alt={perfume.name}
                  className="w-full h-auto rounded-lg object-cover"
                  style={{ aspectRatio: '3/4' }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-3/5">
              <div className="mb-2 text-luxury-muted">{perfume.brand}</div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-purple mb-3">
                {perfume.name}
              </h1>
              
              <div className="mb-6">{perfume.size}</div>
              
              <div className="text-2xl font-medium mb-6">${perfume.price.toFixed(2)}</div>
              
              <div className="mb-8">
                <h3 className="font-medium mb-2">Scent Family:</h3>
                <div className="inline-block bg-luxury-purple/5 px-3 py-1 rounded-full text-sm">
                  {perfume.scentFamily.charAt(0).toUpperCase() + perfume.scentFamily.slice(1)}
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Quantity:</h3>
                <div className="flex items-center border border-luxury-muted/50 rounded-md w-32">
                  <button 
                    className="p-2 hover:bg-luxury-muted/10" 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-full text-center border-0 focus:ring-0 bg-transparent"
                  />
                  <button 
                    className="p-2 hover:bg-luxury-muted/10" 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart & Wishlist Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={!perfume.inStock || isInCart(perfume.id)}
                  className="flex-grow bg-luxury-purple hover:bg-luxury-purple/90"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {!perfume.inStock
                    ? "Out of Stock"
                    : isInCart(perfume.id)
                    ? "Added to Cart"
                    : "Add to Cart"}
                </Button>
                <Button
                  onClick={() => toggleFavorite(perfume.id)}
                  variant="outline"
                  className={`border-luxury-purple ${
                    isInFavorites(perfume.id)
                      ? "bg-luxury-purple text-white"
                      : "text-luxury-purple hover:bg-luxury-purple hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInFavorites(perfume.id) ? "fill-current" : ""}`} />
                  <span className="ml-2 hidden sm:inline">Wishlist</span>
                </Button>
              </div>

              {/* Product Info Tabs */}
              <Tabs defaultValue="description">
                <TabsList className="w-full border-b border-luxury-muted/30 mb-4">
                  <TabsTrigger value="description" className="text-sm">Description</TabsTrigger>
                  <TabsTrigger value="notes" className="text-sm">Fragrance Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-4">
                  <p className="text-luxury-dark/80">{perfume.description}</p>
                </TabsContent>
                <TabsContent value="notes" className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Top Notes</h4>
                      <div className="flex flex-wrap">
                        {perfume.notes
                          .filter(note => note.type === "top")
                          .map((note, index) => (
                            <span key={index} className="perfume-notes-tag top-note">
                              {note.name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Heart Notes</h4>
                      <div className="flex flex-wrap">
                        {perfume.notes
                          .filter(note => note.type === "heart")
                          .map((note, index) => (
                            <span key={index} className="perfume-notes-tag heart-note">
                              {note.name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Base Notes</h4>
                      <div className="flex flex-wrap">
                        {perfume.notes
                          .filter(note => note.type === "base")
                          .map((note, index) => (
                            <span key={index} className="perfume-notes-tag base-note">
                              {note.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related Products */}
          {relatedPerfumes.length > 0 && (
            <div className="mt-16">
              <h2 className="font-playfair text-2xl font-bold text-luxury-purple mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedPerfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PerfumeDetailPage;
