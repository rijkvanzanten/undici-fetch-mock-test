import { test, expect } from "vitest";
import { MockAgent, setGlobalDispatcher } from "undici";

import { getSchedule } from "./index.js";

const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
setGlobalDispatcher(mockAgent);

const githubMock = mockAgent.get("https://raw.githubusercontent.com");

test("Gets schedule from GitHub, returns as JSON", async () => {
	const testSchedule = { test: "schedule" };

	githubMock
		.intercept({
			method: "GET",
			path: "/nodejs/Release/master/schedule.json",
		})
		.reply(200, testSchedule);

	const schedule = await getSchedule();
	expect(schedule).toStrictEqual(testSchedule);
});
