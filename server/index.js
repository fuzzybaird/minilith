import express from "express";
import TestPage from "./modules/TestPage.js";
import cors from "cors";
import hydrateAndRespond from "./modules/hydrateAndRespond.js";
import root from "app-root-path";
let app = express();
app.use(express.json());
app.use(cors());
console.log(root.resolve("../client"));
const port = 3000;
app.set("view engine", "hbs");
app.get("/", async (req, res) => {
	const page = new TestPage();

	res.send(page.template);
});
app.post("/minilith", async (req, res) => {
	try {
		// console.log(req.body);
		const compClass = await import(`./components/${req.body.name}.js`);
		res.send(await hydrateAndRespond(req.body, compClass.default));
	} catch (error) {
		console.error(error);
	}
});
app.use(express.static(root.resolve("../client")));
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
