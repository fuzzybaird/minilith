import fetchMock from "jest-fetch-mock";
import Minilith from "../src/index.js";
import comp from "./BackendComps/comp";
import testingDom from "@testing-library/dom";
import MiniComp from "../src/MiniComp";

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
			expect(document.querySelector("button").getAttribute("mi:click")).toEqual(
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
						/*html*/ `<div><button mi:click="dogs">dogs</button><button mi:click="cats">cats</button></div>`
					)
				)
			)
			.once(
				JSON.stringify(
					new comp().renderJson(
						/*html*/ `<div><button mi:click="dogs">dogs</button><button mi:click="cats">cats</button><span id="return">you returned me</span></div>`
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

	it("should be able to submit change events mi:model input", async () => {
		fetch.once(
			JSON.stringify(
				new comp().renderJson(
					/*html*/ `<div><button mi:click="dogs">dogs</button><button mi:click="cats">cats</button></div>`
				)
			)
		);
		document.body.innerHTML = /*html*/ `<template mi-name="comp" mi-context="{cats:'rule'}"></template>`;
		let mini = new MiniComp(document.body.firstElementChild);
		mini.pushRender("<input mi:model='cats' value='test' />").renderTick();
		expect(document.querySelector("input").constructor.name).toBe(
			"HTMLInputElement"
		);
		// console.log(mini.ref.firstElementChild);
		testingDom.fireEvent.change(mini.ref.firstElementChild, {
			target: { value: "23" },
		});

		await testingDom.waitFor(() => {
			// console.log(fetch.mock.calls[0][1].body);
			const resp = JSON.parse(fetch.mock.calls[0][1].body);
			expect(resp.action.params).toStrictEqual(["cats", "23"]);
			expect(resp.action.method).toBe("updateContextVal");
		});
	});
});
