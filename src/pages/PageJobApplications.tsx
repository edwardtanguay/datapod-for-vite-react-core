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
 
sense electra GmbH
z.H. Herrn Elias
Friedrichstraße 95
10117 Berlin
 
Bewerbung um die Stelle als Programmierer
Ihre Stellenanzeige auf der www.stepstone.de Website vom 10.02.2018
 
Sehr geehrter Herr Elias,
 
Sie suchen für Ihr Unternehmen einen Programmierer. Um diese Stelle bewerbe ich mich.
 
Meine Fähigkeiten entsprechen Ihrem Anforderungsprofil perfekt:
 
Abgeschlossenes Fach-/Hochschulstudium in der Fachrichtung Informatik oder eine entsprechende Ausbildung im IT-Bereich: Durch meine über 15 Jahre lange Tätigkeit in der Software-Entwicklung bei mehreren Firmen und in mehreren Projekten kann ich entsprechende Fähigkeiten beweisen.
 
C#-Anwendungs- und Datenbankentwicklung und gute Kenntnisse in .NET: Meine Fähigkeiten in der objektorientierten Software-Entwicklung mit C# kann ich unter Beweis stellen durch diesen von mir produzierten Video-Trainingskurs:

    8-hour C# 4.0 online Video-Trainingkurs (2010 Video2Brain, Englisch): http://tanguay.info/v2b

Von 2001 bis 2003 war ich tätig als Entwickler und Consultant bei Microsoft Deutschland GmbH. Da .NET zu dieser Zeit gerade auf den Markt kam, habe ich das Framework von diesem Zeitpunkt an erlernt. Ich konnte mein Wissen in verschiedenen .NET Projekten vertiefen, nicht nur bei Microsoft, sondern auch in verschiedenen Firmen inkl. Siemens und Tektronix.
 
MS SQL-Server: T-SQL; DB-Verwaltung mit SQL-Server Management-Studio: SQL Server habe ich bisher ausschließlich verwendet in allen .NET Projekten. Im Januar 2003 habe ich das 5-tägige Seminar "Developing Applications with SQL Server 2000" bei dem Weiterbildungsinstitut Developmentor in London erfolgreich abgeschlossen.
 
MS Access: Anwendungsentwicklung mit Access-VBA: In den 90iger Jahren habe ich in mehreren Projekten Microsoft Access als Lösung für eine datenbankbetriebene Website verwendet. Der Kunde konnte die Daten in einer MS Access Forms Application Oberfläche verwalten. Eine ASP-3.0 Website hat auf die Daten von der .mdb Datei via OLEDB zugegriffen. In 2007 habe ich ein Projekt bei Privileg Massivhaus AG erfolgreich abgeschlossen, welches Daten von verschiedenen Excel-Dateien über ODBC in eine MySQL-Datenbank gespeichert hat. Danach wurden mittels VBA neue Excel-Dateien mit einer neuen Struktur-Version erstellt und diese mit den Daten der Excel-Dateien befüllt.
 
PHP, JavaScript, MySQL, CSS und HTML: Seit 2001 arbeite ich in Vollzeit als Programmierer im Bereich Internet. Webapplikationen mittels HTML, JavaScript, JQuery, Angular, Vue.js, CSS und PHP habe ich seit 2005 in mehreren Projekten bei unterschiedlichen Firmen realisiert. Während meiner langjährigen Tätigkeit als Software-Entwickler habe ich Webanwendungen mit verschiedenen Datenbanken wie MySQL, SQL Server und Oracle fertiggestellt. Da ich in den letzten 10 Jahren fast ausschließlich mit dem LAMP-Stack gearbeitet habe, sind meine MySQL-Kenntnisse sehr ausgeprägt.
 
Meine ausführlichen Bewerbungsunterlagen finden Sie unter:

    http://www.tanguay.info/cv (auch anbei als PDF)
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
