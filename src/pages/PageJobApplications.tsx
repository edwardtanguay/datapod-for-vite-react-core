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
<p>Berlin, 10. Februar 2018</p>
<p>&nbsp;</p> 
<p>&nbsp;</p> 
<p>Edward Tanguay</p>
<p>Lacknerstr. 8</p>
<p>12167 Berlin</p>
<p>Tel: 030 / 795 55 99, Mobil: 0179 / 66 486 04</p>
<p>E-Mail: edward@tanguay.info</p>
<p>&nbsp;</p> 
<p>sense electra GmbH</p>
<p>z.H. Herrn Elias</p>
<p>Friedrichstraße 95</p>
<p>10117 Berlin</p>
<p>&nbsp;</p> 
<p><b>Bewerbung um die Stelle als Programmierer</b></p>
<p><b>Ihre Stellenanzeige auf der www.stepstone.de Website vom 10.02.2018</b></p>
<p>&nbsp;</p> 
<p>Sehr geehrter Herr Elias,</p>
<p>&nbsp;</p> 
<p>Sie suchen für Ihr Unternehmen einen Programmierer. Um diese Stelle bewerbe ich mich.</p>
<p>&nbsp;</p> 
<p>Meine Fähigkeiten entsprechen Ihrem Anforderungsprofil perfekt:</p>
<p>&nbsp;</p> 
<p><b>Abgeschlossenes Fach-/Hochschulstudium in der Fachrichtung Informatik oder eine entsprechende Ausbildung im IT-Bereich:</b> Durch meine über 15 Jahre lange Tätigkeit in der Software-Entwicklung bei mehreren Firmen und in mehreren Projekten kann ich entsprechende Fähigkeiten beweisen.</p>
<p>&nbsp;</p> 
<p><b>Abgeschlossenes Fach-/Hochschulstudium in der Fachrichtung Informatik oder eine entsprechende Ausbildung im IT-Bereich:</b> Durch meine über 15 Jahre lange Tätigkeit in der Software-Entwicklung bei mehreren Firmen und in mehreren Projekten kann ich entsprechende Fähigkeiten beweisen.</p>
<p>&nbsp;</p> 
<p><b>Abgeschlossenes Fach-/Hochschulstudium in der Fachrichtung Informatik oder eine entsprechende Ausbildung im IT-Bereich:</b> Durch meine über 15 Jahre lange Tätigkeit in der Software-Entwicklung bei mehreren Firmen und in mehreren Projekten kann ich entsprechende Fähigkeiten beweisen.</p>
<p>&nbsp;</p> 
<p>Meine ausführlichen Bewerbungsunterlagen finden Sie unter:</p>
<p>&nbsp;</p> 
<ul>
	<li>http://www.tanguay.info/cv (auch anbei als PDF)</li>
</ul>
    http://www.tanguay.info/cv/attachments (6 MB Arbeitszeugnisse als zip-Datei)

Meine Gehaltsvorstellung liegt zwischen 3.800,- und 4.200,- Euro brutto.
Mein frühester Eintrittstermin ist der 01. März 2018.
 
Mit freundlichen Grüßen
 
Edward Tanguay

							</div>
						</div>
					</header>
				);
			})}
		</>
	);
};
