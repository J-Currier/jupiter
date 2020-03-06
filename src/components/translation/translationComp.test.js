import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Translation from './translationComp';

describe('component', () => {

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

  test('render', () => {
    act(() => {
      render(
        <Translation
        />, container
      );
    });
  });

  test('click button', () => {
    // setup mock button function
    const mockFunction = jest.fn(); // mock function
    const mockHandle = jest.fn(); // mock function
    act(() => {
      render(
        <Translation
          translate = {mockFunction}
          translationFactor = {1}
          handleChange = {mockHandle}
        />, container
      );
    });
    // identify the buttons
    const up = document.getElementById("up");
    const down = document.getElementById("down");
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    // click up
    act(() => {
      up.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockFunction.mock.calls.length).toBe(1);
    expect(mockFunction.mock.calls[0][1]).toBe(0);
    expect(mockFunction.mock.calls[0][2]).toBe(-100);
    // click down
    act(() => {
      down.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockFunction.mock.calls.length).toBe(2);
    expect(mockFunction.mock.calls[1][1]).toBe(0);
    expect(mockFunction.mock.calls[1][2]).toBe(100);
    // click left
    act(() => {
      left.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockFunction.mock.calls.length).toBe(3);
    expect(mockFunction.mock.calls[2][1]).toBe(-100);
    expect(mockFunction.mock.calls[2][2]).toBe(0);
    // click right
    act(() => {
      right.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockFunction.mock.calls.length).toBe(4);
    expect(mockFunction.mock.calls[3][1]).toBe(100);
    expect(mockFunction.mock.calls[3][2]).toBe(0);
  });
});