
import React from "react";
import Layout from "../components/layout/Layout";
import QuizResults from "../components/quiz/QuizResults";

const QuizResultsPage: React.FC = () => {
  return (
    <Layout>
      <div className="page-transition">
        <QuizResults />
      </div>
    </Layout>
  );
};

export default QuizResultsPage;
