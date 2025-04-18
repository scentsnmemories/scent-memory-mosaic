
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../components/ui/sonner';
import Layout from '../components/layout/Layout';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signIn, signUp } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error('Login failed', { description: error.message });
          return;
        }
        toast.success('Logged in successfully');
        navigate('/');
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast.error('Sign up failed', { description: error.message });
          return;
        }
        toast.success('Account created successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Authentication error', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <Layout>
      <div className="page-transition">
        <div className="luxury-container py-12 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-luxury-purple">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          
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
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            <Button type="submit" className="w-full bg-luxury-purple hover:bg-luxury-purple/90">
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-luxury-purple hover:underline"
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
