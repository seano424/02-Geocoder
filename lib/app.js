// TODO: Write your JS code in here
import mapboxgl from "mapbox-gl";

const apiKey = "pk.eyJ1Ijoic2VhbnBhdHJpY2s4OSIsImEiOiJja2g1NDFpcW0wMmdpMnFtbTl2OXdiNjBvIn0._MvUjwqkOAihiT2K9cI8Eg";

// Return map object after submit
// ##################################
// set a const doc.get input from user
const input = document.getElementById("display");
// click submit event which will trigger fetch
const submitForm = document.getElementById("displayMapForm");
const h1Display = document.querySelector(".displayCoordinates");
const mapDisplay = document.getElementById("map");

mapboxgl.accessToken = `${apiKey}`;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [-0.077, 51.533],
  zoom: 12,
});

const handleAddress = (event) => {
  const inputValue = input.value;
  event.preventDefault();
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data.features[0].geometry.coordinates);
      const coordinates = data.features[0].geometry.coordinates;
      h1Display.textContent = coordinates;
      new mapboxgl.Marker()
        .setLngLat([`${coordinates[0]}`, `${coordinates[1]}`])
        .addTo(map);
      // map.center = [`${coordinates[0]}`, `${coordinates[1]}`];
      console.log(map.center);
      map.jumpTo({ center: [coordinates[0], coordinates[1]] });
    });
};

submitForm.addEventListener("submit", handleAddress);
// fetch to the map url
// get stuff back from mapbox (coordinates we submit)
// it returns long and lat
