import { ZodShowcaseDataInputWrapper } from "../components/ZodShowcaseDataInputWrapper";

export const PageZodShowcase = () => {

	return (
		<>
			<h2 className="text-2xl mb-2">Where Zod is needed in a fullstack application</h2>
			<ul className="list-disc ml-6">
				<li>there are numerous input sources into a <strong>fullstack application</strong> which require <strong>data validation</strong> and <strong>data cleansing</strong> in order to ensure that your app is using <strong>safely-formed data</strong></li>
				<li>below are examples of how <a href="https://zod.dev" target="_blank" className="underline font-bold">Zod</a> can be used to protect each of these input sources</li>
			</ul>
			<h2 className="text-2xl mt-4">Data sources in <strong>Frontend</strong></h2>
			<ZodShowcaseDataInputWrapper title="Backend">
				<div>okok</div>
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="Third-Party APIs">
				<div>okok</div>
			</ZodShowcaseDataInputWrapper>
			<h2 className="text-2xl mt-4">Data sources in <strong>Backend</strong></h2>
		</>
	);
};
