import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageWelcome = () => {
	const { handleParseButton } = useContext(AppContext);

	return (
		<>
		<p>Welcome to Datapod core.</p>
		<button className="mt-4" onClick={handleParseButton}>Parse site data for edward-tanguay-eu site</button>
		</>
	);
};
