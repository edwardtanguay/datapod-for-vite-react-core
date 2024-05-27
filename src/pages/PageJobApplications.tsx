import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageJobApplications = () => {
	const { fullJobApplications } = useContext(AppContext);

	return (
		<>
			<p className="mb-3">
				There are {fullJobApplications.length} applications:
			</p>
			{fullJobApplications.map((fullJobApplication) => {
				return (
					<header className="bg-slate-500 p-4 rounded w-1/2">
						<p className="text-xl">{fullJobApplication.jobTitle}</p>
						<p className="italic mb-2">
							{fullJobApplication.company}
						</p>
						<div className="scrollable-container rounded w-full h-[40rem] bg-gray-300">
							<div className="scrollable-content">
							This is a <b>test</b> and <i>this</i> is italic, and now <strong>strong</strong>.
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum ullam officia inventore sint ab esse deserunt natus dignissimos error neque ea officiis maiores voluptas, molestiae eius omnis quam commodi.</p>
							</div>
						</div>
					</header>
				);
			})}
		</>
	);
};
