import React from 'react';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';

export interface Route {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

const routes: Route[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/restaurants',
    component: RestaurantsPage,
    exact: true,
  },
  {
    path: '/restaurant/:id',
    component: RestaurantDetailPage,
  },
  {
    path: '/cart',
    component: CartPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/orders',
    component: OrdersPage,
  },
];

export default routes;