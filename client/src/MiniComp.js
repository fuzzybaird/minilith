import { walk } from "./utils.js";
import fetcher from "./Fetcher.js";
export default class MiniComp {
	constructor(template) {
		this.name = template.getAttribute("mi-name");
		this.ref = template;
		this.context = {};
		this.miniTarget = "/minilith";

		if (template.getAttribute("mi-target")) {
			this.miniTarget = template.getAttribute("mi-target");
		}
		this.template = template.cloneNode(true);
		this.renderHistory = [];
		this.callBindings = {};
	}

	renderTick() {
		let wrapper = document.createElement("div");
		wrapper.innerHTML = this.renderHistory[this.renderHistory.length - 1];

		this.ref.parentNode.replaceChild(wrapper, this.ref);

		this.ref = wrapper;
		walk(this.ref, (el) => {
			let click = el.getAttribute("@click");
			if (click) {
				el.addEventListener("click", (event) => {
					this.dispatchAction(click);
				});
			}
			return true;
		});
	}

	async dispatchAction(method, params = []) {
		fetcher
			.postData(this.miniTarget, this.generateServerRequest(method, params))
			.then((res) => {
				this.renderHistory.push(res.render);
				this.context = res.context;
				this.renderTick();
			})
			.catch((err) => console.error(err));
	}
	getTarget() {
		return this.miniTarget;
	}
	generateServerRequest(method, params = []) {
		return {
			name: this.name,
			action: { method, params },
			overrideTemplate: this.template.innerHTML,
			context: this.context,
		};
	}
}
