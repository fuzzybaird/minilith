import RootComponent from "./RootComponent.js";

export default class testpage extends RootComponent {
	template = /*html*/ `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link
				href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
				rel="stylesheet"
			/>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/rainbow/1.2.0/themes/github.min.css"
				integrity="sha512-dqCmbGxLwDqQYmI+Dr0LAWG21trYGnqIaw+yuyfmLXTmb8tiZyvOeqQqmJbZWv7UpzUeRV9Zj6QTKMw4eMSiHw=="
				crossorigin="anonymous"
			/>
			<title>Document</title>
		</head>
		<body>
			<h1 class="text-2xl text-center mb-6">My page</h1>
			<div class="max-w-prose mx-auto">
				<template
					mi-name="DoctorSearch"
					mi-target="/minilith"
					mi-context="{search:'Cat'}"
				></template>
				<template
					mi-name="ComponentDoc"
					mi-target="/minilith"
					mi-context="{component_name:'DoctorSearch'}"
				></template>
				<!-- <template
					mi-name="ComponentDoc"
					mi-target="/minilith"
					mi-context="{component_name:'TabComponent'}"
				></template> -->
			</div>
	
			<!-- <template
				mi-name="funcomp"
				mi-target="/minilith"
			></template> -->
	
			<script type="module" src="/src/index.js"></script>
			<script
				src="https://cdnjs.cloudflare.com/ajax/libs/rainbow/1.2.0/js/rainbow.min.js"
				integrity="sha512-1iwOtzgGTn5KiNhyTHdGh8IpixXZnsD0vRXUqNUgWqET4Uv3vDXuHq55cGjdJ+qNBL/HxH815N7qvLxgzA1dYw=="
				crossorigin="anonymous"
			></script>
			<script
				src="https://cdnjs.cloudflare.com/ajax/libs/rainbow/1.2.0/js/language/html.min.js"
				integrity="sha512-2W7f/2AT/pqNI+4hrfTDsAz67Jb267F+SjVQ38iODHDScHBpQ//aZrVMtiblC6KrP2YpwI33934NVOaV+QUI0Q=="
				crossorigin="anonymous"
			></script>
			<script>
				(() => {
					setTimeout(() => {
						Rainbow.color();
					}, 1000);
				})();
			</script>
		</body>
	</html>
	`;
}
