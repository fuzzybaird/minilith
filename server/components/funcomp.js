import RootComponent from "../modules/RootComponent.js";
export default class funcomp extends RootComponent {
	template = /*html*/ `
	<div style="background:blue;">
		<p>{{greeting}}</p>
		<button @click="click">click me!</button>
		{{#clicked}}
			<h1>look how much fun we are having!?</h1>
		{{/clicked}}
	</div>
`;
	name = "the dude";
	clicked = false;
	click() {
		this.clicked = !this.clicked;
	}
}
