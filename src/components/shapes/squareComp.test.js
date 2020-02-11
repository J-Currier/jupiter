import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import {Square, determineCorners} from "./squareComp.js";

describe('functions', () => {
    test('determine corners function', () => {
        expect(determineCorners(1000, 1000, 200, 1)).toEqual([[1000, 1000],[1200, 1000],[1200, 800],[1000, 800]]);
    });  
});

describe('square load', () => {
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
        let shapeInfo = {
            "id": "square",
            "position": [0,0,100,1],
            "fillColour": 'rgba(255, 77, 0, 1)',
            "borderColour": 'rgba(255, 255, 255, 1)',
            "borderWidth": 10,
            "shapeClassName": ""
          }
        render(
          <Square
            shapeInfo={shapeInfo}
          />, container
        );
    });
});