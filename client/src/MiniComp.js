import { saferEval, debounce, makeId } from "./utils.js";
import fetcher from "./Fetcher.js";
import morphdom from "./morphdom/index.js";

export default class MiniComp {
	constructor(template) {
		this.name = template.getAttribute("mi-name");
		this.id = template.getAttribute("mi-id")
			? template.getAttribute("mi-id")
			: makeId(8);
		this.ref = template;
		this.context = {};
		this.miniTarget = "/minilith";
		if (template.getAttribute("mi-context")) {
			this.context = saferEval(
				template,
				template.getAttribute("mi-context"),
				this,
				{}
			);
		}
		if (template.getAttribute("mi-target")) {
			this.miniTarget = template.getAttribute("mi-target");
		}
		this.template = template.cloneNode(true);
		this.renderHistory = [];
		this.callBindings = {};
		this.morphChanges = { changed: [], discarded: [], added: [] };
	}

	renderTick() {
		let wrapper = document.createElement("div");
		wrapper.innerHTML = this.renderHistory[this.renderHistory.length - 1];

		// this.ref.parentNode.replaceChild(wrapper, this.ref);
		this.ref = morphdom(this.ref, wrapper, {
			childrenOnly: false,

			getNodeKey: (node) => {
				// This allows the tracking of elements by the "key" attribute, like in VueJs.
				return node.id;
			},

			onBeforeNodeAdded: (node) => {
				//
			},

			onBeforeNodeDiscarded: (node) => {
				// console.log(node);
			},

			onNodeDiscarded: (node) => {
				this.morphChanges.changed.push(node);
			},

			onBeforeElChildrenUpdated: (node) => {
				//
			},

			onBeforeElUpdated: (from, to) => {
				// Because morphdom also supports vDom nodes, it uses isSameNode to detect
				// sameness. When dealing with DOM nodes, we want isEqualNode, otherwise
				// isSameNode will ALWAYS return false.
				if (from.isEqualNode(to)) {
					return false;
				}

				if (
					from.hasAttribute("mi:model") &&
					from.tagName.toUpperCase() === "SELECT"
				) {
					to.selectedIndex = -1;
				}
			},

			onElUpdated: (node) => {
				if (node.value && node.hasAttribute("mi:model")) {
					node.value = this[node.getAttribute("mi:model")];
				}
				this.morphChanges.changed.push(node);
			},

			onNodeAdded: (node) => {
				let click = node.getAttribute("mi:click");
				let model = node.getAttribute("mi:model");
				if (click) {
					const param = node.hasAttribute("mi:param")
						? [node.getAttribute("mi:param")]
						: [];
					node.addEventListener("click", (event) => {
						this.dispatchAction(click, param);
					});
				}
				if (model) {
					if (this.context[model]) {
						node.value = this.context[model];
					}
					node.addEventListener("input", (event) => {
						this.context[model] = event.target.value;
						this.debounceAction(this, model);
					});
				}
				this.morphChanges.added.push(node);
			},
		});
	}
	debounceAction = debounce((self, model) => {
		self.dispatchAction("updateContextVal", [model, self.context[model]]);
	}, 10);
	/**
	 * Adding a template to the render stack. This is so we can iterate through
	 * all of the components and then have more control around hooking into
	 * lifecycle and events before we patch to the dom.
	 *
	 * @param   {String}  renderedResponse  [renderedResponse description]
	 *
	 * @return  {this}                    [return description]
	 */
	pushRender(renderedResponse) {
		this.renderHistory.push(renderedResponse);
		return this;
	}

	async dispatchAction(method, params = []) {
		fetcher
			.postData(this.miniTarget, this.generateServerRequest(method, params))
			.then((res) => {
				// console.log("HERE");
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
			id: this.id,
			name: this.name,
			action: { method, params },
			overrideTemplate: this.template.innerHTML,
			context: this.context,
		};
	}
}
