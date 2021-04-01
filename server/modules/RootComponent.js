import hbs from "hbs";

export default class RootComponent {
	id = "";
	render() {
		const template = hbs.handlebars.compile(this.template);
		return template(this);
	}
	renderJson(templateOverride = null) {
		if (templateOverride) {
			this.template = templateOverride;
		}
		const template = hbs.handlebars.compile(this.template);
		return {
			name: this.constructor.name,
			id: this.id,
			render: template(this),
			context: this,
		};
	}
	hydrate(context) {
		Object.keys(this).map((thiskey) => {
			Object.keys(context).map((contextkey) => {
				if (thiskey === contextkey) {
					this[thiskey] = context[contextkey];
				}
			});
		});
	}
	updateContextVal(key, val) {
		if (this[key]) {
			this[key] = val;
		}
	}
	async init() {}
	makeId(length) {
		var result = "";
		var characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}
