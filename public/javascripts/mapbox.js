"use strict";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibmNvZGVyOTIiLCJhIjoiY2pkbmRmdno4MGQ2ODJ4bWtxcG02dnk1ciJ9.DehQETKEOyrOha4hqclYvg";

const main = () => {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  const map = new mapboxgl.Map({
    container: "map",
    center: [2.0787281, 41.3948976],
    zoom: 12,
    style: "mapbox://styles/mapbox/dark-v10", //    /light-v10     /streets-v11     /satellite-v9
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
    .then((result) => {
      result.data.forEach((restaurant) => {
        new mapboxgl.Marker()
          .setLngLat(restaurant.location.coordinates.reverse())
          // .setLngLat(restaurant.location.coordinates)
          .addTo(map);
      });
    })
    .catch((err) => console.error(err));
};

window.addEventListener("load", main);
