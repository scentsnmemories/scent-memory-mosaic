
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Perfume, CartItem } from "../types";
import { perfumes } from "../data/perfumes";

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
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

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
