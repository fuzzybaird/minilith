import RootComponent from "../modules/RootComponent.js";
export default class TabComponent extends RootComponent {
	template = /*html*/ `
	<div>
		<div class="flex">
			<span mi:click="setTab" mi:param="tab1" class="{{#tab1Selected}}bg-green-200{{/tab1Selected}}{{^tab1Selected}}bg-gray-200{{/tab1Selected}} p-4">Tab 1</span>
			<span mi:click="setTab" mi:param="tab2" class="{{#tab2Selected}}bg-green-200{{/tab2Selected}}{{^tab2Selected}}bg-gray-200{{/tab2Selected}} p-4">Tab 2</span>
		</div>
		{{#tab1Selected}}
		<div class="p-4">
		<h1>Hello from tab 1</h1>
		</div>
		{{/tab1Selected}}
		{{#tab2Selected}}
		<div class="p-4">
			Here from tab 2
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
