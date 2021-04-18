//Inicializacion:
//
$("#sidebar").hide()

// SCRIPT LEAFLET:
//var mymap = L.map('mapid').setView([51.505, -0.09], 13);
 
//CREACION DE MAPA:
var mymap = L.map('mapid', {
	zoomControl:true, maxZoom:20, minZoom:1
	}).setView([-34.91,-57.95], 12);

//Agregar NORTE:
var north = L.control({position: "bottomleft"});
	north.onAdd = function(map) {
var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img style="width:35px;" src="markers/north-arrow.svg"/>';
    return div;
}
north.addTo(mymap);



//LEAFLET CONTROL BUTTONS:
L.EditControl = L.Control.extend({
  options: {
    position: 'topleft',
    callback: null,
    kind: '',
    html: ''
  },
	
  onAdd: function(mymap) {
  var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
    link = L.DomUtil.create('a', '', container);
  link.href = '#';
  link.title = 'Create a new ' + this.options.kind;
  link.innerHTML = this.options.html;
  L.DomEvent.on(link, 'click', L.DomEvent.stop)
    .on(link, 'click', function() {
      window.LAYER = this.options.callback.call(mymap.editTools);
    }, this);

  return container;
  }
	
});
	
L.NewLineControl = L.EditControl.extend({
  options: {
    position: 'topleft',
    //callback: mymap.editTools.startPolyline,
    kind: 'line',
    html: 'asd'
  }
});

L.NewMarkerControl = L.EditControl.extend({
  options: {
    position: 'topleft',
    //callback: mymap.editTools.startMarker, //funcion a llamar cuando click
    kind: 'marker',
    html: '🖈', 
  }

});
mymap.addControl(new L.NewMarkerControl());
mymap.addControl(new L.NewLineControl());


//CREACION DE PANE PARA BG-LAYER:
mymap.createPane('pane_GoogleMaps_0');
mymap.getPane('pane_GoogleMaps_0').style.zIndex = 400;
var layer_GoogleMaps_0 = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    pane: 'pane_GoogleMaps_0',
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19
});

//LAYER: GoogleMaps_0;
mymap.addLayer(layer_GoogleMaps_0);
mymap.attributionControl.setPrefix('Desarrollado por <a href="https://gauss-ma.com.ar/" target="_blank">GAUSS</a>. ');

//CREACION DE ICONO:
var estacionIcon = L.icon({
    iconUrl: 'markers/estacionIcon.svg',
    iconSize: [34, 34],//iconSize:     [38, 95], // size of the icon
    iconAnchor: [17,34], // point of the icon which will correspond to marker's location
    //shadowUrl: 'leaf-shadow.png',
    //shadowSize:   [50, 64], // size of the shadow
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});
let weatherIcon = L.Icon.extend({
    options: {
      iconSize:     [34, 34], // size of the icon
      iconAnchor:   [17, 17],   // point of the icon which will correspond to marker's location
      popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
    }
});
let hurricaneIcon = new weatherIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QoBAxAud5K8hAAAAVFJREFUOMulk7FqwlAUhn9LHbIZwSmIxClbwMnNsWQqTnmDvEOewM3Nl4gU2i2lUPAFhEwREUXUJUIchRT6d7ia9GpiIz3ww73n3vvBPec/FZIojP0+xnSqYjIBlktgvRZ5VQWaTcA0gecnPBYCxmNiOMRXEKB6PIqcYQD9PtDrCZCuHwAAJGVtF6TjMFEUEshk2+R2wav74vRXIopi2rb8+KTvep20LNL3eRviurkASZpGeh5zIck8FBf+ggCkYTCZhyno4VzH6ssrsNuhVMxmqH58ptsUgtUKd0UQ5ED+ERnENO97qevZWiqsYZQrrKZJhZVb7HnlOuS6LPYJCfo+aVnCXHkA2yajKL4NOX/twrmJopCOk2v9dF6SeSgsPRhItUkUhex2ydEod25IosLtgnh7F33fbIRfajWg1QLabTGxnc4BjUa9sFNX5Iv/ltEPO/n21h3V82sAAAAASUVORK5CYII='});
let stormIcon = new weatherIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QoBAxAgkCqRgwAAAXBJREFUOMudVD2LwkAUnAgWqUTBSizS2UW8K9JZhmBxZSrbFP6D/SH5E/ZCwsFJrAx4oJUgcnBoFTi0jnBzxWI+zMbiHgws+95OXubNrkYSTyMMiSgCtlvgcgGuV8AwgH4fME3gzQZIqjGfk5bFVNdJQMKySCHIICDjmDwfSZl5OJwkG3pefvAO12V62FP1wSqB61YJAP52OqTjyC6ekghRbl+FXo+cz6kmiWNZUCz2PNL3pQ7F3GCQ6VEm8f0ygWw7jyAoE/l+RtLIRrnb5WOdTADbLo/atuX+PVarbNnAf6PVUpAYRl6wWABh+Gg6uX8P08zXmSbnoxSsqIsQ8t89r5Ireqbq0qJ4dRCC9T4hwSAgHafeL65LJsnmOQmJ9LDno3NTXVcSkITGJNkAwO3689L8+gaiCFgugfUaAHDTdTRNE5hOgdlMUw1KSw97Nt8/pE9OJ3ndAaDdBoZDYDwGRqNPdLuvteNW3uK656EGf4eBNQ/xN4JwAAAAAElFTkSuQmCC'});
let depressionIcon = new weatherIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QoBAxIgohzzAQAAARlJREFUOMutlLFqwzAQhk8FF1xwqdNRW7poy+pX8ByC3kDvkFdyyJ5X8JgtUMgDSEQJ9WZD/w7CkR07AuMeHEb+pc/H3S8zADQ3XoKqMbb5PoGMsaFtbLSS3Q603xMdj/7dakW0XhNtNmywH4BPrS2UQh3HANEg6zgGlAK0tt1zfUgXIAQgJbDduifnHqgUxiFF4QFZBpQlelGWQJ77ig4HDCFSuiXnQ0AX1FYk5QNEawshuuLzaD8mxL03bsT1T0pV5Tq9XIZN0epVRc3tknqfvL5fKUmceD6HIa2eJBR9fF77I57dk8fp5Pn4dLIMIMLvYgEUBZ765O4Fzp0fJvlkhmP/5e6w4K/AGNvcLmn0FhHxLzbtFk+MP6p09GzHwZBXAAAAAElFTkSuQmCC'});
let prestormIcon = new weatherIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QoBAxU3bo7gAQAAALNJREFUOMvNU8sOwyAMc6epE9de+938BHwJfE9pSzXNO6BuoPKY1h0WKZfEcQyGjiTOxgU/iDeJtYTWhJuLYL9tgNaEtal8kiGVIseRlJKvWpSr96CUAaNUgjmAHsNASsnV+5So0jtsjME58pxK5IrJUE1djSTevglRVLBn1uJb3wMA7suCqxBtj2sqvj/ObmM89OnF1ixu2Z99bCXZzcdGY0JzckUXOLmwzJiEpPvDX3winqe9C5rOnaU+AAAAAElFTkSuQmCC'});
let poststormIcon = new weatherIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QoBAxYc6R9KggAAAWdJREFUOMutUz1PwlAUPSUppBBCYGDpBFM3/oD+BgaGzixv073RUcOu6cJPaMKo4W+wmZiUuR0KBGpoGY7Ds69URFS8yc3Lux/n3XfPvRpJnCulY44kTYEwjHavL0QYRkmaHgXRDiqJ34DnJ2IyAWaz3N7rAcMhcHGpoVYt5pDMNQgiCsHUMEjgQFPDIIUggyDaz8sBNjEKAKZJ2jbpOPI0zRxQCHITfwHieQogNQzSdVkQ1y36PY8FkG2SgLZdrMCyskByOpX3j4pSwyBtm9sk2askCCJalrzaNrmJydFIJgohT8eR9uwxy1K9KQHAbhU1Vae7XaBWBa6uJSPjMdDpADe30t7tqtAsrwQAeqO1UB7flzQ/PkiKhQDmc+D+Ttp9X4XqVT2n+Lc9Ud/+d3aUCpHPwuc5yRr/7ZycMbGnd2e9Bup1ydRggKTf1yrl8okF3NviynIZ7VZRU2+0Fmi3Wz/f4j/IO6YU957m4lBDAAAAAElFTkSuQmCC'})
let goodIcon = new weatherIcon({iconUrl: 'markers/Icon-good.svg'})
let satiIcon = new weatherIcon({iconUrl: 'markers/Icon-satisfactory.svg'})
let modeIcon = new weatherIcon({iconUrl: 'markers/Icon-moderate.svg'})
let poorIcon = new weatherIcon({iconUrl: 'markers/Icon-poor.svg'})
let vpoorIcon = new weatherIcon({iconUrl: 'markers/Icon-vpoor.svg'})
let severIcon = new weatherIcon({iconUrl: 'markers/Icon-severe.svg'})

function hacerIconNumber(n,clase){
	return L.divIcon({  
		className: "number-icon "+clase, 
		iconSize: [40, 40],
		iconAnchor: [10, 44],
		popupAnchor: [3, -40],
		html: "<span>"+n+"</span>"
	});
};

//CREACION DE MARCADORES:
//var marker = L.marker([-34.80, -57.78]).addTo(mymap);
//	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//L.marker([-34.83,-58.2], {icon: estacionIcon}).addTo(mymap);

//geoJSON:
//var my_geoJSON_style = {
//        rotationAngle: 0.0,
//        rotationOrigin: 'center center',
//        icon: estacionIcon,
//        interactive: true,
//};

//L.geoJSON(json_AQSTAT_1,{icon : estacionIcon}).addTo(mymap);

//CREACION DE PANE, para capa vectorial:
mymap.createPane('pane_Puntos');
mymap.getPane('pane_Puntos').style.zIndex = 401;
mymap.getPane('pane_Puntos').style['mix-blend-mode'] = 'normal';

	//Creo layer de puntos desde geoJSON
	
		//FUNCION A APLICAR A CADA PUNTOS DEL GEOJSON:
		function pop_Puntos(feature, layer) {
		            layer.on({
				click: function(e){
				    console.log("CLICK en "+feature.properties['ID']+"!");
				    $("#sidebar").empty();
				    mymap.setView(e.target.getLatLng(),13);

				var info= makeAQIdiv(feature.properties['AQI']);
				info+=makeMeteoIcons(feature.properties['TEMP'],feature.properties['RHUM'],feature.properties['WSPD'],feature.properties['WDIR'],);
				info+=makePollutsIndicatorBars();
				info+='</div> <div id="plot-container"></div>';
	
				$("#sidebar").append(info);
				plotTimeSerie();
				addProgressBar(feature.properties['AQI'],feature.properties['NO2'],feature.properties['PM10'],feature.properties['PM25'],feature.properties['SO2'],feature.properties['CO']);
				
				$("#sidebar").show();

				 },
		                 //si saco mouse sobre objeto:
		                 mouseout: function(e) {
		                //     for (i in e.target._eventParents) {
		                //         e.target._eventParents[i].resetStyle(e.target);
		                //     }
		                 },
		                 //si apoyo mouse sobre objeto:
		                 mouseover: function(e) {
		                //         if (e.target.feature.geometry.type === 'LineString') {
		                //             e.target.setStyle({
		                //             color: '#ffff00',
		                //           });
		                //         } else {
		                 	     console.log(e.target.feature.geometry.type);
				//           console.log(e.target.feature.geometry.type);
		                //           e.target.setStyle({
		                //             fillColor: '#ffff00',
		                //             fillOpacity: 1,
		                //                 iconSize:50,
		                //           });
		                //         }
		                },
		            });
		
		//Contenido del popUP:
		var popupContent = 'Estación: <br><center><strong>'+ (feature.properties['ID'] !== null ? feature.properties['ID'].toLocaleString() : '')+'</strong></center>';
// <tr><th scope="row">fid   </th><td>'+ (feature.properties['fid']   !== null ? feature.properties['fid'].toLocaleString()   : '')+'</td></tr>\
		layer.bindPopup(popupContent, {maxHeight: 400,maxWidth:1900});
		}

//Cargar layer de marker-cluster
var layer_Puntos = new L.geoJson(json_AQSTAT_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_AQSTAT_1',
    layerName: 'layer_Puntos',
    pane: 'pane_Puntos',
    onEachFeature: pop_Puntos,				//esta funcion se aplica a cada feature (sirve para generar eventos).
    pointToLayer: function (feature, latlng) {		//esta funcion permite usar features para diseñar los iconos.
        var context = {
            feature: feature,
            variables: {}
        };
	  let AQI=feature.properties.AQI
                if  (          AQI<=50 ){CustomIcono=hacerIconNumber(AQI,"goodIcon");  }
             else if(AQI>50  & AQI<=100){CustomIcono=hacerIconNumber(AQI,"satiIcon"); }
             else if(AQI>100 & AQI<=200){CustomIcono=hacerIconNumber(AQI,"modeIcon"); }
             else if(AQI>200 & AQI<=300){CustomIcono=hacerIconNumber(AQI,"poorIcon");}
             else if(AQI>300 & AQI<=400){CustomIcono=hacerIconNumber(AQI,"vpoorIcon"); }
             else if(AQI>400           ){CustomIcono=hacerIconNumber(AQI,"severeIcon");}//severIcon;  }
	    return L.marker(latlng, 
		    {pane: 'pane_Puntos',
		     rotationAngle: 0.0,
		     rotationOrigin: 'center center',
		     icon: CustomIcono,
		     interactive: true,
		    });
    },
});
//layer_Puntos.addTo(mymap);
	
//crear MarkerCluster:
var cluster_PUNTOS = new L.MarkerClusterGroup({
	showCoverageOnHover: false,
	iconCreateFunction: function(cluster){
			var childCount = cluster.getChildCount();
			 var c = ' marker-cluster-';
			 if (childCount < 3) {          c += 'small'; size=5; } 
			 else if (childCount < 8) {     c += 'medium';size=40;} 
			 else {				c += 'large'; size=80;}
			 return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', 
			 			className: 'marker-cluster' + c,
				 		iconSize: new L.Point(40,40) 
			 });
	},
	spiderfyDistanceMultiplier: 2
});
cluster_PUNTOS.addLayer(layer_Puntos);
cluster_PUNTOS.addTo(mymap);




//Events:
function onMapClick(e) {
	$("#sidebar").hide();
    //popup
    //    .setLatLng(e.latlng)
    //    .setContent("Clickiaste en: " + e.latlng.toString())
    //    .openOn(mymap);
}
mymap.on('click', onMapClick);


function makeAQIdiv(AQI){
	     if (          AQI<=50 ){color="#55a84f";clase="good"}
	else if (AQI>50  & AQI<=100){color="#a3c853";clase="satisfactory"} 
	else if (AQI>100 & AQI<=200){color="#fff833";clase="moderate"} 
	else if (AQI>200 & AQI<=300){color="#f29c33";clase="poor"} 
	else if (AQI>300 & AQI<=400){color="#e93f33";clase="veryPoor"} 
	else if (AQI>400           ){color="#af2d24";clase="severe"};//& AQI<=500
	return '<div class="progress" id="progress"><div class="inner"><h1>AQI</h1><h2 id="AQI" class="'+clase+'">'+AQI+'</h2><h3>'+clase+'</h3></div></div>'
};

function makeMeteoIcons(TEMP,RHUM,WSPD,WDIR){
	return '<div id="meteorology"><span>&#127777;'+TEMP+'°C</span><span>&#128167;'+RHUM+' %</span><span>&#8605;'+WSPD+'m/s </span><span>&#10037; '+WDIR+'°</span></div>';
};


function makePollutsIndicatorBars(){
	//out='<div id="pollutsContainerBars">'
	//out+='<div class="myProgress" unit="ug/m3"><div class="myBar" name="NO2"  value="'+NO2+'"  ></div></div>'
	//out+='<div class="myProgress" unit="ug/m3"><div class="myBar" name="PM10" value="'+PM10+'" ></div></div>'
	//out+='<div class="myProgress" unit="ug/m3"><div class="myBar" name="PM25" value="'+PM25+'" ></div></div>'
	//out+='<div class="myProgress" unit="ug/m3"><div class="myBar" name="SO2"  value="'+SO2+'"  ></div></div>'
	//out+='<div class="myProgress" unit="ug/m3"><div class="myBar" name="CO"   value="'+CO+'"   ></div></div>'
	out='<div id="pollutsContainerBars">'
	out+='<div id="NO2-bar"  class="container-bar">NO<sub>2</sub> </div>'
	out+='<div id="PM10-bar" class="container-bar">PM<sub>10</sub></div>'
	out+='<div id="PM25-bar" class="container-bar">PM<sub>25</sub></div>'
	out+='<div id="SO2-bar"  class="container-bar">SO<sub>2</sub> </div>'
	out+='<div id="CO-bar"   class="container-bar">CO<sub></sub>  </div>'
	out+='</div>'
	return out
};



function addProgressBar(AQI,NO2,PM10,PM25,SO2,CO){
	const NO2min=0.0; const NO2max=300.0;
	const PM10min=0.0; const PM10max=250.0;
	const PM25min=0.0; const PM25max=250.0;
	const SO2min=0.0; const SO2max=168.0;
	const COmin= 0.0; const COmax=40000.0;

	     if (          AQI<=50 ){color="#55a84f";clase="good"}
	else if (AQI>50  & AQI<=100){color="#a3c853";clase="satisfactory"} 
	else if (AQI>100 & AQI<=200){color="#fff833";clase="moderate"} 
	else if (AQI>200 & AQI<=300){color="#f29c33";clase="poor"} 
	else if (AQI>300 & AQI<=400){color="#e93f33";clase="veryPoor"} 
	else if (AQI>400           ){color="#af2d24";clase="severe"};//& AQI<=500

	var AQIbar = 
	    new ProgressBar.Circle('#progress', {
	      color: color,
	      trailColor:'#eee',
	      trailWidth:2,
	      strokeWidth: 3,
	      duration: 1000, // milliseconds
	      easing: 'easeInOut'
	 });
	

	//var barSyle={
	//strokeWidth: 4,	easing: 'easeInOut',duration: 1400,
	//color: '#FFEA82',trailColor: '#eee',	trailWidth: 1,
	//text: {	style: barTextStyle,
	//	autoStyleContainer: false
	//}};
	var barTextStyle={
	  // Text color. (Default: same as stroke color)
	  color: '#999',
	  position: 'absolute',
	  right: '0',
	  top: '0px',
	  padding: 0,
	  margin: 0,
	  transform: null
	};


	var NO2bar = new ProgressBar.Line('#NO2-bar', {
		color:"#55a84f",strokeWidth:2,trailColor: '#eee',trailWidth: 2,
		text:{style: barTextStyle},
  		step: (state, bar) => { bar.setText(NO2+'ug/m<sup>3</sup>');}
	});
	var PM10bar = new ProgressBar.Line('#PM10-bar', {
		color:"#55a84f",strokeWidth:2,trailColor: '#eee',trailWidth: 2,
		text:{style: barTextStyle},
		step: (state, bar) => { bar.setText(PM10+'ug/m<sup>3</sup>');}
	});
	var PM25bar = new ProgressBar.Line('#PM25-bar', {
		color:"#a3c853",strokeWidth:2,trailColor: '#eee',trailWidth: 2,
		text:{style: barTextStyle},
		step: (state, bar) => { bar.setText(PM25+'ug/m<sup>3</sup>');}
	});
	var CObar = new ProgressBar.Line('#CO-bar', {
		color:"#fff833",strokeWidth:2,trailColor: '#eee',trailWidth: 2,
		text:{style: barTextStyle},
		step: (state, bar) => { bar.setText(CO+'ug/m<sup>3</sup>');}
	});
	var SO2bar = new ProgressBar.Line('#SO2-bar', {
		color:"#f29c33",strokeWidth:2,trailColor: '#eee',trailWidth: 2,
		text:{style: barTextStyle},
		step: (state, bar) => { bar.setText(SO2+'ug/m<sup>3</sup>');}
	});

	NO2bar.animate( Math.min((NO2-NO2min)/(NO2max-NO2min),1));      // Number from 0.0 to 1.0
	SO2bar.animate( Math.min((SO2-SO2min)/(SO2max-SO2min),1));      // Number from 0.0 to 1.0
	CObar.animate(  Math.min((CO-COmin)/(COmax-COmin),1));          // Number from 0.0 to 1.0
	PM10bar.animate(Math.min((PM10-PM10min)/(PM10max-PM10min),1));  // Number from 0.0 to 1.0
	PM25bar.animate(Math.min((PM25-PM25min)/(PM25max-PM25min),1));  // Number from 0.0 to 1.0
	AQIbar.animate(Math.min(AQI/500.0,1)); // percent
};








//PLOTLY:
function plotTimeSerie(){
	Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){
	
	  function unpack(rows, key) {
	  return rows.map(function(row) { return row[key]; });
	}
	var trace1 = {
	  type: "scatter",
	  mode: "lines",
	  x: unpack(rows, 'Date'),
	  y: unpack(rows, 'AAPL.High'),
	  line: {color: '#17BECF'}
	}
	
	var trace2 = {
	  type: "scatter",
	  mode: "lines",
	  x: unpack(rows, 'Date'),
	  y: unpack(rows, 'AAPL.Low'),
	  line: {color: '#7F7F7F'}
	}
	
	var data = [trace1,trace2];
	
	var layout = {
	    title: 'Serie Temporal',
	    autosize: false,
            width: 400,
	    height: 350,           
	    xaxis: {
	    range: ['2016-07-01', '2016-12-31'],
	    type: 'date',
		  },
	  yaxis: {
	    autorange: true,
	    range: [86.8700008333, 138.870004167],
	    type: 'linear'
	  },
	};
	
	Plotly.newPlot('plot-container', data, layout);
	})
}
