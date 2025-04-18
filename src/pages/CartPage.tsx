
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Trash, Plus, Minus } from "lucide-react";
import Layout from "../components/layout/Layout";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal } = useApp();

  const handleQuantityChange = (perfumeId: string, newQuantity: number) => {
    updateCartItemQuantity(perfumeId, newQuantity);
  };

  return (
    <Layout>
      <div className="page-transition">
        <div className="luxury-container py-12">
          <div className="mb-8">
            <Link to="/catalog" className="inline-flex items-center text-luxury-purple hover:text-luxury-accent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-purple mb-8">
            Your Cart
          </h1>

          {cart.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="hidden lg:grid lg:grid-cols-6 text-sm text-luxury-muted mb-4">
                    <div className="col-span-3">Product</div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Total</div>
                  </div>
                  
                  <Separator className="hidden lg:block mb-4" />
                  
                  {cart.map((item) => (
                    <div key={item.perfume.id} className="mb-6">
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                        {/* Product */}
                        <div className="col-span-1 lg:col-span-3">
                          <div className="flex items-center">
                            <div className="w-20 h-20 bg-luxury-muted/10 rounded-md overflow-hidden mr-4">
                              <img
                                src={item.perfume.imageUrl}
                                alt={item.perfume.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">
                                <Link
                                  to={`/perfume/${item.perfume.id}`}
                                  className="hover:text-luxury-purple"
                                >
                                  {item.perfume.name}
                                </Link>
                              </h3>
                              <div className="text-sm text-luxury-muted">
                                {item.perfume.brand}
                              </div>
                              <div className="text-sm mt-1">{item.perfume.size}</div>
                              <button
                                onClick={() => removeFromCart(item.perfume.id)}
                                className="lg:hidden text-sm text-luxury-purple hover:text-luxury-accent flex items-center mt-2"
                              >
                                <Trash className="w-3 h-3 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="lg:text-center">
                          <div className="lg:hidden text-sm text-luxury-muted mb-1">Price:</div>
                          ${item.perfume.price.toFixed(2)}
                        </div>
                        
                        {/* Quantity */}
                        <div className="lg:text-center">
                          <div className="lg:hidden text-sm text-luxury-muted mb-1">Quantity:</div>
                          <div className="flex items-center border border-luxury-muted/50 rounded-md w-32">
                            <button
                              className="p-2 hover:bg-luxury-muted/10"
                              onClick={() =>
                                handleQuantityChange(item.perfume.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-full text-center border-0 focus:ring-0 bg-transparent"
                            />
                            <button
                              className="p-2 hover:bg-luxury-muted/10"
                              onClick={() =>
                                handleQuantityChange(item.perfume.id, item.quantity + 1)
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total & Remove */}
                        <div className="flex items-center justify-between lg:justify-end">
                          <div>
                            <div className="lg:hidden text-sm text-luxury-muted mb-1">Total:</div>
                            <span className="font-medium">
                              ${(item.perfume.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.perfume.id)}
                            className="hidden lg:flex items-center text-luxury-purple hover:text-luxury-accent ml-6"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="font-playfair text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-luxury-purple hover:bg-luxury-purple/90 mb-4">
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-sm text-center text-luxury-muted">
                    <p>Taxes and shipping calculated at checkout</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-luxury-muted/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-luxury-purple" />
                </div>
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-luxury-muted mb-6">
                It looks like you haven't added any perfumes to your cart yet.
              </p>
              <Link to="/catalog">
                <Button className="bg-luxury-purple hover:bg-luxury-purple/90">
                  Browse Our Collection
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
