import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import App from "./App";

describe("app integration", () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("render app", () => {
    act(() => {
      render(<App />, container);
    });
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  test("integration with sideboard click", () => {
    const mockButtonFx = jest.fn(); // mock function
    act(() => {
      render(<App />, container);
    });
    // identify the buttons
    const translationBtn = document.getElementById("translation-button");
    const rotationBtn = document.getElementById("rotation-button");
    const reflectionBtn = document.getElementById("reflection-button");

    // click translation
    act(() => {
      translationBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // translation buttons
    const up = document.getElementById("up");
    const down = document.getElementById("down");
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    // click up
    act(() => {
      up.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // click down
    act(() => {
      down.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // click left
    act(() => {
      left.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // click right
    act(() => {
      right.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
