
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-luxury-light">
        <div className="text-center p-8">
          <div className="font-playfair text-luxury-purple text-8xl font-bold mb-4">404</div>
          <h1 className="text-3xl font-playfair font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-luxury-muted mb-8 max-w-md mx-auto">
            We're sorry, but the page you were looking for doesn't exist. Let's
            help you find your way back.
          </p>
          <Link to="/">
            <Button className="bg-luxury-purple hover:bg-luxury-purple/90">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
