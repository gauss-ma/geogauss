// GEOGAUSS
window.onload = init;

function init(){

	//defino mi objeto mapa:
	const map= new ol.Map({
		view: new ol.View({
			center: [-6506378.847634198, -4109288.640611073],
			zoom:5,
			maxZoom:8,
			minZoom:4,
			rotation:0,
			//proyection:  ,  // Acá setear proyección a usar!

		}),
		//layers:[
		//	new ol.layer.Tile({ source: new ol.source.OSM() })
		//],
		target: 'js-map'
	});
	
	
	//Layers:
	const openStreetMapStandard = new ol.layer.Tile({
		source: new ol.source.OSM(),
		visible:true,
		title: 'OSMStandard'
	});

	const openStreetMapHumanitarian = new ol.layer.Tile({
		source: new ol.source.OSM({
			url: 'http://{a-c}.title.openstreetmap.fr/hot/{z}/{x}/{y}.png'
		}),
		visible:true,
		title: 'OSMHumanitarian'
	});

	const stamenTerrain = new ol.layer.Tile({
		source: new ol.source.XYZ({
	  		url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
	  		attributions: 'Map tiles by <a href:"http://stamen.com">Stamen Design</a>'
	  	}),                                                                    	
	  	visible: false,
	  	title: 'StamenTerrain'                                               	
	});     
         
	//Layer group:
	const baseLayerGroup = new ol.layer.Group({
		layers:[
		openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain
		]
	});
        
	map.addLayer(openStreetMapStandard);                                                      	
	//que me muestre las coords cada vez que hago click.
	map.on('click', function(e){

		console.log(e.coordinate);

	});

}



