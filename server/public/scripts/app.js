let allTemplates = document.getElementsByTagName("template");
let miniliths = {};
console.log(allTemplates);
class minilith {
	constructor(template) {
		this.name = template.getAttribute("minilith");
		this.ref = template;
		this.template = template.cloneNode(true);
		this.renderHistory = [];
	}
	renderTick() {
		let wrapper = document.createElement("div");
		wrapper.innerHTML = this.renderHistory[0];
		this.ref.parentNode.replaceChild(wrapper, this.ref);
		this.ref = wrapper;
	}
}
async function postData(url = "", data = {}) {
	const response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data),
	});
	return response.json();
}

for (let index = 0; index < allTemplates.length; index++) {
	if (allTemplates[index].getAttribute("minilith")) {
		miniliths[allTemplates[index].getAttribute("minilith")] = new minilith(
			allTemplates[index]
		);
	}
}
console.log(miniliths);

Promise.all(
	Object.keys(miniliths).map((mini) => {
		return postData("/minilith", { minilith: mini });
	})
).then((result) => {
	if (result) {
		result.map((res) => {
			miniliths[res.minilith].renderHistory.push(res.render);
			miniliths[res.minilith].renderTick();
		});
	}
	console.log(result);
});
