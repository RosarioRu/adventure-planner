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

function createTripDates(startDate, endDate){
  let tripDates = new TripDates(startDate, endDate);
  tripDates.calcDateDiff();
  tripDates.populateDatesListed();
  return tripDates;
}

function createTrip(startDate, endDate, tripType, tripName, tripParticipants, tripDestination) {
  const currentTripDates = createTripDates(startDate, endDate);
  const currentTrip = new Trip(tripType, tripName, tripParticipants, tripDestination, currentTripDates);
  return currentTrip;
}

// function populateDropdownDates(tripObject){
//   const dates = tripObject.tripDates.datesListed;
//   $('#select').empty();
//   dates.forEach(function(x) {
//     console.log(x);
//     $('#foodScheduleDates').append($('<option></option>').val(x).html(x));
//   });
// }
function dropdownClickHandler(event) {
  event.preventDefault();
  console.log(event.target.attributes.val.value);
  console.log(event);
  // console.log(event.currentTarget.attributes.val);
  console.log("hello");
}

function populateDropdownDates2(tripObject){
  const dates = tripObject.tripDates.datesListed;
  $('.a').empty();
  for (let i = 0; i < dates.length; i++) {
    $('#foodDatesList').append($('<a class="dropdown-item dropdownFoodDates" href="#"></a>').html(dates[i]).attr('val', i));
  }
  $('.dropdownFoodDates').on("click", dropdownClickHandler);
}

$(function() {
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

  $('#tripCreate').on("click", function(event) {
    event.preventDefault();
    const tripName = $('#tripName').val();
    const tripDestination = $('#tripDestination').val();
    const tripParticipants = $('#tripParticipants').val();
    const tripStartDate = $('#startDate').val();
    const tripEndDate = $('#endDate').val();
    const tripType = "backpacking";

    currentTrip = createTrip(tripStartDate, tripEndDate, tripType, tripName, tripParticipants, tripDestination);
    currentUser["trips"].push(currentTrip);

    console.log(currentTrip);
    $(".tripPage").hide();
    $(".foodPage").show();

    // populateDropdownDates(currentTrip);
    populateDropdownDates2(currentTrip);
  });

  $('.dropdown-item').on("click", dropdownClickHandler);
  
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
    console.log(currentTrip);
  });

});