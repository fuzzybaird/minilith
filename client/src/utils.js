export function isTesting() {
	return (
		navigator.userAgent,
		navigator.userAgent.includes("Node.js") ||
			navigator.userAgent.includes("jsdom")
	);
}

export function walk(el, callback) {
	if (callback(el) === false) return;
	let node = el.firstElementChild;

	while (node) {
		walk(node, callback);

		node = node.nextElementSibling;
	}
}
