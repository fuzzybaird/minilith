import express from "express";
import TestPage from "./modules/TestPage.js";
import cors from "cors";
import hydrateAndRespond from "./modules/hydrateAndRespond.js";
let app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
app.set("view engine", "hbs");
app.get("/", async (req, res) => {
	const page = new TestPage();

	res.send(page.template);
});
app.post("/minilith", async (req, res) => {
	try {
		// console.log(req.body);
		const compClass = await import(`./modules/${req.body.name}.js`);
		res.send(hydrateAndRespond(req.body, compClass.default));
	} catch (error) {
		console.error(error);
	}
});
app.use(express.static("../client"));
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
