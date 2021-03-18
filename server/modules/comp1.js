import RootComponent from "./RootComponent.js";
export default class comp1 extends RootComponent {
	template = /*inline-html*/ `
			<div>
				<h3>{{first_name}}</h3>
				<p>{{last_name}}</p>
				<button @click="click">click me!</button>
				{{#clicked}}
				<h1>{{first_name}} clicked me! That sun of a gun</h1>
				{{/clicked}}
			</div>
		`;
	first_name = "eli";
	last_name = "baird";
	clicked = false;
	click() {
		this.clicked = !this.clicked;
	}
}
