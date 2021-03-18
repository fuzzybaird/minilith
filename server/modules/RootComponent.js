import hbs from "hbs";

export default class RootComponent {
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
	init() {}
}
