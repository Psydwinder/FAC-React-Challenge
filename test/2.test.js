// eslint-disable-next-line import/no-unresolved
import { describe as test, after } from "node:test";
import assert from "node:assert/strict";
import {
  render,
  createElement,
  component,
  prettyDOM,
  tag,
  fireEvent,
} from "./helpers.js";

test("Shouter component converts user input to upper case", async () => {
  const Shouter = await component("Shouter");
  const { unmount, container } = render(createElement(Shouter));
  after(unmount);

  const input = tag(container, "input", HTMLInputElement);
  const output = tag(container, "output", HTMLOutputElement);

  fireEvent.change(input, { target: { value: "hello test" } });
  assert.equal(
    output.textContent,
    "HELLO TEST",
    `Expected <output>HELLO TEST</output>, but got:\n${prettyDOM()} `
  );
});
