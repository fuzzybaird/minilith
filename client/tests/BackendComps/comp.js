import RootComponent from "../../../server/modules/RootComponent.js";
export default class comp extends RootComponent {
	template = /*html*/ `
	<div>
		<h3>{{first_name}}</h3>
		<p>{{last_name}}</p>
		<button @click="click">click me!</button>
		{{#clicked}}
			<h1>I was freaking clicked</h1>
		{{/clicked}}
	</div>
`;
	first_name = "eli";
	last_name = "baird";
	clicked = false;
	click() {
		this.clicked = true;
	}
}
