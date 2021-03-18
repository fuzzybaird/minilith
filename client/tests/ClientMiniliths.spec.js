import fetchMock from "jest-fetch-mock";
import Minilith from "../src/index.js";
import comp from "./BackendComps/comp";
import { walk } from "../src/utils";
import testingDom from "@testing-library/dom";
fetchMock.enableMocks();
describe("client side library", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("should be able to mount & call backend service for template", async () => {
		fetch.mockResponseOnce(JSON.stringify(new comp().renderJson()));
		document.body.innerHTML = /*html*/ `
			<template mi-name="comp">
					<span x-bind:foo="foo"></span>
			</template>
		`;
		Minilith.start();
		await testingDom.waitFor(() => {
			expect(document.querySelector("button").getAttribute("@click")).toEqual(
				"click"
			);
		});
	});

	it("should mount, and ask server for initial rendered template, then when button clicked ask server for second template", async () => {
		// arranging the two requests needed to represent the actions the component could take against server
		fetch
			.once(
				JSON.stringify(
					new comp().renderJson(
						/*html*/ `<div><button @click="dogs">dogs</button><button @click="cats">cats</button></div>`
					)
				)
			)
			.once(
				JSON.stringify(
					new comp().renderJson(
						/*html*/ `<div><button @click="dogs">dogs</button><button @click="cats">cats</button><span id="return">you returned me</span></div>`
					)
				)
			);
		document.body.innerHTML = /*html*/ `
		<template mi-name="comp"></template>
		`;

		await Minilith.start();
		testingDom.fireEvent.click(testingDom.screen.getByText("dogs"));
		await testingDom.waitFor(() => {
			expect(fetch.mock.calls[1][0]).toBe("/minilith");
		});

		await testingDom.waitFor(() => {
			expect(document.querySelector("span").innerHTML).toEqual(
				"you returned me"
			);
		});
	});
});
