"use strict";

// Mapbox Docs example - https://docs.mapbox.com/mapbox-gl-js/example/simple-map/

const main = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibmNvZGVyOTIiLCJhIjoiY2pkbmRmdno4MGQ2ODJ4bWtxcG02dnk1ciJ9.DehQETKEOyrOha4hqclYvg";
  const map = new mapboxgl.Map({
    container: "map", // container id
    center: [2.0787281, 41.3948976], // starting position [lng, lat]
    zoom: 12, // starting zoom
    style: "mapbox://styles/mapbox/dark-v10" // stylesheet location

    // style: "mapbox://styles/mapbox/light-v10"
    // style: "mapbox://styles/mapbox/streets-v11"
    // style: "mapbox://styles/mapbox/satellite-v9"
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        var pos = [position.coords.longitude, position.coords.latitude];
        map.setCenter(pos);
      },
      () => alert("Issue retrieving your location")
    );
  } else {
    alert(" Your browser doesn't support Geolocation");
  }

  axios
    .get("http://localhost:3000/api/restaurants")
    .then(result => {
      result.data.forEach(restaurant => {
        new mapboxgl.Marker()
          .setLngLat(restaurant.location.coordinates.reverse()) // reverse the order of Lat and Lng
          // .setLngLat(restaurant.location.coordinates)
          .addTo(map);
      });
    })
    .catch(err => console.error(err));
};

window.addEventListener("load", main);
