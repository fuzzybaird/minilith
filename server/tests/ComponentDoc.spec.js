import ComponentDoc from "../components/ComponentDoc.js";
describe("can generate docs", () => {
	it("should be able to get component methods and params", async () => {
		let comp = new ComponentDoc();
		comp.hydrate({ component_name: "DoctorSearch" });
		await comp.init();
		let response = comp.renderJson();
		console.log(response);
	});
});
