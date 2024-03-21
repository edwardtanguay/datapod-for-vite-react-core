import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageInfo = () => {
	const { appData } = useContext(AppContext);

	return (
		<>
			<p className="h-7"><span className="font-semibold">App ID-Code:</span> <code>{appData.appIdCode}</code></p>
			<p className="h-7"><span className="font-semibold">frontend port:</span> <code>{appData.frontendPort}</code></p>
			<p className="h-7"><span className="font-semibold">backend port:</span> <code>{appData.backendPort}</code></p>
		</>
	);
};
