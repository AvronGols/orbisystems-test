import {map} from "./init_map";
import {layer1DataPromise, layer2DataPromise, layer3DataPromise} from "./load_data";

map.on('baselayerchange', function(e) {
    const eGridDiv = document.getElementById('grid');
    while (eGridDiv.firstChild) {
      eGridDiv.removeChild(eGridDiv.lastChild);
    }

    switch(e.name) {
      case 'layer1':
        renderLayer1Table();
        break;
      case 'layer2':
        renderLayer2Table();
        break;
      case 'layer3':
        renderLayer3Table();
        break;
    }
  });
  
  switch(localStorage.getItem("activeBaseLayer")) {
    case 'layer1':
      renderLayer1Table();
      break;
    case 'layer2':
      renderLayer2Table();
      break;
    case 'layer3':
      renderLayer3Table();
      break;
  }

async function renderLayer1Table() {

  let data = await layer1DataPromise;
  let props = Object.keys(data[0].properties);
  let columnDefs = [];
  let rowData = [];

  props = Object.keys(data[0].properties);

  props.forEach(p => {
    let a = {field: `${p}`};
    columnDefs.push(a);
  })

  data.forEach(data => {
    rowData.push(data.properties);
  })

  const eGridDiv = document.querySelector('#grid');
  const gridOptions = {
    defaultColDef: {
        resizable: true,
    },
    columnDefs: columnDefs,
    rowData: rowData
  };
  new agGrid.Grid(eGridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
}

async function renderLayer2Table() {

  let data = await layer2DataPromise;
  let props = Object.keys(data[0].properties);
  let columnDefs = [];
  let rowData = [];

  props = Object.keys(data[0].properties);

  props.forEach(p => {
    let a = {field: `${p}`};
    columnDefs.push(a);
  })

  data.forEach(data => {
    rowData.push(data.properties);
  })

  const eGridDiv = document.querySelector('#grid');
  const gridOptions = {
    defaultColDef: {
        resizable: true,
    },
    columnDefs: columnDefs,
    rowData: rowData
  };
  new agGrid.Grid(eGridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
}

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
    defaultColDef: {
        resizable: true,
    },
    columnDefs: columnDefs,
    rowData: rowData
  };
  new agGrid.Grid(eGridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
}