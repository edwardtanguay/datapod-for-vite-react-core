export const PageZodShowcase = () => {

	return (
		<>
			<h2 className="text-2xl mb-2">Where Zod is needed in a fullstack application</h2>
			<ul className="list-disc ml-6">
				<li>there are numerous input sources into a <strong>fullstack application</strong> which require <strong>data validation</strong> and <strong>data cleansing</strong> in order to ensure that your app is using <strong>safely-formed data</strong></li>
				<li>below are examples of how <a href="https://zod.dev" target="_blank" className="underline font-bold">Zod</a> can be used to protect each of these input sources</li>
			</ul>
			<h2 className="text-2xl mb-2 mt-2">Data sources in <strong>Frontend</strong></h2>
			<h3 className="text-[1.4rem] text-red-800">data from the <strong>backend</strong></h3>
			<h2 className="text-2xl mb-2">Backend</h2>
		</>
	);
};
