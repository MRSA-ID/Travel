import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/auth/login";
import Dashboard from "@/pages/dashboard";
import Register from "@/pages/auth/register";
import PublicOnlyRoute from "@/components/PublicOnlyRoute";
import PrivateOnlyRoute from "@/components/PrivateOnlyRoute";
import Logout from "@/pages/auth/Logout";
import NotFound from "@/pages/not-found";
import DashboardLayout from "@/layout/DashboardLayout";
import Articles from "@/pages/dashboard/articles";
import CategoryPage from "@/pages/dashboard/category";
import CommentsPage from "@/pages/dashboard/comments";
import ProfilePage from "@/pages/dashboard/profile";
import Landing from "@/pages/landing";

export const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <PublicOnlyRoute>
        <Register />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/auth/logout",
    element: (
      <PrivateOnlyRoute>
        <Logout />
      </PrivateOnlyRoute>
    ),
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateOnlyRoute>
        <DashboardLayout />
      </PrivateOnlyRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/article",
        element: <Articles />,
      },
      {
        path: "/dashboard/comments",
        element: <CommentsPage />,
      },
      {
        path: "/dashboard/category",
        element: <CategoryPage />,
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      // {
      // 	path: "*",
      // 	element: <NotFound />,
      // },
    ],
  },
]);
