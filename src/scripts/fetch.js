import fetch from 'node-fetch'

export default async function postData(
  url, endpoint, method="POST", data = {}
) {
  const options = {
    // Default options are marked with *
    method: method, // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  };
  if (method==='POST') {
    options.body = JSON.stringify(data);
  };
  const response = await fetch(url + endpoint, options)
  const json = await response.json();
  json.status = response.status;
  json.statusText = response.statusText;
  return json;
}
