// The types of directives supported by minilith.
const directiveMatch = /^mi:(click|model)\b/;

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

const handleError = (el, expression, error) => {
	console.warn(
		`Minilith Error: "${error}"\n\nExpression: "${expression}"\nElement:`,
		el
	);

	if (!isTesting()) {
		Object.assign(error, { el, expression });
		throw error;
	}
};

function tryCatch(cb, { el, expression }) {
	try {
		const value = cb();
		return value instanceof Promise
			? value.catch((e) => handleError(el, expression, e))
			: value;
	} catch (e) {
		handleError(el, expression, e);
	}
}

/**
 * A way to evaluate strings in attributes for the templates to render
 * @param   {HTMLElement}  [el] passed for tracking purposes.
 * @param  {String|Function} [expression] this is what we want to eval
 * @param {Object} [dataContext]
 * @param {(Object|null)} [additionalHelperVariables]
 * @return  {any}
 */
export function saferEval(
	el,
	expression,
	dataContext,
	additionalHelperVariables = {}
) {
	return tryCatch(
		() => {
			if (typeof expression === "function") {
				return expression.call(dataContext);
			}

			return new Function(
				// @ts-ignore
				["$data", ...Object.keys(additionalHelperVariables)],
				`var _result; with($data) { _result = ${expression} }; return _result`
			)(dataContext, ...Object.values(additionalHelperVariables));
		},
		{ el, expression }
	);
}
export function parseHtmlAttribute({ name, value }) {
	const typeMatch = name.match(directiveMatch);
	const valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/);
	const modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];

	return {
		type: typeMatch ? typeMatch[1] : null,
		value: valueMatch ? valueMatch[1] : null,
		modifiers: modifiers.map((i) => i.replace(".", "")),
		expression: value,
	};
}

export function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

export function makeId(length) {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
