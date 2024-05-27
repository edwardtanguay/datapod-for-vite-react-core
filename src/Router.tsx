import App from "./App.tsx";
import {
	createBrowserRouter,
	Navigate,
} from 'react-router-dom';
import { PageWelcome } from "./pages/PageWelcome.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { PageNotation } from "./pages/PageNotation.tsx";
import { PageImport } from "./pages/PageImport.tsx";
import { PageInfo } from "./pages/PageInfo.tsx";
import { PageZodShowcase } from "./pages/PageZodShowcase.tsx";
import { PageApplications, PageJobApplications } from "./pages/PageJobApplications.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "/welcome",
				element: <PageWelcome />,
			},
			{
				path: "notation",
				element: <PageNotation />,
			},
			{
				path: "import",
				element: <PageImport />,
			},
			{
				path: "zod-showcase",
				element: <PageZodShowcase />,
			},
			{
				path: "info",
				element: <PageInfo />,
			},
			{
				path: "job-applications",
				element: <PageJobApplications/>
			},
			{
				path: "/",
				element: <Navigate to="/welcome" replace />,
			},
		],
	},
]);
