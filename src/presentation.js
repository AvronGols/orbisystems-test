import {map, layer1Group, layer2Group, layer3Group} from "./map";

let timer;
let stopPresentationFlag = true;
let lastIndex = 0;
let play = document.querySelector(".presentation");
let image = document.querySelector(".presentation__img");
play.addEventListener("click", (e) => {
  if(!stopPresentationFlag) {
    stopPresentation();
  } else {
    stopPresentationFlag = false;
    image.src = './stop-button.svg'
    showPresentation()
  }
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
      break;
  }
  const layer = layers[lastIndex];
  const coords = layer.getLatLng();
  map.setView([coords.lat, coords.lng], 18);
  layer.togglePopup();
  lastIndex += 1;
  if (lastIndex == layers.length) {
    lastIndex = 0;
  }
  if (!stopPresentationFlag) {
    timer = setTimeout(() => showPresentation(), 1000);
  }
}

export function stopPresentation() {
  clearTimeout(timer);
  lastIndex = 0;
  stopPresentationFlag = true;
  image.src = './play.svg';
}
