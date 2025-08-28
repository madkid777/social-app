import { Link } from '@heroui/react';
import './App.css'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout';
import Home from './page/Home/Home';
import About from './page/About/About';
import Register from './page/Register/Register';
import Login from './page/Login/Login';
import NotFound from './page/NotFound/NotFound';
import Posts from './page/posts/posts';
import ProtectedRoutes from './component/protectedRoutes/protectedRoutes';
import { CounterContextProvider } from './Auth/CounterContext';
import { AuthProvider } from './Auth/AuthContext';
import Profile from './page/Profile/Profile';
import PostDetails from './page/PostDetails/PostDetails';
import { Toaster } from 'react-hot-toast';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react';

const queryClient = new QueryClient()
function App() {
  const [isDark, setIsDark] = useState(false)
  function handleDark() {
    setIsDark(!isDark)
  }
  const routes = createBrowserRouter([{
    path: '', element: <MainLayout handleDark={handleDark} />, children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <ProtectedRoutes ><About /></ProtectedRoutes> },
      { path: 'Register', element: <Register /> },
      { path: 'Profile', element: <ProtectedRoutes ><Profile /></ProtectedRoutes> },
      { path: 'details/:id', element: <ProtectedRoutes ><PostDetails /></ProtectedRoutes> },
      {
        path: 'Posts', element: <ProtectedRoutes >
          <Posts />
        </ProtectedRoutes>
      },
      { path: 'login', element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  }])
  return (
    <div className={`${isDark ? 'dark' : ""}`}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CounterContextProvider>
            <Toaster />
            <RouterProvider router={routes}>
            </RouterProvider>
          </CounterContextProvider>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  )

}

export default App
