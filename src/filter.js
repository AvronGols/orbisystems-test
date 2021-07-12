import {map, layer1Group, layer2Group, layer3Group} from "./map";
import {gridOptionsPromise} from "./table" 
import {stopPresentation} from "./presentation"

map.on('baselayerchange', function(e) {
  document.getElementById('filter-text-box').value = "";

  const hashArray = window.location.hash.split('/');
  hashArray[4] = '';
  window.location.hash = hashArray.join('/');

  initFilter()
});

let input = document.querySelector('#filter-text-box');
input.addEventListener('input', async () => {
  
  const hashArray = window.location.hash.split('/');
  hashArray[4] = document.getElementById('filter-text-box').value;
  window.location.hash = hashArray.join('/');

  stopPresentation();

  let gridOptions = await gridOptionsPromise;
  gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);

  let activeBaseLayer = hashArray[3];
  switch (activeBaseLayer) {
    case "layer1":
      layer1MapFilter(gridOptions);
      break;
    case "layer2":
      layer2MapFilter(gridOptions);
      break;
    case "layer3":
      layer3MapFilter(gridOptions);
      break;
  }
})

async function initFilter() {
  let gridOptions = await gridOptionsPromise;

  const hashArray = window.location.hash.split('/');
  let filter = hashArray[3];
	if (filter != null) {

		document.getElementById('filter-text-box').value = decodeURI(hashArray[4]);
		gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);

    let activeBaseLayer = hashArray[3];
    switch (activeBaseLayer) {
      case "layer1":
        layer1MapFilter(gridOptions);
        break;
      case "layer2":
        layer2MapFilter(gridOptions);
        break;
      case "layer3":
        layer3MapFilter(gridOptions);
        break;
    }
	}
};
initFilter();

function layer1MapFilter(gridOptions) {
  layer1Group.clearLayers(); 
  gridOptions.api.forEachNodeAfterFilter(node => {
    layer1Group.addLayer(
      L.circleMarker([node.data.lat, node.data.lng]).bindPopup(
        `<b>${node.data.name}</b><br/>${node.data.adres}`
      )
    );
  });
}

function layer2MapFilter(gridOptions) {
  layer2Group.clearLayers(); 
  gridOptions.api.forEachNodeAfterFilter(node => {
    layer2Group.addLayer(
      L.circleMarker([node.data.lat, node.data.lng]).bindPopup(
        `<b>${node.data.name}</b><br/>${node.data.address}`
      )
    );
  });
}

function layer3MapFilter(gridOptions) {
  layer3Group.clearLayers(); 
  gridOptions.api.forEachNodeAfterFilter(node => {
    layer3Group.addLayer(
      L.circleMarker([node.data.lat, node.data.lon]).bindPopup(
        `<b>${node.data.name_ru}<br/>(${node.data.name_en})</b>`
      )
    );
  });
}
