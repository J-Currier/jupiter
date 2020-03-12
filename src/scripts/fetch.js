import fetch from "node-fetch";
import { keys } from "../config";
let baseUrl;
if (process.env.NODE_ENV === "production") {
  baseUrl = keys.apiUrlProd;
} else if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  baseUrl = keys.apiUrlDev;
}

async function postData(route, method = "POST", body = {}) {
  const init = {
    // Default options are marked with *
    method: method, // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    }
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  };
  if (method === "POST" || method === "PUT") {
    init.body = JSON.stringify(body);
  }
  // try {
    const response = await fetch(baseUrl + "/" + route, init);
    if (response.status !== 200) {
      console.log(`${route} ${method} status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  // } catch (error) {
    // throw new Error(`${route} ${method} fetch error: ${error}`);
  // }
}

async function tokenInfo(idToken) {
  // try {
    const response = await fetch(
      "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken, 
      {
      method: "GET",
      headers: {"Content-Type": "application/json"}
      }
    );
    if (response.status !== 200) {
      console.log("tokeninfo status: " + response.status);
    } else {
      const json = await response.json();
      return json;
    }
  // } catch (error) {
  //   throw new Error("tokeninfo fetch error: " + error);
  // }
}

export { postData, tokenInfo };
