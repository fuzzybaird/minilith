## problem statement

When the open web was created; HTML was a declarative way to structure documents for the disseminating of information. Which made the accessibility of sharing and collaborating ideas really easy! Over the years we started sprinkling visual formatting & behavior (css & js). As the amount of information put on the web grew, websites became as much a "How" you access, interact, and update information as the "What" information is being shown. Once the "How" became the focus for sites, backend languages, and tooling became a priority skill set. The industry saw a burst in monolithic MVC architectures where we could organize the "What" & "How" close to the "Where" underlying information/data/infrastructure was stored. This worked incredibly well, and arguably is the still one best ways to start sharing documents/experiences on the web today.

as the capabilities of browsers and JS continued to improve though, we started to be able to do more of the "How" information is interacted with on the client side, and putting thinner REST/Abstraction layer on-top of "Where" the data is stored. This created new freedoms to care even less about the "Where" information is stored. Opening us to focus on our user interaction and experience without having to reload the page, one could aggregate data from the server or servers, and react to users input with just the data rendered to page that the user wanted. This experience quickly became the gold standard. With new pressures to have advanced reactive experiences in the UI, and wholistic state management, we started seeing front end paradigms pop up like MVVM, and frameworks (React, Vue, Angular) to orchestrate the new complexity of managing "How" to display and interacting with information. There are huge advantages to having the logic of how one interacts with data very close to the what is ultimately shown to the viewer. In fact bundling interact-able and view-ables into one atomic/declarative component is the ultimate goal of Vue, React, Angular. So that one could abstract the "How" behind something that reads like declarative HTML. For example

```html
<employee-list company="Google" />
```

Or declarative and composable with slots (Higher Order Components).

```html
<!-- Vue JS example. but composable higher order components exist in many JS frameworks -->
<user-profile v-slot:default="profile">
	<span>{{ profile.firstName }}</span>
	<button @click="profile.addAsFriend()">Add Friend</button>
</user-profile>
```

The above is an example having a declarative component that exposes some data and functionality, that allows the slot to override "What" ultimately gets rendered without having to know the imperative code that makes up the "How". This paradigm breakthrough affords an incredibly simple syntax that can allow people to compose functionality _AND_ information all in one purely declarative way. We are starting to get back to the original declarative HTML of the _open web_ and the accessibility of being a creator in that space without a large technical background. Which in my mind is amazing!

Ok so if we have this fantastic declarative syntax now why is developing a new interactive experiences still so hard? Well the problem comes back to the "What", "How", and "Where" dilemma. To some degree we have just moved the complexity of the "How" to the browser, and then tried to compensate with creating these declarative components. But the reality is all that imperative code is still there, and its really hard to reuse cross information domains and experiences. Also the browser is really not the best place to be making decisions of how to aggregate information, because it has the limitation of the network (physical proximity to the data), and many unpredictable browser runtimes inhibiting reliable execution. GraphQL was born to abstract all of the "Where" and a little bit of the "How" information is aggregated into a declarative query service, addressing some of the complexities of the "How" logic being pushed to the Client SPA side. This has some advantages of lowing some complexity, but it is yet another declarative language that one must learn on top micro pieces of imperative server side code, that ultimately gets sent the the client, to become imperative code again, that gets turned into Declarative Components to then become declarative HTML. That IS a large amount of mutation and transformation to subport moving the "How" to the client. Its no surprise that all the major SPA frameworks like Vue & react, are rapidly focusing on server side rendering (Isomorphic, JAMSTACK, Full Server) as a key part of their simplicity efforts. Nuxt, Next, or a more full server render like "React Server Components" for example.

We are on the second to last stop on this trends journey of managing the big 3 of "What", "How", "Where". We have the Javascript Lite movement or also known as HTML over the wire movement. Here is [DHH's Article on the subject](https://m.signalvnoise.com/html-over-the-wire/). This has taken two forms major forms, the first form being the Turbo Hotwire flavor which was created by DHH's Basecamp/Hey team where traditional html gets decorated with reactivity behavior and bound to server routes that return smaller chunks of the page that then get patched back into the current view. This gives an almost identical reactive feel to most usecases that SPA frameworks are trying to accomplish, but with just a simple js shim library that requires no bundling and no custom client side javascript. Which allow the "How" to be moved back into the server where it is closest to "Where" information is stored. The second approach to the HTML over the wire movement are implementations like Laravel's framework extension **Livewire**, and **Phoenix's** reactive ui's. The different tact that these frameworks take is more of an RPC model where the "What" and "How" how are written as server side components (Templates, Methods, Data), they can be initially rendered server side, and then when the page loads in the client, there is a declarative syntax that binds input and DOM events back to the methods of those server components through Ajax calls along with some shared context, the the component re-renders after the methods and state have been updated in the server component returning new Context & HTML to be patched back into the client's page. This allows for the more expressive declarative syntax that we have come to know an love from React & Vue, but with less round tripping and data aggregation complexity.

Okay we have made it to the final (for our purposes) stop of the big 3 "What", "How", "Where." On this long walk through the history of managing complexity in the web we have covered traditional monoliths, the trend of reactive webpages, to full SPA's, straddling both worlds in hybrid/isomorphic, to putting the majority of our "How" back on the server with HTML over the wire. All of these approaches have great advantages depending on the types of engineers you have, or the type of experience (information, and interaction) you are trying to create. But one thing that all of these implementations have in common is ultimately the "What", "How", "Where" complexity does not disappear. You still need some engineering skill to make it all work, and there are a lot of great minds with a barrier to the web because they don't want to dedicate their life to being an engineer. If you want to make a new social network even for smaller quirky groups, or a blog, or anything. You either have to be an expert of the big-three, use someone else's tool, or your final option is to use a Low or No code solution, that provides some declarative GUI based tools to compose the "What" in your idea. We are seeing a large push for Low and No code solutions, because the worlds desire to play in this tech ecosystem is greater than just engineers. The problem with most of the Low/No code solutions is they end up being tightly coupled to their platforms, hosting, and even require a lot of custom non transferable training.

Enter Minilith! My experiment to address this space.

I have a pretty radical and somewhat stupid proposal to get us back to the basics of an open web, while still providing the ability for developers to build and share or sell new functionality. While keeping the "What" simple and declarative for a broader level of adoptability. I started a POC of this concept called Minilith, essentially, using a component model like LiveWire or Phoenix, create a declarative html syntax that binds to components either hosted by yourself or others, that allows for the composing and customizing of the "What" you show to users along with what interactions they have.

from the clients perspective you would declare in html what component you want to use, and with some attributes tell it where that server component lives, and some initial context information to send to the sever for the rendered response of that component.

<sub>local/test.html</sub>

```html
<html>
	<head>
		<!-- Styles will be applied to rendered component -->
		<link
			href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
			rel="stylesheet"
		/>
	</head>
	<body>
		<!-- 
			This is the where you declare your component using a basic template
			tag. Then with some custom attributes that minilith uses, choose
			your target server; could be relative or absolute, then aso a
			name of the component from that provider you want to use,
			with optional context attribute to initialize state.
		 -->
		<template
			mi-name="DoctorSearch"
			mi-target="https://minilith.elibaird.com/minilith"
			mi-context="{search: 'Bob'}"
		></template>

		<!-- 
			Small minilith library that acts like the glue between the client
			component definition and the server component.
		 -->
		<script
			type="module"
			src="https://minilith.elibaird.com/src/index.js"
		></script>
	</body>
</html>
```

This on its own is not that radical of an idea, we have been binding DOM elements with data for a long time, and then using the server to patch information into those sections. Where this idea gets a little eccentric, is that template used to render the "What" get displayed comes with a default example from the server component definition. But you can simply place your own markup and display structure inside of the template tags. This giving you complete control over how you compose the "What" gets displayed including interactions, much like `<slots />` in Vue.

```html
<template
	mi-name="DoctorSearch"
	mi-target="https://minilith.elibaird.com/minilith"
	mi-context="{search: 'Bob'}"
>
	<input mi:model="search" class="p-4 rounded" />
	<ul>
		<!-- 
		I am currently using Mustache templates for their "Logic-less"
		nature so that I can avoid script injections.
	-->
		{{#search_result}}
		<li class="text-red-500">{{name}}</li>
		{{/search_result}}
	</ul>
</template>
```

Now when your component mounts and requests the server to render its initial state the server will use your provided template over the default one that it has, and pass the data provided by its component into your template render. And you now have a safely customizable component, without having to know anything about the "How" or the "Where" the data gets aggregated and injected to your template. Freeing you to focus on composing your experience just the way you want it. The server side implementation of this is incredibly simple as well.

<sub>src/components/DoctorSearch</sub>

```javascript
import RootComponent from "../modules/RootComponent.js";
export default class DoctorSearch extends RootComponent {
	template = /*html*/ `
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
	<div class="pt-4 rounded overflow-hidden">
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
		{{/search_result}}
	</div>
</div>`;
	search = "";
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
}
```

I would love to chat more about Minilith on twitter [EliBaird](https://twitter.com/EliBaird)
