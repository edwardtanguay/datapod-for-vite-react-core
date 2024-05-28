import dayjs from "dayjs";

export const getCurrentAmericanDate = (isoDate: string = ''): string => {
	return dayjs(isoDate).format("MMMM D, YYYY");
};
