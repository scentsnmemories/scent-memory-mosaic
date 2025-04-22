import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, Perfume, CartItem } from "../types";
import { perfumes } from "../data/perfumes";
import { supabase } from "@/integrations/supabase/client";

interface AppContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (perfume: Perfume, quantity?: number) => void;
  removeFromCart: (perfumeId: string) => void;
  updateCartItemQuantity: (perfumeId: string, quantity: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (perfumeId: string) => void;
  getFavorites: () => Perfume[];
  isInFavorites: (perfumeId: string) => boolean;
  isInCart: (perfumeId: string) => boolean;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  isAuthenticated: () => boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  loading: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || '',
          });
        } else {
          setUser(null);
        }
      }
    );

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session check:", session?.user?.id);
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || '',
          });
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addToCart = (perfume: Perfume, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.perfume.id === perfume.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.perfume.id === perfume.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevCart, { perfume, quantity }];
      }
    });
  };

  const removeFromCart = (perfumeId: string) => {
    setCart(prevCart => prevCart.filter(item => item.perfume.id !== perfumeId));
  };

  const updateCartItemQuantity = (perfumeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(perfumeId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.perfume.id === perfumeId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (perfumeId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(perfumeId)) {
        return prevFavorites.filter(id => id !== perfumeId);
      } else {
        return [...prevFavorites, perfumeId];
      }
    });
  };

  const getFavorites = () => {
    return perfumes.filter(perfume => favorites.includes(perfume.id));
  };

  const isInFavorites = (perfumeId: string) => {
    return favorites.includes(perfumeId);
  };

  const isInCart = (perfumeId: string) => {
    return cart.some(item => item.perfume.id === perfumeId);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.perfume.price * item.quantity), 0);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      console.log("Signing up with:", { email, fullName });
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      console.log("Sign up response:", { data, error });
      return { error };
    } catch (error) {
      console.error('Error during sign up:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with:", { email });
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log("Sign in response:", { user: data?.user, error });
      return { error };
    } catch (error) {
      console.error('Error during sign in:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
      }
      return { error };
    } catch (error) {
      console.error('Error during sign out:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        getFavorites,
        isInFavorites,
        isInCart,
        getCartItemCount,
        getCartTotal,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
