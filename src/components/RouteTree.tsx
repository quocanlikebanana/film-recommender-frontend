import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/components/Layout";
import AuthLayout from "../routes/auth/components/AuthLayout";
import ErrorPage from "./ErrorPage";
import RegisterPage from "../routes/auth/register.page";
import LoginPage from "../routes/auth/login.page";
import ProtectedRoute from "./ProtectedRoute";
import ContentLayout from "../routes/content/components/ContentLayout";
import DashboardPage from "../routes/content/dashboard/dashboard.page";
import DetailPage from "../routes/content/detail/detail.page";
import SearchPage from "../routes/content/search/search.page";
import CastPage from "../routes/content/cast/cast.page";
import ProfilePage from "../routes/auth/profile.page";

const path = {
  register: "/register",
  login: "/login",
};

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: path.register,
              element: <RegisterPage />,
            },
            {
              path: path.login,
              element: <LoginPage />,
            },
          ],
        },
        {
          element: (
            <ProtectedRoute>
              <ContentLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "/profile",
              element: <ProfilePage />,
            },
          ],
        },
        {
          element: <ContentLayout />,
          children: [
            {
              path: "/",
              element: <DashboardPage />,
            },
            {
              path: "/movies/:movieId",
              element: <DetailPage />,
            },
            {
              path: "/movies/search",
              element: <SearchPage />,
            },
            {
              path: "/cast/:castId",
              element: <CastPage />,
            },
          ]
        },
      ],
    },
  ],
  {
    basename: "/",
  },
);

export default router;
