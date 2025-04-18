
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizQuestions, determinePersonalityType } from "../../data/quiz";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { useApp } from "../../context/AppContext";

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleSelectOption = (scentAssociations: string[]) => {
    setSelectedOption(scentAssociations.join(","));
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      // Add the selected scents to the answers array
      setAnswers([...answers, ...selectedOption.split(",")]);
      setSelectedOption(null);

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        completeQuiz();
      }
    }
  };

  const completeQuiz = () => {
    // Calculate the quiz results
    const allSelectedScents = [...answers];
    if (selectedOption) {
      allSelectedScents.push(...selectedOption.split(","));
    }

    const personalityType = determinePersonalityType(allSelectedScents);

    // Save the results to user context if available
    if (user) {
      setUser({
        ...user,
        completedQuiz: true,
        quizResults: {
          recommendedScentFamilies: personalityType.scentFamilies,
          personalityType: personalityType.id,
          recommendedPerfumes: personalityType.recommendedPerfumeIds,
        },
        preferences: {
          ...user.preferences,
          scentFamilies: [...new Set([...user.preferences.scentFamilies, ...personalityType.scentFamilies])],
        },
      });
    }

    setIsComplete(true);
  };

  const handleViewResults = () => {
    navigate("/quiz/results");
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setIsComplete(false);
  };

  return (
    <div className="py-8">
      <div className="luxury-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-purple mb-4">
              Discover Your Perfect Scent
            </h1>
            <p className="text-luxury-muted">
              Answer a few questions to find fragrances that match your personality and preferences.
            </p>
          </div>

          {!isComplete ? (
            <Card className="border-luxury-muted/30 shadow-md">
              <CardHeader>
                <CardTitle className="text-luxury-purple font-playfair">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </CardTitle>
                <CardDescription>
                  <div className="w-full bg-luxury-muted/30 h-2 rounded-full mt-2">
                    <div
                      className="bg-luxury-gold h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
                <div className="space-y-4">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option.scentAssociation)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedOption === option.scentAssociation.join(",")
                          ? "border-luxury-purple bg-luxury-purple/5"
                          : "border-luxury-muted/30 hover:border-luxury-muted"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex-1">{option.text}</div>
                        <div
                          className={`w-5 h-5 rounded-full border ${
                            selectedOption === option.scentAssociation.join(",")
                              ? "border-luxury-purple"
                              : "border-luxury-muted"
                          }`}
                        >
                          {selectedOption === option.scentAssociation.join(",") && (
                            <div className="w-3 h-3 bg-luxury-purple rounded-full m-auto mt-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                  className="w-full bg-luxury-purple hover:bg-luxury-purple/90"
                >
                  {currentQuestionIndex < quizQuestions.length - 1
                    ? "Next Question"
                    : "Complete Quiz"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-luxury-muted/30 shadow-md text-center">
              <CardHeader>
                <CardTitle className="text-luxury-purple font-playfair text-2xl">
                  Quiz Completed!
                </CardTitle>
                <CardDescription>
                  Thank you for taking the time to complete our fragrance quiz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="my-8 flex flex-col items-center">
                  <div className="p-4 bg-luxury-purple/10 rounded-full mb-4">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-luxury-purple"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl mb-2 font-medium">We've found your perfect scents!</h3>
                  <p className="text-luxury-muted">
                    Based on your answers, we've curated a collection of fragrances that we think
                    you'll love.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <Button
                  onClick={handleViewResults}
                  className="w-full sm:w-auto bg-luxury-purple hover:bg-luxury-purple/90"
                >
                  View My Results
                </Button>
                <Button
                  onClick={handleRetakeQuiz}
                  variant="outline"
                  className="w-full sm:w-auto border-luxury-purple text-luxury-purple hover:bg-luxury-purple hover:text-white"
                >
                  Retake Quiz
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
