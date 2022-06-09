import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {Trip, FoodSchedule, TripDates} from './js/trip';
import Person from './js/person';
// import TemplateClassName from './js/template.js';

export default function dateDiff(startDate, endDate) {
  const timeDif =  Math.round((startDate-endDate)/(1000*60*60*24));
  const absTimeDif = Math.abs(timeDif);
  return absTimeDif;
}

$(document).ready(function() {
  let currentUser;
  let currentTrip;

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
    let currentTripDates = new TripDates(tripStartDate, tripEndDate);
    currentTripDates.calcDateDiff();
    currentTrip = new Trip("backpacking", tripName, tripParticipants, tripDestination, currentTripDates);
    currentUser["trips"].push(currentTrip);
    console.log(currentUser);
    console.log(currentTrip);
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

});