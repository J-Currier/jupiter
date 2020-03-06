import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import CallStack from './callStack'
import {CallCard} from './callStack'

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
          render(<CallStack />, container);
        });
      });

      test("render", () => {
        act(() => {
          render(<CallCard 
            img={"url"} 
            fx ={() => {}} c
            cardId={1} />, container);
        });
      });



      
});
