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
				<li>SEE VIDEO: <a href="https://www.youtube.com/watch?v=AeQ3f4zmSMs" target="_blank" className="underline">Zod Tutorial - All 10 places for Zod in your React / Next.js app</a></li>
			</ul>
			<h2 className="text-2xl mt-4">Exterior data sources in <strong>Frontend</strong></h2>
			<ZodShowcaseDataInputWrapper title="1. Data from the backend">
				<ZodShowcaseDataInputFrontendBackend />
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="2. Data from third-party APIs">
				<ZodShowcaseDataInputFrontendApis />
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="3. Data collected from forms">
				<section>
					<p className="intro">Since users can type in any data nto frontend forms, this data needs to be validated and cleansed before it is processed and/or sent to the backend.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="4. Data from localStorage">
				<section>
					<p className="intro">Even though you control the data you save into localStore, it may well be the case that a user last used the site when it was in an older version which saved an object to localStorage with a different shape, so localStorage needs to be validate just as any other external data source.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="5. Data from URL parameters">
				<section>
					<p className="intro">Saving state in the URL provides a very good user experience since URLs can be sent which reproduce the state on the page which a user had when they copied the URL. But since the URL can be changed by the user, this data of course needs to be validated and cleansed.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
			<h2 className="text-2xl mt-4">Exterior data sources in <strong>Backend</strong></h2>
			<ZodShowcaseDataInputWrapper title="1. Data from the frontend">
				<section>
					<p className="intro">Even though you control data coming from the frontend, e.g. from forms or any other source, you need to validate and cleanse it since it may be from an older version, corrupted, or malformed because of a mistake made by yourself or another developer.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="2. Data from third-party APIs">
				<section>
					<p className="intro">Any data from third-party APIs of course needs to be validated and cleansed since it is not under your control.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="3. Data from the file system">
				<section>
					<p className="intro">The file system is an external data source that can be changed by many other sources, may become corrupted, and hence needs to be validated and cleansed before being processed by your backend.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="4. Environment variables">
				<section>
					<p className="intro">Environment variables are particularly vulnerable to being invalid and hence need to be validated and cleansed since developers who clone your site need to create the .env file themselves and will often forget or enter data into the .env file incorrectly.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="5. Data from a database">
				<section>
					<p className="intro">If you use an ORM such as Mongoose, Prisma or Drizzle which has its own validation, you could make an argument that you don't need to validate with Zod, although there are ways to combine e.g. Prisma and Zod to have one source of truth with e.g. <a href="https://www.npmjs.com/package/zod-prisma-types/v/1.5.3" target="_blank" className="underline">zod-prisma-types</a>. But particularly if you are getting data from your databaes with raw SQL, validation and cleansing is essential.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
			<ZodShowcaseDataInputWrapper title="6. Data from web hooks and web sockets">
				<section>
					<p className="intro">If you are receiving data via webhooks from e.g. third-party services such as Stripe, or from other microservices/services via socket.io etc., you of course need to validate and cleanse this data so you are sure that it is the shape you expect.</p>
				</section>
			</ZodShowcaseDataInputWrapper>
		</section>
	);
};
