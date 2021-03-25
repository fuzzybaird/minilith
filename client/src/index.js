import MiniComp from "./MiniComp.js";
import { isTesting } from "./utils.js";
import fetcher from "./Fetcher.js";
const Minilith = {
	miniliths: {},
	start() {
		let allTemplates = document.getElementsByTagName("template");

		for (let index = 0; index < allTemplates.length; index++) {
			if (allTemplates[index].getAttribute("mi-name")) {
				this.miniliths[
					allTemplates[index].getAttribute("mi-name")
				] = new MiniComp(allTemplates[index]);
			}
		}

		return Promise.all(
			Object.keys(this.miniliths).map((mini) => {
				return fetcher.postData(
					this.miniliths[mini].getTarget(),
					this.miniliths[mini].generateServerRequest("init")
				);
			})
		)
			.then((result) => {
				if (result) {
					result.map((res) => {
						console.log(`mounting ${res.name}`);
						this.miniliths[res.name].renderHistory.push(res.render);
						this.miniliths[res.name].renderTick();
					});
					return result;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	},
};

if (!isTesting()) {
	// @ts-ignore
	window.Minilith = Minilith;
	// @ts-ignore
	if (window.deferLoadingMinilith) {
		// @ts-ignore
		window.deferLoadingMinilith(function () {
			// @ts-ignore
			window.Minilith.start();
		});
	} else {
		// @ts-ignore
		window.Minilith.start();
	}
}

export default Minilith;
