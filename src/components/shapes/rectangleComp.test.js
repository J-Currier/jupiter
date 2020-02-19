import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Rectangle, determineCorners } from "./rectangleComp.js";

describe('determine corners', () => {
    test('orientation 1', () => {
        expect(determineCorners(1000, 1000, 200, 1))
            .toEqual([[1000, 1000], [1400, 1000], [1400, 800], [1000, 800]]);
        expect(determineCorners(1000, 1000, 200, 2))
            .toEqual([[1000, 1000], [1200, 1000], [1200, 1400], [1000, 1400]]);
        expect(determineCorners(1000, 1000, 200, 3))
            .toEqual([[1000, 1000], [600, 1000], [600, 1200], [1000, 1200]]);
        expect(determineCorners(1000, 1000, 200, 4))
            .toEqual([[1000, 1000], [800, 1000], [800, 600], [1000, 600]]);
    });
});

describe('rectangle load', () => {
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
    test('load', () => {
      const moveBack_shakeVertical = jest.fn();
      const moveBack_shakeHorizontal = jest.fn();
      let shapeInfo = {
        "id": 1,
        "position": [0, 0, 100, 1],
        "fillColour": 'rgba(255, 77, 0, 1)',
        "borderColour": 'rgba(255, 255, 255, 1)',
        "borderWidth": 10,
        "shapeClassName": ""
      }
      render(
        <Rectangle
          shapeInfo={shapeInfo}
          moveBack_shakeVertical={moveBack_shakeVertical}
          moveBack_shakeHorizontal={moveBack_shakeHorizontal}
        />, container
      );
    });
  });