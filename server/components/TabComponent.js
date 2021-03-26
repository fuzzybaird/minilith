import RootComponent from "../modules/RootComponent.js";
export default class TabComponent extends RootComponent {
	template = /*html*/ `
	<div>
		<span mi:click="setTab" mi:param="tab1" class="{{#tab1Selected}}bg-green-200{{/tab1Selected}} p-4">Tab 1</span>
		<span mi:click="setTab" mi:param="tab2" class="{{#tab2Selected}}bg-green-200{{/tab2Selected}} p-4">Tab 2</span>
		{{#tab1Selected}}
		<div>
		<h1>Hello from comp 1</h1>
		</div>
		{{/tab1Selected}}
		{{#tab2Selected}}
		<div>
			Comp 2 baby
		</div>
		{{/tab2Selected}}
	</div>
	`;
	tab = "tab1";
	setTab = (tab) => {
		this.tab = tab;
	};
	tab1Selected = () => {
		return this.tab === "tab1";
	};
	tab2Selected = () => {
		return this.tab === "tab2";
	};
}
