import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {Trip, FoodSchedule} from './js/trip';
import Person from './js/person';
// import TemplateClassName from './js/template.js';


$(document).ready(function() {
  let currentUser;
  let currentTrip;

  $('#begin').submit(function (event) {
    event.preventDefault();
    const user = $('#user').val();
    const tripTypeValue = $('#tripType').val();
    console.log(tripTypeValue);
    console.log(user);
    currentUser = new Person(user);
    console.log(currentUser);
    // window.location.href='tripForm.html';
  });

  $('#tripCreate').on("click", function (event) {
    event.preventDefault();
    console.log("hi");
    const tripName = $('#tripName').val();
    const tripDestination = $('#tripDestination').val();
    const tripParticipants = $('#tripParticipants').val();
    const tripStartDate = $('#tripStartDate').val();
    const tripEndDate = $('#tripEndDate').val();
    currentTrip = new Trip("backpacking", tripName, tripParticipants, tripDestination, tripStartDate, tripEndDate);
    currentUser["trips"].push(currentTrip);
    console.log(currentTrip);
    console.log(currentUser);
  });

  $('#foodPlanning').on("click", function(event) {
    event.preventDefault();
    let bf = $('#bf').val();
    let ms = $('#ms').val();
    let lunch = $('#lunch').val();
    let as = $('#as').val();
    let din = $('#din').val();
    let foodDay1 = {"breakfast" : bf, "morning_snack" : ms, "lunch" :  lunch, "afternoon_snack" : as, "dinner" : din};
    console.log(bf);
    console.log(foodDay1);
    let tripFood = new FoodSchedule(foodDay1);
    currentTrip.food = tripFood;
    console.log(currentUser);
    console.log(currentTrip);
  });

});