// eslint-disable-next-line import/no-unresolved
import { describe as test, after } from "node:test";
import assert from "node:assert/strict";
import { component, render, createElement, prettyDOM, tag } from "./helpers.js";

test("Greeting component renders based on `name` prop", async () => {
  const Greeting = await component("Greeting");
  const el = createElement(Greeting, { name: "oli" });
  const { unmount, container } = render(el);
  after(unmount);

  const p = tag(container, "p", window.HTMLParagraphElement);
  assert.match(
    p.textContent,
    /hello oli/i,
    `<Greeting name="oli" /> should render <p>hello oli</p>, but got:\n${prettyDOM()}`
  );
});
