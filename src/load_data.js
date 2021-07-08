import axios from "axios";

// js-layer1.json
export async function getLayer1Data() {
  return new Promise((resolve) => {
    axios.get("js-layer1.json").then((response) => {
      console.log(response.data.features);
      resolve(response.data.features);
    });
  });
}

// bars.geojson
export async function getLayer2Data() {
  return new Promise((resolve) => {
    axios.get("bars.geojson").then((response) => {
      console.log(response.data.features);
      resolve(response.data.features);
    });
  });
}

// portals.csv
export async function getLayer3Data() {

  return new Promise((resolve) => {
    axios({
      url: "portals.csv",
      method: "GET",
      responseType: "text",
    }).then((response) => {
      let data = CSVToJSON(response.data);
      console.log(data);
      resolve(data);
    });
  });
}

function CSVToJSON(data) {
  let delimiter =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
  let titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  return data
    .slice(data.indexOf("\n") + 1)
    .split("\n")
    .map(function (v) {
      let values = v.split(delimiter);
      return titles.reduce(function (obj, title, index) {
        return (obj[title] = values[index]), obj;
      }, {});
    });
}
