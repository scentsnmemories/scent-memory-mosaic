
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "../components/layout/Layout";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/sonner";

const SHIPPING_RATES = {
  "United States": 10,
  "Canada": 15,
  "UK": 20,
  "Europe": 25,
  "Asia": 30,
  "Australia": 35,
  "Other": 40
};

type ShippingLocation = keyof typeof SHIPPING_RATES;

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  country: ShippingLocation;
  city: string;
  address: string;
  postalCode: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    country: "United States",
    city: "",
    address: "",
    postalCode: ""
  });

  const subtotal = getCartTotal();
  const shippingCost = SHIPPING_RATES[formData.country];
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value as ShippingLocation }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically connect to an API to process the order
    // For now, we'll just show a success message
    toast.success("Order placed successfully! We will email you with details.", {
      description: "Thank you for shopping with us!",
      duration: 5000
    });
    
    // Clear cart and redirect to home
    clearCart();
    navigate("/");
  };

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="luxury-container py-12 text-center">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="mb-8">You need to add items to your cart before checkout.</p>
          <Link to="/catalog">
            <Button className="bg-luxury-purple hover:bg-luxury-purple/90">
              Browse Our Collection
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-transition">
        <div className="luxury-container py-12">
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center text-luxury-purple hover:text-luxury-accent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
          </div>

          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-purple mb-8">
            Checkout
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Shipping Form */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-playfair text-xl font-bold mb-6">Shipping Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={formData.country} 
                        onValueChange={handleCountryChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(SHIPPING_RATES).map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Postal Code */}
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input 
                        id="postalCode" 
                        name="postalCode" 
                        value={formData.postalCode} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <Button 
                      type="submit"
                      className="w-full bg-luxury-purple hover:bg-luxury-purple/90"
                    >
                      Complete Order
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-playfair text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping ({formData.country})</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-luxury-purple hover:bg-luxury-purple/90 mb-4"
                >
                  Complete Order
                </Button>
                
                <div className="text-sm text-center text-luxury-muted">
                  <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
