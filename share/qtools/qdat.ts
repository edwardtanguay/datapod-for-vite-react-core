import dayjs from "dayjs";

export const getAmericanDate = (isoDate: string = ""): string => {
	return dayjs(isoDate).format("MMMM D, YYYY");
};

export const getGermanDate = (isoDate: string = ""): string => {
	return dayjs(isoDate).format("DD.MM.YYYY");
};
