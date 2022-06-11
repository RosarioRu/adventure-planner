import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
//import 'mapbox-gl/dist/mapbox-gl.js';
import {Trip, FoodSchedule} from './js/trip';
import Person from './js/person';
// import TemplateClassName from './js/template.js';

//check in where this should go
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = `${process.env.MAPBOX_API_KEY}`;
const map = new mapboxgl.Map({
  container: 'mapView',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [-122.669, 45.429],
  zoom: 9
});

$(document).ready(function() {
  let currentUser;
  let currentTrip;

  // $('#mapView').append(map);
  // map.resize();

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

  $('#create-route').on("click", function(event){
    event.preventDefault();
    let routeBegin = $('#route-start').val();
    let routeEnd = $('#route-end').val();
    console.log(routeBegin);
    console.log(routeEnd);
  });

});