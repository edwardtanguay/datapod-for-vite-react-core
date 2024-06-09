import dayjs from "dayjs";

export const getAmericanDate = (isoDate: string = ""): string => {
	return dayjs(isoDate).format("MMMM D, YYYY");
};

export const getGermanDate = (isoDate: string = ""): string => {
	return dayjs(isoDate).format("DD.MM.YYYY");
};

export const getCurrentIsoDateTime = (): string => {
	return dayjs().format("YYYY-MM-DD HH:mm:ss");
};

// 2024-08-01 to "01. August 2024""
export const formatAsGermanDateWithFullYear = (isoDate: string): string => {
	const date = new Date(isoDate);

	// Define an array of German month names
	const germanMonths = [
		"Januar",
		"Februar",
		"März",
		"April",
		"Mai",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"Dezember",
	];

	const day = date.getDate().toString().padStart(2, "0");
	const month = germanMonths[date.getMonth()];
	const year = date.getFullYear();

	return `${day}. ${month} ${year}`;
};

// 2024-08-01 to "August 1, 2024""
export const formatAsAmericanDateWithFullYear = (isoDate: string): string => {
	const date = new Date(isoDate);

	// Define an array of month names
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	return `${month} ${day}, ${year}`;
};

export const fillDateArray = (startDate: string, endDate: string): string[] => {
	const dateArray: string[] = [];
	const start = dayjs(startDate);
	const end = dayjs(endDate);

	let currentDate = start;
	while (currentDate.isBefore(end) || currentDate.isSame(end, "day")) {
		dateArray.push(currentDate.format("YYYY-MM-DD"));
		currentDate = currentDate.add(1, "day");
	}

	return dateArray;
};

export const getTodayAsIso = (): string => {
	return dayjs().format("YYYY-MM-DD");
};
