
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { personalityTypes } from "../../data/quiz";
import { getPerfumeById, scentFamilies } from "../../data/perfumes";
import { useApp } from "../../context/AppContext";
import PerfumeCard from "../perfume/PerfumeCard";
import { Button } from "../ui/button";
import { Perfume } from "../../types";

const QuizResults: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [recommendedPerfumes, setRecommendedPerfumes] = useState<Perfume[]>([]);
  
  useEffect(() => {
    if (user?.quizResults?.recommendedPerfumes) {
      const perfumes = user.quizResults.recommendedPerfumes
        .map(id => getPerfumeById(id))
        .filter(perfume => perfume !== undefined) as Perfume[];
      setRecommendedPerfumes(perfumes);
    } else {
      // If no quiz results, redirect to the quiz page
      navigate("/quiz");
    }
  }, [user, navigate]);

  if (!user?.quizResults) {
    return null; // Will redirect via the useEffect
  }

  const personalityType = personalityTypes.find(
    type => type.id === user.quizResults?.personalityType
  );

  const userScentFamilies = user.quizResults?.recommendedScentFamilies || [];
  const scentFamilyDetails = scentFamilies.filter(family =>
    userScentFamilies.includes(family.id)
  );

  return (
    <div className="py-12">
      <div className="luxury-container">
        <div className="mb-10">
          <Link to="/quiz" className="inline-flex items-center text-luxury-purple hover:text-luxury-accent mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quiz
          </Link>

          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-purple mb-4">
              Your Fragrance Personality
            </h1>
            <p className="text-luxury-muted max-w-2xl mx-auto">
              Based on your answers, we've identified your fragrance personality and curated a selection of perfumes that we think you'll love.
            </p>
          </div>

          {personalityType && (
            <div className="bg-white shadow-md rounded-lg p-6 md:p-10 mb-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="bg-luxury-purple/10 rounded-full p-5 w-28 h-28 flex items-center justify-center flex-shrink-0">
                  <span className="text-luxury-purple font-playfair font-bold text-4xl">
                    {personalityType.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-playfair font-bold text-luxury-purple mb-3">
                    {personalityType.name}
                  </h2>
                  <p className="text-lg mb-6">{personalityType.description}</p>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Your Scent Families:</h3>
                    <div className="flex flex-wrap gap-2">
                      {scentFamilyDetails.map((family) => (
                        <span
                          key={family.id}
                          className="bg-luxury-purple/5 px-3 py-1 rounded-full text-sm"
                        >
                          {family.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-16">
            <h2 className="text-2xl font-playfair font-bold text-luxury-purple mb-6 text-center">
              Recommended Fragrances for You
            </h2>
            {recommendedPerfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendedPerfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-luxury-muted">No recommendations found. Please try taking the quiz again.</p>
                <Button
                  onClick={() => navigate("/quiz")}
                  className="mt-4 bg-luxury-purple hover:bg-luxury-purple/90"
                >
                  Retake Quiz
                </Button>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link to="/catalog">
              <Button className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90">
                Browse All Fragrances
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
