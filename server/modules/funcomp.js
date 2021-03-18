import RootComponent from "./RootComponent.js";
export default class funcomp extends RootComponent {
	template = /*html*/ `
	<div style="background:blue;">
		<p>{{greeting}}</p>
		<button @click="click">click me!</button>
		{{#clicked}}
			<h1>I was freaking clicked</h1>
		{{/clicked}}
	</div>
`;
	name = "the dude";
	clicked = false;
	click() {
		this.clicked = !this.clicked;
	}
}
