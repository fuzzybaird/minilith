import hydrateAndRespond from "../modules/hydrateAndRespond.js";
import DoctorSearch from "../components/DoctorSearch.js";
describe("Can hydrate a component", () => {
	it("should take a request payload and return a response json", () => {
		let res = hydrateAndRespond(
			{
				action: { method: "init", params: [] },
				context: {
					name: "DoctorSearch",
				},
			},
			DoctorSearch
		);
		// console.log(res);
	});
});
