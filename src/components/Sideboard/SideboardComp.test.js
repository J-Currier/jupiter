import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import SideboardComp from "./SideboardComp";

describe("sideboard load", () => {
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

  test("render", () => {
    act(() => {
      render(<SideboardComp />, container);
    });
  });

  test("click button", () => {
    // setup mock button function
    const mockButtonFx = jest.fn(); // mock function
    const mockFactorHandle = jest.fn(); // mock function
    act(() => {
      render(
        <SideboardComp
          buttonFunction={mockButtonFx}
          factorHandle={mockFactorHandle}
          moveFactor={1}
        />,
        container
      );
    });
    // identify the buttons
    const translationBtn = document.getElementById("translation-button");
    const rotationBtn = document.getElementById("rotation-button");
    const reflectionBtn = document.getElementById("reflection-button");

    // click translation
    act(() => {
      translationBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(pretty(container.innerHTML)).toMatchSnapshot();
    // click rotation
    act(() => {
      rotationBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // click reflection
    act(() => {
      reflectionBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  });
});
