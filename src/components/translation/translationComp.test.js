import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { fireEvent } from '@testing-library/react'
import { act } from "react-dom/test-utils";

import Translation from './translationComp';

describe('render', () => {

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
});

describe('component', () => {

  let container = null;
  let mockTranslate;
  let translationFactor = 1;
  let mockHandle;
  let mockAddToStack;
  let up;
  let down;
  let left;
  let right;
  let factorBox;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    mockTranslate = jest.fn();
    mockHandle = jest.fn(
      // e => {translationFactor = e.currentTarget.value}
    );
    mockAddToStack = jest.fn()
    act(() => {
      render(
        <Translation
          translate = {mockTranslate}
          translationFactor = {translationFactor}
          handleChange = {mockHandle}
          addToStack = {mockAddToStack}
        />, container
      );
    });
    up = document.getElementById("up");
    down = document.getElementById("down");
    left = document.getElementById("left");
    right = document.getElementById("right");
    factorBox = document.getElementById("factorBox");
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('click up', () => {
    act(() => {
      up.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockTranslate.mock.calls.length).toBe(1);
    expect(mockTranslate.mock.calls[0][1]).toBe(0);
    expect(mockTranslate.mock.calls[0][2]).toBe(-100);
  });
  test('click down', () => {
    act(() => {
      down.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockTranslate.mock.calls.length).toBe(1);
    expect(mockTranslate.mock.calls[0][1]).toBe(0);
    expect(mockTranslate.mock.calls[0][2]).toBe(100);
  });
  test('click left', () => {
    act(() => {
      left.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockTranslate.mock.calls.length).toBe(1);
    expect(mockTranslate.mock.calls[0][1]).toBe(-100);
    expect(mockTranslate.mock.calls[0][2]).toBe(0);
  });
  test('click right', () => {
    act(() => {
      right.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockTranslate.mock.calls.length).toBe(1);
    expect(mockTranslate.mock.calls[0][1]).toBe(100);
    expect(mockTranslate.mock.calls[0][2]).toBe(0);
  });
  test('change factorBox', () => {
    for (let i = 0; i <= 18; i++) {
      act(() => {
        fireEvent.change(factorBox, { target: { value: i } });
        factorBox.value = i; // manually change value instead of using mockHandle
      });
      expect(factorBox.value).toBe(i.toString());
      expect(mockHandle.mock.calls.length).toBe(i+1);
    }
  });
});