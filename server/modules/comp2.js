import RootComponent from "./RootComponent.js";
export default class comp2 extends RootComponent {
	template = /*html*/ `
	<div style="background:green;">
		<p>{{greeting}}</p>
		<button @click="click">click me!</button>
		{{#clicked}}
			<h1>I was freaking clicked</h1>
		{{/clicked}}

		<button @click="hello">my greeting</button>
		{{#clicked}}
			<h1>{{greeting}}</h1>
		{{/clicked}}
	</div>
`;
	greeting = "";
	hello() {
		this.greeting = "hey there fellow";
	}
	click() {
		this.clicked = true;
	}
}
