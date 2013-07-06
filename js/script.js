/*************************************** Map **********************************************/
/* 	Date : 06/25/2013
	Developer : TianYu
*/
var Map = {
	container: undefined,
	data : undefined,
	
	
	
	
	/***** plotPoints  *******************/
	/*	functionality
			display goole map and Marker Position
		parameters:
			container : map container
			width: container width
			height: container height
			fileName : Json file name
	*/

	plotPoints : function (container, width, height, fileName){
		fileName = "data/"+fileName;
		d3.json(fileName, function(error, json_data) {
			if (error != null) {
				alert('ok');
				return;
			}
			
			Map.container = container;
			
			data = Map.getGeoData(json_data);
			Map.setGoogleMap();
		});	
	},
	










	/*********************  getGeoData  *******************************/
	/*	functionality
			get the latitude and longtitude
		parameters
			json_data : json data
	*/
	
	getGeoData : function (json_data) {
		var dataslength = json_data.data.length;
		var geodatas = [];
		var geoindex = 0;
		for (var i = 0 ; i < dataslength ; i++)
		{
			var geodata = json_data.data[i].geo;
			if(geodata != null)
			{
				geodatas[geoindex] = geodata;
				geoindex++;
			}
		}	
		return geodatas;
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*********************  setGoogleMap  *******************************/
	/*	functionality
			create and display googl map
	*/
	
	setGoogleMap : function () {
		var  lat_map, lng_map;

		lat_map = data[0].coordinates[0];
		lng_map = data[0].coordinates[1];
		
		//display styled google map
		var styles = [
			{
				featureType: 'water', // set the water color
				elementType: 'geometry.fill', // apply the color only to the fill
				stylers: [
					{ color: '#478762' }
				]
			},{
				featureType: 'landscape.natural', // set the natural landscape
				elementType: 'all',
				stylers: [
					{ hue: '#8bc399' },
					{ lightness: 12 }
				]
			}
			,{
				featureType: 'poi', // set the point of interest
				elementType: 'geometry',
				stylers: [
					{ hue: '#8bc399' },
					{ lightness: 12 }
				]
			},{
				featureType: 'road', // set the road
				elementType: 'geometry',
				stylers: [
					{ hue: '#8bc399' },
					{ lightness: 12 }
				]
			},{
				featureType: 'road.local', // set the local road
				elementType: 'all',
				stylers: [
					{ hue: '#8bc399' },
					{ saturation: 100 },
					{ lightness: 12 }
				]
			},{
				featureType: 'transit', // set the local road
				elementType: 'all',
				stylers: [
					{ hue: '#8bc399' },
					{ saturation: 100 },
					{ lightness: 12 }
				]
			}
		];

	    
		var myOptions = {  
		    mapTypeControlOptions: {  
		        mapTypeIds: ['Styled']  
		    },  
		    center: new google.maps.LatLng(lat_map, lng_map),
		    zoom: 12,  
		    disableDefaultUI: true,   
		    mapTypeId: 'Styled'  
		};  
		
		/*var myOptions = {
		    zoom: 10,
		    mapTypeControl: true,
	        center: new google.maps.LatLng(lat_map, lng_map),
		    mapTypeId: google.maps.MapTypeId.TERRAIN
			
		  }*/
		
		var map = new google.maps.Map(Map.container, myOptions);
		
		var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
		map.mapTypes.set('Styled', styledMapType);
			   
		for (var i = 0 ; i < data.length ; i++)
		{
			lat_map = data[i].coordinates[0];
			lng_map = data[i].coordinates[1];

			var latlng = new google.maps.LatLng(
		          parseFloat(lat_map),
		          parseFloat(lng_map));
			Map.createMarkerPosition(latlng, map);	

		}
	
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		

	/*********************  createMarkerPosition  *******************************/
	/*	functionality
			display markers
		parameters
			latlng : latitude and longtitude
			map : created map object
	*/
	
	createMarkerPosition : function (latlng , map) {
		var marker = new google.maps.Marker({
			map: map,
			position: latlng,
			icon : 'img/pinmark.png'
		});
		
	}	
		
};





