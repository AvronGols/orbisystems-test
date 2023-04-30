import {layer1DataPromise, layer2DataPromise, layer3DataPromise} from "./load_data";
import {stopPresentation} from "./presentation"

export const map = L.map("mapid", {preferCanvas: true});
export const layerControl = L.control.layers().addTo(map);
export const layer1Group = L.layerGroup();
export const layer2Group = L.layerGroup();
export const layer3Group = L.layerGroup();

L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 256
  }
).addTo(map);

let centerLat = 53.330872983017066;
let centerLng = 49.52911376953125;
let zoom = 9;
let activeBaseLayer = 'layer1';
let filter = '';

if (window.location.hash) {
  const hashArray = window.location.hash.split('/');
  centerLat = hashArray[0].slice(1);
  centerLng = hashArray[1];
  zoom = hashArray[2];
  activeBaseLayer = hashArray[3];
  filter = hashArray[4];
}
window.location.hash = `${centerLat}/${centerLng}/${zoom}/${activeBaseLayer}/${filter}`;
map.setView([centerLat, centerLng], zoom);


map.on("moveend", function(e) {
  const hashArray = window.location.hash.split('/');
  filter = hashArray[4];
  centerLat = map.getCenter().lat;
  centerLng = map.getCenter().lng;
  zoom = map.getZoom();
  window.location.hash = `${centerLat}/${centerLng}/${zoom}/${activeBaseLayer}/${filter}`;
});

map.on("baselayerchange", function(e) {

  const hashArray = window.location.hash.split('/');
  hashArray[3] = e.name;
  activeBaseLayer = e.name;
  window.location.hash = hashArray.join('/');

  let layers = [] 
  switch(e.name) {
    case 'layer1':
      layer1Group.eachLayer(layer => layers.push(layer));
      break;
    case 'layer2':
      layer2Group.eachLayer(layer => layers.push(layer));
      break;
    case 'layer3':
      layer3Group.eachLayer(layer => layers.push(layer));
      break;
  }

  if (layers.length != 0) {
    let group = L.featureGroup(layers);
    map.fitBounds(group.getBounds());
  }

  stopPresentation();
});

// js-layer1.json
async function initLayer1Group() {

  let data = await layer1DataPromise;

  data.forEach((f) => {
    layer1Group.addLayer(
      L.circleMarker(f.geometry.coordinates.reverse()).bindPopup(
        `<b>${f.properties.name}</b><br/>${f.properties.adres}`
      )
    );
  });

  if (activeBaseLayer == "layer1") {
    layer1Group.addTo(map);
  }

  layerControl.addBaseLayer(layer1Group, "layer1");
}

// bars.geojson
async function initLayer2Group() {

  let data = await layer2DataPromise;

  data.forEach((f) => {
    layer2Group.addLayer(
      L.circleMarker(f.geometry.coordinates.reverse()).bindPopup(
        `<b>${f.properties.name}</b><br/>${f.properties.address}`
      )
    );
  });

  if (activeBaseLayer == "layer2") {
    layer2Group.addTo(map);
  }

  layerControl.addBaseLayer(layer2Group, "layer2");
}

// portals.csv
async function initLayer3Group() {

  let data = await layer3DataPromise;

  data.forEach((d) => {
    layer3Group.addLayer(
      L.circleMarker([d.lat, d.lon]).bindPopup(
        `<b>${d.name_ru}<br/>(${d.name_en})</b>`
      )
    );
  });

  if (activeBaseLayer == "layer3") {
    layer3Group.addTo(map);
  }

  layerControl.addBaseLayer(layer3Group, "layer3");
}

async function initAllLayers() {
  await initLayer1Group();
  await initLayer2Group();
  await initLayer3Group();
}
initAllLayers();
