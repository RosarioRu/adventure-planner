import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import '@mapbox/mapbox-gl-geocoder';
import {Trip, FoodSchedule} from './js/trip';
import Person from './js/person';
import { Coordinates, Map} from './js/map.js';
//import GeoCoder from './js/service.js';


const formElement = document.getElementById('create-route');
formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  let address = $('#route-start').val();

  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_API_KEY}`)
    .then(response => response.json())
    .then((data) => {
      const coordinates = {
        lng: data.features[0].geometry.coordinates[0],
        lat: data.features[0].geometry.coordinates[1]
      };
      console.log(coordinates);
      Coordinates(coordinates);
        
    });
});

$(document).ready(function() {
  let currentUser;
  let currentTrip;
  let map = Map();

  document.getElementById('mapView').append(map);
  map.resize();

  $('#begin').submit(function (event) {
    event.preventDefault();
    const user = $('#user').val();
    // const tripTypeValue = $('#tripType').val();
    currentUser = new Person(user);
    // window.location.href='tripForm.html';
    $(".tripPage").show();
    $(".landingPage").hide();
  });

  $('#tripCreate').on("click", function (event) {
    event.preventDefault();
    const tripName = $('#tripName').val();
    const tripDestination = $('#tripDestination').val();
    const tripParticipants = $('#tripParticipants').val();
    const tripStartDate = $('#startDate').val();
    const tripEndDate = $('#endDate').val();
    currentTrip = new Trip("backpacking", tripName, tripParticipants, tripDestination, tripStartDate, tripEndDate);
    currentUser["trips"].push(currentTrip);
    console.log(tripStartDate);
    console.log(tripEndDate);
  });

  $('#foodPlanning').on("click", function(event) {
    event.preventDefault();
    let bf = $('#bf').val();
    let ms = $('#ms').val();
    let lunch = $('#lunch').val();
    let as = $('#as').val();
    let din = $('#din').val();
    let foodDay1 = {"breakfast" : bf, "morning_snack" : ms, "lunch" :  lunch, "afternoon_snack" : as, "dinner" : din};
    let tripFood = new FoodSchedule(foodDay1);
    currentTrip.food = tripFood;
  });

  // $('#create-route').on("click", function(event){
  //   event.preventDefault();
  //   let address = $('#route-start').val();
  //   //let routeEnd = $('#route-end').val();
  //   console.log(address);
  //   // fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_API_KEY}`)
  //   //   .then(response => response.json())
  //   //   .then((data) => {
  //   //     const coordinates = {
  //   //       lng: data.features[0].geometry.coordinates[0],
  //   //       lat: data.features[0].geometry.coordinates[1]
  //   //     };
  //   //     console.log(coordinates);
  //   //     //console.log(Map(coordinates));
        
  //   //   });
  //   //makeGeoCoderCall(address);

  //   //console.log(routeEnd);
  // });

});