// import postData from "./fetch";

const url = process.env.REACT_APP_ACK_URL;



describe('example', () => {

  let json;
  let result;
  let endpoint;
  let body;
  let testUsers = [
    {
      userName: "hopper",
      userInfo: {
        id: 1,
        currentLevel: 2,
        logs: [
          {
            levelId: 1, 
            attempt: 1, 
            logTime: '2020-03-01 12:00:00',
            startTime: '2020-03-01 12:00:00',
            endTime: '2020-03-01 12:00:00',
            attemptSuccess: true,
            attemptScore: 100,
            changesToCode: 1, // to be defined
            initialCodeBlocks: [],
            finalCodeBlocks: []
          }
        ] 
      }
    }
  ];

  async function ack(
    param1, endpoint, myMethod, data = {}
  ) {
    let url = process.env.REACT_APP_ACK_URL
    testUsers = data;
    const options = {
      // Default options are marked with *
      method: myMethod, // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      // redirect: "follow", // manual, *follow, error
      // referrer: "no-referrer", // no-referrer, *client
    };
    if (myMethod==='POST') {
      options.body = JSON.stringify(data);

    };

    const response = await fetch(url + "/" + endpoint, options)
    const json =  response.json();
    json.status = response.status;
    json.statusText = response.statusText;
    return json;
  }
  
  
  beforeEach(function() {

    global.fetch = jest.fn().mockImplementation(() => {
        var p = new Promise((resolve, reject) => {
          resolve({
            ok: true, 
            Id: '123', 
            json: function() { 
              return {testUsers}
            }
          });
        });

        return p;
    });

  });


  it("ack", async function() {
    const response = await ack('foo', 'bar', "GET", [{'test user': 'me'}]);
    console.log(response);
    // expect(response.Id).toBe("123"); 
  });

  test("get users", async () => {
    endpoint = "users";
    const response = await ack('foo', endpoint, "GET",   [{'test user': 'me'}]);
    expect(response.testUsers[0]["test user"]).toBe("me"); 
    // expect(json.status).toEqual(200);
    // expect(json.length).toBe(0);
    // expect(json).toEqual(testUsers);
  });

  test("post users", async () => {
    endpoint = "users";
    const response = await ack('foo', endpoint, "POST", [{'test user': 'me'}]);
    console.log(response, 'response')
    expect(response.testUsers[0]["test user"]).toBe("me"); 
    // expect(json.status).toEqual(200);
    // expect(json.length).toBe(0);
    // expect(json).toEqual(testUsers);
  });

  async function postData(
    url, endpoint, myMethod="POST", data = {}
  ) {
    const options = {
      // Default options are marked with *
      method: myMethod, // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      // redirect: "follow", // manual, *follow, error
      // referrer: "no-referrer", // no-referrer, *client
    };
    if (myMethod==='POST') {
      options.body = JSON.stringify(data);
    };
    const response = await fetch(url + "/" + endpoint, options)
    const json = await response.json();
    json.status = response.status;
    json.statusText = response.statusText;
    return json;
  }

  test("get users postData", async () => {
    endpoint = "users";
    const response = await postData(process.env.REACT_APP_ACK_URL, endpoint, "GET",   [{'test user': 'me'}]);
    expect(response.testUsers[0]["test user"]).toBe("me"); 
    // expect(json.status).toEqual(200);
    // expect(json.length).toBe(0);
    // expect(json).toEqual(testUsers);
  });

  test("post users postData", async () => {
    endpoint = "users";
    const response = await postData(process.env.REACT_APP_ACK_URL, endpoint, "POST", [{'test user': 'me'}]);
    console.log(response, 'response')
    expect(response.testUsers[0]["test user"]).toBe("me"); 
    // expect(json.status).toEqual(200);
    // expect(json.length).toBe(0);
    // expect(json).toEqual(testUsers);
  });


})