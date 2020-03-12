import fetch from "node-fetch";
import { keys } from "../config";
let baseUrl;

if (process.env.NODE_ENV === 'production') {
  baseUrl = keys.apiUrlProd; 
} else if (process.env.NODE_ENV === 'development') {
  baseUrl = keys.apiUrlProd; // REACT_APP_ACK_URL
}

export default async function postData(
  route,
  myMethod = "POST",
  body = {}
) {
  const init = {
    // Default options are marked with *
    method: myMethod, // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    }
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  };
  if (myMethod === "POST" || myMethod === "PUT") {
    init.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(baseUrl + "/" + route, init);
    if (response.status !== 200) {
      console.log("error: " + response.status);
    } else {
      const json = await response.json();
      // json.status = response.status;
      // json.statusText = response.statusText;
      return json;
    }
  } catch (error) {
    throw new Error("fetch error: " + error);
  }
}
