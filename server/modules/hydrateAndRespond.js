export default (payload, component) => {
	let comp = new component();
	// console.log(comp);
	comp.hydrate(payload.context);
	// console.log(comp);
	comp[payload.action.method]();
	// console.log(comp);
	if (payload.overrideTemplate) {
		comp.template = payload.overrideTemplate;
	}
	console.log(comp.renderJson());
	return comp.renderJson();
};
