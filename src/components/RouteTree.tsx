import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/components/Layout";
import AuthLayout from "../routes/auth/components/AuthLayout";
import ErrorPage from "./ErrorPage";
import RegisterPage from "../routes/auth/register.page";
import LoginPage from "../routes/auth/login.page";
import ProtectedRoute from "./ProtectedRoute";
import ContentLayout from "../routes/content/components/ContentLayout";
import DashboardPage from "../routes/content/dashboard.page";

const path = {
	register: '/register',
	login: '/login',
	work: '/work',
	createWork: '/work/create',
}

const router = createBrowserRouter([
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
						element: <LoginPage />
					},
				]
			},
			{
				element:
					<ProtectedRoute>
						<ContentLayout />
					</ProtectedRoute>,
				children: [
					{
						path: "/",
						element: <DashboardPage />
					},
				],
			}
		]
	}
], {
	basename: '/'
});

export default router;