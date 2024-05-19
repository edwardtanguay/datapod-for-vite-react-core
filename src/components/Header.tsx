import { Nav } from "./Nav";

export const Header = () => {
	return (
		<>
			<h1 className="text-3xl text-slate-800">Edward's Language Learning Site</h1>
			<h2 className="text-sm mb-3 -mt-1 italic text-slate-800">This site genericizes to <span className="font-semibold text-orange-900">Datapod-for-Vite-React</span></h2>
			<Nav/>
		</>
	);
};
