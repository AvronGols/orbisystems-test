import {map, layer1Group, layer2Group, layer3Group} from "./map";

let lastIndex = 0;
let play = document.querySelector(".presentation");
play.addEventListener("click", (e) => {
  lastIndex = 0;
  showPresentation();
});

function showPresentation() {
  const layers = [];
  let tableName = localStorage.getItem("activeBaseLayer");
  switch (tableName) {
    case "layer1":
      layer1Group.eachLayer((layer) => layers.push(layer));
      break;
    case "layer2":
      layer2Group.eachLayer((layer) => layers.push(layer));
      break;
    case "layer3":
      layer3Group.eachLayer((layer) => layers.push(layer));
  }
  const layer = layers[lastIndex];
  const coords = layer.getLatLng();
  map.setView([coords.lat, coords.lng], 18);
  layer.togglePopup();
  lastIndex += 1;
  if (lastIndex == layers.length) {
    lastIndex = 0;
  }
  setTimeout(() => showPresentation(), 1000);
}
