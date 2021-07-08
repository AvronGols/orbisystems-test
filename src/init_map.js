import {getLayer1Data, getLayer2Data, getLayer3Data} from "./load_data";

export let map = L.map("mapid", {preferCanvas: true});
export let layerControl = L.control.layers().addTo(map);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

let centerLat = localStorage.getItem("centerLat");
let centerLng = localStorage.getItem("centerLng");
let zoom = localStorage.getItem("zoom");

if (centerLat != null && centerLng != null && zoom != null) {
  map.setView([centerLat, centerLng], zoom);
} else {
  map.setView([51.505, -0.09], 12);
}

map.on("moveend", function(e) {
  localStorage.setItem("centerLat", map.getCenter().lat);
  localStorage.setItem("centerLng", map.getCenter().lng);
  localStorage.setItem("zoom", map.getZoom());
});

map.on("baselayerchange", function(e) {
  localStorage.setItem("activeBaseLayer", e.name);
});


// js-layer1.json
async function renderLayer1Group() {

  let layer1Group = L.layerGroup();
  let data = await getLayer1Data();

  data.forEach((f) => {
    layer1Group.addLayer(
      L.circleMarker(f.geometry.coordinates).bindPopup(
        `<b>${f.properties.name}</b><br/>${f.properties.adres}`
      )
    );
  });

  if (localStorage.getItem("activeBaseLayer") == "layer1") {
    layer1Group.addTo(map);
  }

  layerControl.addBaseLayer(layer1Group, "layer1");
}
renderLayer1Group();


// bars.geojson
async function renderLayer2Group() {

  let layer2Group = L.layerGroup();
  let data = await getLayer2Data();

  data.forEach((f) => {
    layer2Group.addLayer(
      L.circleMarker(f.geometry.coordinates.reverse()).bindPopup(
        `<b>${f.properties.name}</b><br/>${f.properties.address}`
      )
    );
  });

  if (localStorage.getItem("activeBaseLayer") == "layer2") {
    layer2Group.addTo(map);
  }

  layerControl.addBaseLayer(layer2Group, "layer2");
}
renderLayer2Group();


// portals.csv
async function renderLayer3Group() {

  let layer3Group = L.layerGroup();
  let data = await getLayer3Data();

  data.forEach((d) => {
    layer3Group.addLayer(
      L.circleMarker([d.lat, d.lon]).bindPopup(
        `<b>${d.name_ru}<br/>(${d.name_en})</b>`
      )
    );
  });

  if (localStorage.getItem("activeBaseLayer") == "layer3") {
    layer3Group.addTo(map);
  }

  layerControl.addBaseLayer(layer3Group, "layer3");
}
renderLayer3Group();
