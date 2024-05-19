import ReactDOM from "react-dom/client";
import {
	RouterProvider,
} from "react-router-dom";
import "./index.scss";
import { AppProvider } from "./AppContext.tsx";
import { router } from './Router.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);
