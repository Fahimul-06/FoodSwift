/*
  # Orders System Tables

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `restaurant_id` (text)
      - `restaurant_name` (text)
      - `status` (enum)
      - `total` (decimal)
      - `delivery_address` (text)
      - `created_at` (timestamp)
      - `estimated_delivery_time` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders)
      - `menu_item_id` (text)
      - `name` (text)
      - `price` (decimal)
      - `quantity` (integer)
      - `special_instructions` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to view their own orders
*/

-- Create order status enum
CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
  'cancelled'
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) NOT NULL,
  restaurant_id text NOT NULL,
  restaurant_name text NOT NULL,
  status order_status DEFAULT 'pending',
  total decimal(10,2) NOT NULL,
  delivery_address text,
  created_at timestamptz DEFAULT now(),
  estimated_delivery_time timestamptz,
  
  CONSTRAINT positive_total CHECK (total >= 0)
);

-- Create order items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id text NOT NULL,
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  quantity integer NOT NULL,
  special_instructions text,
  
  CONSTRAINT positive_price CHECK (price >= 0),
  CONSTRAINT positive_quantity CHECK (quantity > 0)
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policies for orders
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON public.orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for order items
CREATE POLICY "Users can view their order items"
  ON public.order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their order items"
  ON public.order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );