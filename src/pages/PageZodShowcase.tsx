import { ZodShowcaseDataInputFrontendApis } from "../components/ZodShowcaseDataInputFrontendApis";
import { ZodShowcaseDataInputFrontendBackend } from "../components/ZodShowcaseDataInputFrontendBackend";
import { ZodShowcaseDataInputWrapper } from "../components/ZodShowcaseDataInputWrapper";

export const PageZodShowcase = () => {

	return (
		<section className="pageZodShowcase">
			<h2 className="text-2xl mb-2">Zod is a tool to ensure that your fullstack application is using correctly shaped data</h2>
			<ul className="list-disc ml-6">
				<li>there are numerous exterior data sources from which a <strong>fullstack application</strong> gets its information and which require <strong>data validation</strong> and <strong>data cleansing</strong> in order to ensure that the app is using <strong>safely-formed data</strong></li>
				<li>below are examples of how <a href="https://zod.dev" target="_blank" className="underline font-bold">Zod</a> can be used to protect each of these data sources</li>
			</ul>
			<h2 className="text-2xl mt-4">Exterior data sources in <strong>Frontend</strong></h2>
			<ZodShowcaseDataInputWrapper title="Data from the backend">
				<ZodShowcaseDataInputFrontendBackend />
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="Third-Party APIs">
				<ZodShowcaseDataInputFrontendApis />
			</ZodShowcaseDataInputWrapper>
			<h2 className="text-2xl mt-4">Exterior data sources in <strong>Backend</strong></h2>
		</section>
	);
};
