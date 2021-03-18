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
				<button @click="fart">pass gas</button>
				<div>the smell of this rooom is {{fart_smell}}</div>
			</div>
		`;
	first_name = "eli";
	last_name = "baird";
	clicked = false;
	fart_smell = "ok";
	click() {
		this.clicked = !this.clicked;
	}
	fart() {
		this.fart_smell = "really bad";
	}
}
