import RootComponent from "../modules/RootComponent.js";
export default class DoctorSearch extends RootComponent {
	template = /*inline-html*/ `
<div class="bg-gray-100 p-4">
	<div class="pt-2 relative mx-auto text-gray-600">
		<input
			class="border-2 border-gray-300 w-full bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
			type="search"
			name="search"
			mi:model="search"
			placeholder="Search"
		/>
	</div>
	{{#selected_doctor}}
	<div class="bg-blue-500 border rounded p-6 mt-4 text-center">
		<h2 class="text-4xl">{{name}}</h2>
	</div>
	{{/selected_doctor}}
	<div class="pt-4 rounded overflow-hidden">
		{{#is_selected}} {{/is_selected}} {{^is_selected}}
		{{#search_result}}
		<div
			id="{{name}}"
			mi:click="select_doctor"
			mi:param="{{name}}"
			class="flex p-4 bg-white mb-2 rounded"
		>
			<span class="block rounded-full overflow-hidden w-6"
				><img src="{{image}}?{{name}}" alt=""
			/></span>
			<b class="pl-4">{{name}}</b>
		</div>
		{{/search_result}} {{/is_selected}}
	</div>
</div>`;
	search = "";
	selected_doctor = null;
	doctors = [
		{ name: "Cat Man Do", image: "https://picsum.photos/200" },
		{ name: "Bob Builder", image: "https://picsum.photos/200" },
		{ name: "Sarah Brave", image: "https://picsum.photos/200" },
		{ name: "Dopey Dope", image: "https://picsum.photos/200" },
		{ name: "Dumb Bump", image: "https://picsum.photos/200" },
		{ name: "Sally Driver", image: "https://picsum.photos/200" },
		{ name: "Lossy Maid", image: "https://picsum.photos/200" },
		{ name: "Faith Hill", image: "https://picsum.photos/200" },
		{ name: "John C Riley", image: "https://picsum.photos/200" },
	];
	search_result = () => {
		return this.doctors.filter((doc) => !(doc.name.indexOf(this.search) == -1));
	};
	select_doctor = (name) => {
		console.log(name);
		this.selected_doctor = this.doctors.filter((doc) => doc.name == name);
	};
}
