import {map, layer1Group, layer2Group, layer3Group} from "./init_map";
import {layer1DataPromise, layer2DataPromise, layer3DataPromise} from "./load_data";

export let gridOptionsPromise;

map.on('baselayerchange', function(e) {
  const eGridDiv = document.getElementById('grid');
  while (eGridDiv.firstChild) {
    eGridDiv.removeChild(eGridDiv.lastChild);
  }
  switch(e.name) {
    case 'layer1':
      gridOptionsPromise = renderLayer1Table();
      break;
    case 'layer2':
      gridOptionsPromise = renderLayer2Table();
      break;
    case 'layer3':
      gridOptionsPromise = renderLayer3Table();
      break;
  }
});
  
switch(localStorage.getItem("activeBaseLayer")) {
  case 'layer1':
    gridOptionsPromise = renderLayer1Table();
    break;
  case 'layer2':
    gridOptionsPromise = renderLayer2Table();
    break;
  case 'layer3':
    gridOptionsPromise = renderLayer3Table();
    break;
}

// js-layer1.json
async function renderLayer1Table() {

  let data = await layer1DataPromise;
  let props = Object.keys(data[0].properties);
  let columnDefs = [];
  let rowData = [];

  props.forEach(p => {
    let a = {field: `${p}`};
    columnDefs.push(a);
  })
  columnDefs.push({field: 'lat'});
  columnDefs.push({field: 'lng'});

  data.forEach(d => {
    let latLng = {
      lat: `${d.geometry.coordinates[0]}`,
      lng: `${d.geometry.coordinates[1]}`
    };
    latLng = Object.assign(latLng, d.properties)
    rowData.push(latLng);
  })

  const eGridDiv = document.querySelector('#grid');
  const gridOptions = {
    defaultColDef: { resizable: true },
    columnDefs: columnDefs,
    rowData: rowData,
    onRowClicked: function(e) {
      layer1Group.eachLayer((layer) => {
        const coords = layer.getLatLng()
        if (coords.lat == e.data.lat && coords.lng == e.data.lng) {
          layer.openPopup()
          map.setView([e.data.lat, e.data.lng], 18)
        }
      })
    }
  };

  new agGrid.Grid(eGridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();

  return new Promise((resolve) => resolve(gridOptions));
}

// bars.geojson
async function renderLayer2Table() {

  let data = await layer2DataPromise;
  let props = Object.keys(data[0].properties);
  let columnDefs = [];
  let rowData = [];

  props.forEach(p => {
    let a = {field: `${p}`};
    columnDefs.push(a);
  })
  columnDefs.push({field: 'lat'});
  columnDefs.push({field: 'lng'});

  data.forEach(d => {
    let latLng = {
      lat: `${d.geometry.coordinates[0]}`,
      lng: `${d.geometry.coordinates[1]}`
    };
    latLng = Object.assign(latLng, d.properties)
    rowData.push(latLng);
  })

  const eGridDiv = document.querySelector('#grid');
  const gridOptions = {
    defaultColDef: { resizable: true },
    columnDefs: columnDefs,
    rowData: rowData,
    onRowClicked: function(e) {
      layer2Group.eachLayer((layer) => {
          const coords = layer.getLatLng()
          if (coords.lat == e.data.lat && coords.lng == e.data.lng) {
            layer.openPopup()
            map.setView([e.data.lat, e.data.lng], 18)
          }
        })
      }
  };
  new agGrid.Grid(eGridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
  
  return new Promise((resolve) => resolve(gridOptions));
}

// portals.csv
async function renderLayer3Table() {

  let data = await layer3DataPromise;
  let columnDefs = [];
  let rowData = [];

  columnDefs.push({field: 'name_en'});
  columnDefs.push({field: 'name_ru'});
  columnDefs.push({field: 'escalator'});
  columnDefs.push({field: 'lat'});
  columnDefs.push({field: 'lon'});
  columnDefs.push({field: 'min_rail_width'});

  data.forEach(data => {
    rowData.push(data);
  })

  const eGridDiv = document.querySelector('#grid');
  const gridOptions = {
    defaultColDef: { resizable: true },
    columnDefs: columnDefs,
    rowData: rowData,
    onRowClicked: function(e) {
        console.log(e);
        layer3Group.eachLayer((layer) => {
          const coords = layer.getLatLng()
          if (coords.lat == e.data.lat && coords.lng == e.data.lon) {
            layer.openPopup()
            map.setView([e.data.lat, e.data.lon], 18)
          }
        })
      }
  };
  new agGrid.Grid(eGridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
  
  return new Promise((resolve) => resolve(gridOptions));
}