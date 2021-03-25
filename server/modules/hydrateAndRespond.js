export default async (payload, component) => {
	let comp = new component();
	// console.log(comp);
	comp.hydrate(payload.context);
	// console.log(comp);
	await comp.init();
	await comp[payload.action.method](...payload.action.params);
	// console.log(comp);
	if (payload.overrideTemplate) {
		comp.template = payload.overrideTemplate;
	}
	// console.log(comp.renderJson());

	return comp.renderJson();
};
