import fetch from "node-fetch";
jest.mock("node-fetch");

import postData from "./fetch";

const testData = {
  graph_hopper: {
    id: 1,
    currentLevel: 1,
    logs: [
      {
        levelId: 1, 
        attempt: 1, 
        logTime: '2020-03-01 12:00:00',
        startTime: '2020-03-01 12:00:00',
        endTime: '2020-03-01 12:00:00',
        attemptSuccess: false,
        attemptScore: 50,
        changesToCode: 1,
        initialCodeBlocks: [],
        finalCodeBlocks: []
      },
      {
        levelId: 1, 
        attempt: 2, 
        logTime: '2020-03-02 12:00:00',
        startTime: '2020-03-02 12:00:00',
        endTime: '2020-03-02 12:00:00',
        attemptSuccess: true,
        attemptScore: 100,
        changesToCode: 2,
        initialCodeBlocks: [],
        finalCodeBlocks: []
      }
    ] 
  },
  ester_lavista: {
    id: 1,
    currentLevel: 2,
    logs: [
      {
        levelId: 1, 
        attempt: 1, 
        logTime: '2020-03-01 12:00:00',
        startTime: '2020-03-01 12:00:00',
        endTime: '2020-03-01 12:00:00',
        attemptSuccess: false,
        attemptScore: 50,
        changesToCode: 1,
        initialCodeBlocks: [],
        finalCodeBlocks: []
      }
    ]
  }
};

describe.only("mock fetch", () => {
  let db = {};
  beforeEach(() => {
    db = testData;

    function api(url, init) {
      const route = url.split(process.env.REACT_APP_ACK_URL + "/")[1];
      const segments = route.split("/");
      const category = segments[0];
      const item = segments[segments.length - 1];
      const body = init.body ? JSON.parse(init.body) : {};
      let result = {};
      switch (init.method) {
        case "GET":
          if (!db[item]) {
            result = { message: "not found" };
          } else {
            result[item] = db[item];
          }
          break;
        case "POST":
          db[item] = body;
          result[item] = db[item];
          break;
        case "PUT":
          db[item] = body;
          result[item] = db[item];
          break;
        case "DELETE":
          if (!db[item]) {
            result = { message: "not found" };
          } else {
            delete db[item];
            result = { message: "deleted" };
          }
          break;
        default:
          result = { message: "fetch resolved" };
      }
      return result;
    }

    fetch.mockImplementation((url, init) => {
      return new Promise((resolve, reject) => {
        const result = api(url, init);
        resolve({
          status: 200,
          statusText: "ok",
          json: function() {
            return new Promise((resolve, reject) => {
              resolve(result);
            });
          }
        });
      });
    });
  });

  afterEach(() => {
    db = {};
  });

  test("postData", async function() {
    let response = await postData("myroute", "myMethod", "myBody");
    expect(response).toEqual({ message: "fetch resolved" });
  });

  test("get user", async () => {
    let route = "user/graph_hopper";
    let method = "GET";
    let response = await postData(route, method);
    expect(response).toEqual({ graph_hopper: testData.graph_hopper });
  });

  test("post user", async () => {
    let route = "user/ester_lavista";
    let method = "POST";
    let body = testData.ester_lavista;
    let response = await postData(route, method, body);
    expect(response).toEqual({ ester_lavista: testData.ester_lavista });

    method = "GET";
    response = await postData(route, method);
    expect(response).toEqual({ ester_lavista: testData.ester_lavista });
  });

  test("put user", async () => {
    let route = "user/ester_lavista";
    let method = "PUT";
    let body = testData.ester_lavista;
    let response = await postData(route, method, body);
    expect(response).toEqual({ ester_lavista: testData.ester_lavista });

    body = testData.graph_hopper;
    response = await postData(route, method, body);
    expect(response).toEqual({ ester_lavista: testData.graph_hopper });
  });

  test("delete user", async () => {
    let route = "user/ester_lavista";
    let method = "DELETE";
    let response = await postData(route, method);
    expect(response).toEqual({ message: "deleted" });

    method = "GET";
    response = await postData(route, method);
    expect(response).toEqual({ message: "not found" });
  });
});

describe("real fetch", () => {
  let db = {};
  beforeEach(() => {
    db = testData;
  });

  afterEach(() => {
    db = {};
  });

  test("postData", async function() {
    let response = await postData("myroute", "myMethod", "myBody");
    expect(response).toEqual({ message: "fetch resolved" });
  });

  test("get user", async () => {
    let route = "user/graph_hopper";
    let method = "GET";
    let response = await postData(route, method);
    expect(response).toEqual({ graph_hopper: testData.graph_hopper });
  });

  test("post user", async () => {
    let route = "user/ester_lavista";
    let method = "POST";
    let body = testData.ester_lavista;
    let response = await postData(route, method, body);
    expect(response).toEqual({ ester_lavista: testData.ester_lavista });

    method = "GET";
    response = await postData(route, method);
    expect(response).toEqual({ ester_lavista: testData.ester_lavista });
  });

  test("put user", async () => {
    let route = "user/ester_lavista";
    let method = "PUT";
    let body = testData.ester_lavista;
    let response = await postData(route, method, body);
    expect(response).toEqual({ ester_lavista: testData.ester_lavista });

    body = testData.graph_hopper;
    response = await postData(route, method, body);
    expect(response).toEqual({ ester_lavista: testData.graph_hopper });
  });

  test("delete user", async () => {
    let route = "user/ester_lavista";
    let method = "DELETE";
    let response = await postData(route, method);
    expect(response).toEqual({ message: "deleted" });

    method = "GET";
    response = await postData(route, method);
    expect(response).toEqual({ message: "not found" });
  });
});