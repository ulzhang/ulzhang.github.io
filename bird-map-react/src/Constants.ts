import L from "leaflet";

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

export const mapboxAPI: string = "pk.eyJ1IjoidWx6aGFuZyIsImEiOiJja3R5eHZxMTMwMnl3MnhxZ2JyYzYzcmpzIn0.nw7l6ZxMbKNsVzy1mjMNJQ";

export const firebaseConfig = {
  apiKey: "AIzaSyDafTBcwBZ9g7nnzvQYW1m644ZV_sRTvJQ",
  authDomain: "bird-maps-1.firebaseapp.com",
  databaseURL: "https://bird-maps-1-default-rtdb.firebaseio.com",
  projectId: "bird-maps-1",
  storageBucket: "bird-maps-1.appspot.com",
  messagingSenderId: "460361909334",
  appId: "1:460361909334:web:9e8db450c35df6e9bda7f7",
  measurementId: "G-K6PPGQL6T2"
};