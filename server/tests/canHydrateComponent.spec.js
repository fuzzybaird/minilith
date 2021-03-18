import hydrateAndRespond from "../modules/hydrateAndrRespond.js";
import comp1 from "../modules/comp1.js";
describe("Can hydrate a component", () => {
	it("should take a request payload and return a response json", () => {
		let res = hydrateAndRespond(
			{
				action: { method: "init", params: [] },
				context: {
					name: "comp1",
				},
			},
			comp1
		);
		console.log(res);
	});
});
