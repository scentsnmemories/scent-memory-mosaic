
import React from "react";
import Layout from "../components/layout/Layout";
import Quiz from "../components/quiz/Quiz";

const QuizPage: React.FC = () => {
  return (
    <Layout>
      <div className="page-transition">
        <Quiz />
      </div>
    </Layout>
  );
};

export default QuizPage;
