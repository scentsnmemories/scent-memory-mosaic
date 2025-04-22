
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../components/ui/sonner';
import Layout from '../components/layout/Layout';
import { Loader2, Eye, EyeOff, WifiOff } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const { signIn, signUp, isAuthenticated, loading } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && !loading) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    setNetworkError(false);
    
    try {
      if (isLogin) {
        console.log('Attempting login with:', { email });
        const { error } = await signIn(email, password);
        if (error) {
          console.error('Login error details:', error);
          
          // Check if it's a network-related error
          if (error.message === 'Failed to fetch') {
            setNetworkError(true);
            toast.error('Network connection error', { 
              description: 'Unable to connect to the authentication service. Please check your internet connection and try again.'
            });
          } else {
            toast.error('Login failed', { description: error.message || 'Please check your credentials and try again' });
          }
          
          setIsSubmitting(false);
          return;
        }
        toast.success('Logged in successfully');
        navigate('/');
      } else {
        if (!fullName && !isLogin) {
          toast.error('Please enter your full name');
          setIsSubmitting(false);
          return;
        }
        
        const { error } = await signUp(email, password, fullName);
        if (error) {
          console.error('Registration error:', error);
          
          // Check if it's a network-related error
          if (error.message === 'Failed to fetch') {
            setNetworkError(true);
            toast.error('Network connection error', { 
              description: 'Unable to connect to the authentication service. Please check your internet connection and try again.'
            });
          } else {
            toast.error('Sign up failed', { description: error.message || 'Please check your information and try again' });
          }
          
          setIsSubmitting(false);
          return;
        }
        toast.success('Account created successfully', { 
          description: 'Please check your email for verification instructions.' 
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Authentication error', error);
      toast.error('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-luxury-purple" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-transition">
        <div className="luxury-container py-12 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-luxury-purple">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          
          {networkError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex items-center">
                <WifiOff className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-red-800 font-medium">Connection Error</h3>
              </div>
              <p className="text-red-700 mt-1 text-sm">
                Unable to connect to the authentication service. This could be due to:
              </p>
              <ul className="list-disc ml-5 mt-1 text-sm text-red-700">
                <li>Internet connection issues</li>
                <li>Firewall or network restrictions</li>
                <li>Temporary service outage</li>
              </ul>
              <p className="text-red-700 mt-2 text-sm">
                Please check your connection and try again.
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  disabled={isSubmitting}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={isSubmitting}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={togglePasswordVisibility}
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-luxury-purple hover:bg-luxury-purple/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-luxury-purple hover:underline"
                disabled={isSubmitting}
              >
                {isLogin 
                  ? 'Need an account? Sign up' 
                  : 'Already have an account? Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
