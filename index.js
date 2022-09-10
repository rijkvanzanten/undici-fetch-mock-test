import { fetch } from "undici";

export const getSchedule = async () => {
	const res = await fetch(
		"https://raw.githubusercontent.com/nodejs/Release/master/schedule.json"
	);

	return await res.json();
};
