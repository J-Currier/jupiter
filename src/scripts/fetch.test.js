// import postData from "./fetch";
const postData = jest.fn();

const url = "http://localhost:5000/";

describe("fetch routes", () => {

  let json;
  let result;
  let endpoint;
  let body;
  const testUsers = [
    {
      userName: "hopper",
      userInfo: {
        id: 1,
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

  test("get users", async () => {
    endpoint = "users";
    json = await postData(url, endpoint, "GET");
    // expect(json.status).toEqual(200);
    // expect(json.length).toBe(0);
    // expect(json).toEqual(testUsers);
  });

  test("add user", async () => {
    endpoint = "user/" + testUsers[0].userName;
    body = testUsers[0].userInfo;

    json = await postData(url, endpoint, "POST", body);
    // expect(json.status).toEqual(200);
    // expect(json).toEqual("User added.");
  });

  test("get user info", async () => {
    endpoint = "user/" + testUsers[0].userName;
    body = testUsers[0].userInfo;
    json = await postData(url, endpoint, "POST", body);
    // expect(json.status).toEqual(200);
    // expect(json).toEqual("User added.");

    json = await postData(url, endpoint, "GET");
    // expect(json.status).toEqual(200);
    // result = testUsers[0].userInfo;
    // expect(json).toEqual(result);
  });

  test("add user log, get user logs", async () => {
    endpoint = "user/" + testUsers[0].userName;
    body = testUsers[0].userInfo;
    json = await postData(url, endpoint, "POST", body);
    // expect(json.status).toEqual(200);
    // expect(json).toEqual("User added.");

    endpoint = `user/${testUsers[0].userName}/log`;
    body = testUsers[0].userInfo.logs[0];
    json = await postData(url, endpoint, "POST", body);
    // expect(json.status).toEqual(200);
    // expect(json).toEqual("Log added.")

    endpoint = `user/${testUsers[0].userName}/logs`;
    json = await postData(url, endpoint, "GET");
    // expect(json.status).toEqual(200);
    // expect(json.length).toBe(1);
    // result = testUsers[0].userInfo.logs;
    // expect(json).toEqual(result);

    // total logs of all users
    endpoint = "logs" 
    json = await postData(url, endpoint, "GET");
    // expect(json.status).toEqual(200);
    // expect(json.length).toBe(1);
    // result = testUsers[0].userInfo.logs;
    // expect(json).toEqual(result)
  });

  test("delete user", async () => {
    endpoint = "user/" + testUsers[0].userName;
    body = testUsers[0].userInfo;
    json = await postData(url, endpoint, "POST", body);
    // expect(json.status).toEqual(200);
    // expect(json).toEqual("User added.");

    json = await postData(url, endpoint, "DELETE");
    // expect(json.status).toEqual(200);
    // expect(json).toEqual("User deleted.");
  });
});
