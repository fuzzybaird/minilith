import RootComponent from "../modules/RootComponent.js";
import root from "app-root-path";
import getParams from "get-parameter-names";
import hbs from "hbs";
export default class ComponentDoc extends RootComponent {
	template = /*html*/ `
<div class="p-4 bg-gray-200 border">
	<h1 class="text-center text-3xl">{{component_name}}</h1>
	<ul class="mb-4">
		{{#component_meta}}
		<li class="p-2">
			<b>{{name}}</b>: type
			<span class="text-green-500">{{type}}</span> {{#arguments}}
			[{{.}}], {{/arguments}}
		</li>
		{{/component_meta}}
	</ul>
	<pre
		class="overflow-x-scroll"
	><code data-language="html">{{rendered_helper}}</code></pre>
	<pre
		class="overflow-x-scroll"
	><code data-language="html">{{component_template}}</code></pre>
</div>`;

	/**
	 * The helper template to accelerate people experimenting
	 */
	helper_template = /*html*/ `<html>
	<head>
		<link
			href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
			rel="stylesheet"
		/>
	</head>
	<body>
		<template
			mi-name="{{component_name}}"
			mi-target="https://minilith.elibaird.com/minilith"
			mi-context="{}"
		></template>
		<script
			type="module"
			src="https://minilith.elibaird.com/src/index.js"
		></script>
	</body>
</html>
`;
	component_name = "";
	show_default_template = false;
	component_template = "";
	component_meta = [];
	rendered_helper = () => {
		const template = hbs.handlebars.compile(this.helper_template);
		return template({ component_name: this.component_name });
	};
	async init() {
		const compClass = await import(
			`${root}/components/${this.component_name}.js`
		);
		const component = new compClass.default();
		this.component_template = component.template;
		this.component_meta = Object.getOwnPropertyNames(component).map((item) => {
			let expand = {
				name: item,
				type: typeof component[item],
			};
			if (expand.type == "function") {
				expand["arguments"] = getParams(component[item]);
			}
			return expand;
		});
	}
}
