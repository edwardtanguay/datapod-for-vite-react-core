import React, { useState } from "react";
import { OverviewJobApplication } from "../../share/interfaces";

interface IProps {
	currentJobApplication: OverviewJobApplication;
}

export const TodoJobApplication = ({ currentJobApplication }: IProps) => {
	const [showingCreateText, setShowingCreateText] = useState(false);

	const handleToggleCreateText = () => {
		setShowingCreateText(!showingCreateText);
	};

	const somethingIsOpen = () => {
		return showingCreateText;
	};

	return (
		<React.Fragment>
			<header className="bg-slate-500 px-4 pt-4 rounded-t-lg w-[60rem] flex justify-between">
				<section>
					<p className="text-xl">
						{currentJobApplication.job.title} TODO
					</p>
					<p className="italic">
						<span>{currentJobApplication.job.company}</span>{" "}
						<span className="text-gray-700 font-mono text-xs not-italic">
							({currentJobApplication.job.id})
						</span>
					</p>
				</section>
				<section className="flex flex-col justify-between w-[20rem]">
					<div className="flex justify-end">
						{currentJobApplication.fullJobApplication && (
							<a
								href={
									currentJobApplication.fullJobApplication
										.jobAnnouncementUrl
								}
								className="underline"
								target="_blank"
							>
								online job announcement
							</a>
						)}
					</div>
					<div className="flex justify-end pt-1">
						<button
							className="generic2 mr-1"
							onClick={handleToggleCreateText}
						>
							Create Application
						</button>
					</div>
				</section>
			</header>
			{somethingIsOpen() ? (
				<div className="outlineInJobApplication">
					{showingCreateText && (
						<section className="bg-slate-500 w-[60rem] rounded-b-lg p-4 mb-3 font-mono">
							<div className="scrollable-container h-[20rem] bg-gray-300 w-full">
								<div className="scrollable-content">
									<div>
										{
											currentJobApplication.applicationCreateText
										}
									</div>
								</div>
							</div>
						</section>
					)}
				</div>
			) : (
				<section className="bg-slate-500 w-[60rem] rounded-b-lg p-2 mb-3"></section>
			)}
		</React.Fragment>
	);
};
