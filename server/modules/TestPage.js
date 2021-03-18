import RootComponent from "./RootComponent.js";

export default class testpage extends RootComponent {
	template = /*html*/ `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>Document</title>
	</head>
	<body>
		<template minilith="comp1" mi-data="{sharedkey:alskdjflksjdlkj}">
			<div>
				<h3 class="green">{{first_name}}</h3>
				<p>{{last_name}}-iscool</p>
				<button @click="click">click me!</button>
				{{#clicked}}
					<h1>who da man!!</h1>
				{{/clicked}}
			</div>
		</template>
		<script type="module" src="/src/index.js" ></script>
		<script type="module" src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"></script>
	</body>
	</html>
	`;
}
