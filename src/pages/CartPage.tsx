import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';

const CartPage: React.FC = () => {
  const { items, restaurantName, restaurantId, clearCart, getCartTotal } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const deliveryFee = 2.99;
  const serviceFee = 1.99;
  const total = subtotal + deliveryFee + serviceFee;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=cart');
      return;
    }

    if (!deliveryAddress && deliveryOption === 'delivery') {
      alert('Please enter a delivery address');
      return;
    }

    setIsProcessing(true);

    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          restaurant_id: restaurantId,
          restaurant_name: restaurantName,
          total: total,
          delivery_address: deliveryOption === 'delivery' ? deliveryAddress : null,
          estimated_delivery_time: new Date(Date.now() + 45 * 60000), // 45 minutes from now
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        menu_item_id: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        special_instructions: item.specialInstructions,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/restaurants')}
            fullWidth
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">
                {restaurantName ? `Order from ${restaurantName}` : 'Your Order'}
              </h2>
            </div>
            <div className="p-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">Delivery Options</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="delivery"
                    checked={deliveryOption === 'delivery'}
                    onChange={() => setDeliveryOption('delivery')}
                    className="form-radio h-4 w-4 text-pink-600"
                  />
                  <span className="ml-2">Delivery</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="pickup"
                    checked={deliveryOption === 'pickup'}
                    onChange={() => setDeliveryOption('pickup')}
                    className="form-radio h-4 w-4 text-pink-600"
                  />
                  <span className="ml-2">Pickup</span>
                </label>
              </div>

              {deliveryOption === 'delivery' && (
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter your delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">Payment Method</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="form-radio h-4 w-4 text-pink-600"
                  />
                  <span className="ml-2">Credit Card</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="form-radio h-4 w-4 text-pink-600"
                  />
                  <span className="ml-2">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm sticky top-24">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">Order Summary</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="text-gray-900">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-md text-sm text-yellow-800 flex items-start">
                  <AlertTriangle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    You'll need to log in before checkout.
                    <button
                      onClick={() => navigate('/login?redirect=cart')}
                      className="text-pink-600 font-medium ml-1 hover:text-pink-700 focus:outline-none"
                    >
                      Log in
                    </button>
                  </p>
                </div>
              )}

              <Button
                variant="primary"
                fullWidth
                onClick={handleCheckout}
                disabled={!isAuthenticated || items.length === 0 || isProcessing}
                isLoading={isProcessing}
              >
                Place Order
              </Button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;