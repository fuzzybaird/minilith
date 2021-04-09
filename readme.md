# Minilith

A new way to make re-usable and composable components that can be shared cross domain, that put the control back into HTML the original declarative paradigm. This project consists of 1 front end library that acts like the contract between the DOM and your sever, several server side libraries to assist with building server components in different languages. For now we are just building the JS Server framework. But hope to have GO, Ruby, Python, PHP etc in the long run.

if you want to read the abstract here is the link [Abstract Problem Statement](https://github.com/fuzzybaird/minilith/blob/main/abstract.md)

## client

TLDR: include the minilith script on your page, and declare the source of the component you want to render.

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

if you want to override the template (Mustache) of a component just place your own inside the `<template>` tags of the component. the minilith server root url also acts like a component registry where you can get the default template of a component example. [https://minilith.elibaird.com](https://minilith.elibaird.com)
