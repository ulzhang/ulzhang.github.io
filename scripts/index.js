const mapboxAPI = "pk.eyJ1IjoidWx6aGFuZyIsImEiOiJja3R5eHZxMTMwMnl3MnhxZ2JyYzYzcmpzIn0.nw7l6ZxMbKNsVzy1mjMNJQ"

var map = L.map('mapid').fitWorld();
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapboxAPI
}).addTo(map);
map.locate({setView: true, maxZoom: 16});

var popup = L.popup();
/**
 * Click on a point and get coordinates
 * @param {*} e 
 */
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    var marker = L.marker(e.latlng).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}
map.on('click', onMapClick);

/**
 * Show pop up when location is found with proximity
 * @param {*} e
 */
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

/**
 * Alert error message when location error, will show global map
 * @param {*} e
 */
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);