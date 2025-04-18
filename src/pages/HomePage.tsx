
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PerfumeCard from "../components/perfume/PerfumeCard";
import Layout from "../components/layout/Layout";
import { getNewArrivals, getBestsellers } from "../data/perfumes";
import { Button } from "../components/ui/button";

const HomePage: React.FC = () => {
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();

  return (
    <Layout>
      <div className="page-transition">
        {/* Hero Section */}
        <section className="bg-luxury-cream">
          <div className="luxury-container py-16 md:py-20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-purple leading-tight mb-6">
                  Discover Your Perfect Signature Scent
                </h1>
                <p className="text-lg md:text-xl mb-8 text-luxury-dark/80">
                  Explore our curated collection of luxury fragrances and find the scent that speaks to your personality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/quiz">
                    <Button className="w-full sm:w-auto bg-luxury-purple hover:bg-luxury-purple/90 px-8 py-6 text-base">
                      Take Fragrance Quiz
                    </Button>
                  </Link>
                  <Link to="/catalog">
                    <Button variant="outline" className="w-full sm:w-auto border-luxury-purple text-luxury-purple hover:bg-luxury-purple hover:text-white px-8 py-6 text-base">
                      Shop All Fragrances
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src="/placeholder.svg"
                  alt="Luxury perfumes"
                  className="rounded-lg shadow-lg w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="py-16 bg-white">
          <div className="luxury-container">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-playfair text-3xl font-bold text-luxury-purple">New Arrivals</h2>
              <Link to="/catalog?filter=new" className="flex items-center text-luxury-purple hover:text-luxury-accent">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newArrivals.map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          </div>
        </section>

        {/* Fragrance Quiz Banner */}
        <section className="py-16 bg-luxury-purple text-white">
          <div className="luxury-container text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Not Sure Which Fragrance Is Right For You?</h2>
            <p className="text-lg mb-8 text-luxury-muted max-w-2xl mx-auto">
              Take our personalized fragrance quiz and discover the perfect scent that matches your personality and preferences.
            </p>
            <Link to="/quiz">
              <Button className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90 px-8 py-6 text-base">
                Find Your Signature Scent
              </Button>
            </Link>
          </div>
        </section>

        {/* Bestsellers Section */}
        <section className="py-16 bg-luxury-light">
          <div className="luxury-container">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-playfair text-3xl font-bold text-luxury-purple">Bestsellers</h2>
              <Link to="/catalog?filter=bestsellers" className="flex items-center text-luxury-purple hover:text-luxury-accent">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bestsellers.map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="luxury-container">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold text-luxury-purple mb-4">The Scents & Memories Experience</h2>
              <p className="text-luxury-muted max-w-2xl mx-auto">
                Discover why fragrance enthusiasts choose our curated collection of luxury scents.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-luxury-purple/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-purple">
                    <path d="m7 11 2-2-2-2"></path>
                    <path d="M11 13h4"></path>
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <h3 className="font-playfair font-bold text-xl mb-3 text-luxury-purple">Personalized Recommendations</h3>
                <p className="text-luxury-muted">
                  Our fragrance quiz helps you discover perfumes that match your unique preferences and personality.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-luxury-purple/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-purple">
                    <path d="m2 9 3-3 3 3"></path>
                    <path d="M13 18H7a2 2 0 0 1-2-2V6"></path>
                    <path d="m22 15-3 3-3-3"></path>
                    <path d="M11 6h6a2 2 0 0 1 2 2v10"></path>
                  </svg>
                </div>
                <h3 className="font-playfair font-bold text-xl mb-3 text-luxury-purple">Curated Collection</h3>
                <p className="text-luxury-muted">
                  Every fragrance in our collection is carefully selected for its quality and distinctive character.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-luxury-purple/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-purple">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h3 className="font-playfair font-bold text-xl mb-3 text-luxury-purple">Fragrance Stories</h3>
                <p className="text-luxury-muted">
                  Learn about the inspiration, notes, and emotions behind each perfume in our detailed descriptions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
