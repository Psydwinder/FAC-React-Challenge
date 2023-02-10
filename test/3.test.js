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

test("MouseTracker component converts user input to upper case", async () => {
  const _addEventListener = window.addEventListener;
  let listeners = 0;
  window.addEventListener = (type, cb) => {
    listeners++;
    _addEventListener(type, cb);
  };

  const _removeEventListener = window.removeEventListener;
  let removed = false;
  window.removeEventListener = (type, cb) => {
    removed = true;
    _removeEventListener(type, cb);
  };

  const MouseTracker = await component("MouseTracker");
  const { unmount, container } = render(createElement(MouseTracker));

  const output = tag(container, "output", HTMLOutputElement);

  fireEvent.mouseMove(document.body, { clientX: 150, clientY: 3 });
  assert.equal(
    output.textContent,
    "150,3",
    `Expected <output>150,3</output>, but got:\n${prettyDOM()} `
  );

  fireEvent.mouseMove(document.body, { clientX: 27, clientY: 14 });
  assert.equal(
    listeners,
    1,
    `MouseTracker should only add 1 event listener to the window`
  );

  unmount();
  fireEvent.mouseMove(document.body, { clientX: 27, clientY: 14 });
  assert.ok(
    removed,
    `Window event listener should be removed after MouseTracker is unmounted. Did you clean up?`
  );

  after(() => {
    window.addEventListener = _addEventListener;
    window.removeEventListener = _removeEventListener;
  });
});
