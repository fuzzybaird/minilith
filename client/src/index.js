import MiniComp from "./MiniComp.js";
import { isTesting } from "./utils.js";
import fetcher from "./Fetcher.js";
const Minilith = {
	miniliths: {},
	start() {
		let allTemplates = document.getElementsByTagName("template");

		for (let index = 0; index < allTemplates.length; index++) {
			if (allTemplates[index].getAttribute("mi-name")) {
				const comp = new MiniComp(allTemplates[index]);
				this.miniliths[comp.id] = comp;
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
						this.miniliths[res.id].renderHistory.push(res.render);
						this.miniliths[res.id].renderTick();
					});
					return result;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	},
	clear(){
		this.miniliths = {};
	}
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
