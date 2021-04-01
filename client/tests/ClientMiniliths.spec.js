import fetchMock from "jest-fetch-mock";
import Minilith from "../src/index.js";
import comp from "./BackendComps/comp";
import testingDom from "@testing-library/dom";
import MiniComp from "../src/MiniComp";
import hydrate from "../../server/modules/hydrateAndRespond";
fetchMock.enableMocks();
const mockedResponse = async (req) => {
	// console.log(req.body.toString("utf-8"));
	return JSON.stringify(
		await hydrate(JSON.parse(req.body.toString("utf-8")), comp)
	);
};

describe("client side library", () => {
	beforeEach(() => {
		Minilith.clear();
		fetch.resetMocks();
	});
	it("should be able to mount & call backend service for template", async () => {
		fetch.once(mockedResponse);
		document.body.innerHTML = /*html*/ `
			<template mi-name="comp">
					<button mi:click="click"></button>
			</template>
		`;
		Minilith.start();
		await testingDom.waitFor(() => {
			expect(document.querySelector("button").getAttribute("mi:click")).toEqual(
				"click"
			);
		});
	});

	it("should include a dynamic mi-id for component if none is provided", async () => {
		fetch.once(mockedResponse);
		document.body.innerHTML = /*html*/ `
		<template mi-name="comp"></template>
	`;
		Minilith.start();
		await testingDom.waitFor(() => {
			const resp = JSON.parse(fetch.mock.calls[0][1].body);
			expect(resp.id.length).toStrictEqual(8);
		});
	});

	it("should use mi-id for component if is provided", async () => {
		fetch.once(mockedResponse);
		document.body.innerHTML = /*html*/ `
		<template mi-id="cool" mi-name="comp"></template>
	`;
		Minilith.start();
		await testingDom.waitFor(() => {
			const resp = JSON.parse(fetch.mock.calls[0][1].body);
			expect(resp.id).toStrictEqual("cool");
		});
	});

	it("should mount, and ask server for initial rendered template, then when button clicked ask server for second template", async () => {
		// arranging the two requests needed to represent the actions the component could take against server
		await fetch.once(mockedResponse).once(mockedResponse);
		document.body.innerHTML = /*html*/ `
		<template mi-id="whysobad" mi-name="comp"></template>
		`;

		const result = await Minilith.start();

		await testingDom.waitFor(() => {
			document.querySelector("button");
		});
		await testingDom.waitFor(() => {
			testingDom.fireEvent.click(testingDom.getByText(document, "click me!"));
		});
		await testingDom.waitFor(() => {
			expect(fetch.mock.calls[1][0]).toBe("/minilith");
		});
		await testingDom.waitFor(() => {
			expect(document.querySelector("h1").innerHTML).toEqual(
				"I was freaking clicked"
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
		testingDom.fireEvent.input(mini.ref.firstElementChild, {
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
