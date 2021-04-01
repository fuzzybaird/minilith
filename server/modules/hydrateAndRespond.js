export default async (payload, component) => {
	let comp = new component();
	comp.hydrate(payload.context);
	comp.id = payload.id;
	await comp.init();
	await comp[payload.action.method](...payload.action.params);
	if (payload.overrideTemplate) {
		comp.template = payload.overrideTemplate;
	}
	return comp.renderJson();
};
