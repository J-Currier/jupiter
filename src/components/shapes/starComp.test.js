import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import {Square, determineCorners} from "./squareComp.js";

describe('determine corners', () => {
    test('orientation 1', () => {
        expect(determineCorners(1000, 1000, 200, 1))
          .toEqual([[1000, 1000],[1175, 875],[1375, 1000],[1300, 800],[1425, 650],[1250, 650],[1175, 475],[1100, 650],[925, 650],[1050, 800]]);
    });  
    test('orientation 2', () => {
        expect(determineCorners(1000, 1000, 200, 2))
          .toEqual([[1000, 1000],[1125, 1175],[1000, 1375],[1200, 1300],[1350, 1425],[1350, 1250],[1525, 1175],[1350, 1100],[1350, 925],[1200, 1050]]);
    });  
    test('orientation 3', () => {
        expect(determineCorners(1000, 1000, 200, 3))
          .toEqual([[1000, 1000],[825, 1125],[625, 1000],[700, 1200],[5755, 1350],[750, 1350],[825, 1525],[900, 1350],[1075, 1350],[950, 1200]]);
    });  
    test('orientation 4', () => {
        expect(determineCorners(1000, 1000, 200, 4))
          .toEqual([[1000, 1000],[875, 825],[1000, 625],[800, 700],[650, 575],[650, 750],[475, 825],[650, 900],[650, 1075],[800, 950]]);
    });  
  });
  describe('star load', () => {
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
              "id": "star",
              "position": [0,0,100,1],
              "fillColour": 'rgba(255, 77, 0, 1)',
              "borderColour": 'rgba(255, 255, 255, 1)',
              "borderWidth": 10,
              "shapeClassName": ""
            }
          render(
            <Star
              shapeInfo={shapeInfo}
            />, container
          );
      });
  });