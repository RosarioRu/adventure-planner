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

//the function below builds the itinerary on the DOM -- it will create as many "cards" as there are days where we can display the plan for that day//
function addRows (totalRows, totalDays) {
  let dayCount=1;
  for (let rows=1; rows<=totalRows; rows++) {
    $("#tripItinerary").append("<div class='row' id='row" + rows + "'>" + "</div>");
    for (let days=1; days<=3 && dayCount<=totalDays ; days++) {
      $("#row" + rows + "").append("<div class='col-lg-4'><div class='card'><div class='card-body'><h5 class='card-title'>Day " + dayCount + "</h5><p class='card-text'>Content of day's itinerary</p><a href='#' class='btn btn-primary'>Go somewhere</a></div></div></div>");
      dayCount=dayCount+1;
    }
  }
}

$(document).ready(function() {
  let currentUser;
  let currentTrip;
  let arrayOfTripDays;
  

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
    const tripType = "backpacking";
  
    let currentTrip = createTrip (tripStartDate, tripEndDate, tripType, tripName, tripParticipants, tripDestination);
    currentUser["trips"].push(currentTrip);
    console.log(currentTrip);
    
    //clears other divs and displays itinerary div, then calls addRows() to show itinerary on page
    arrayOfTripDays = currentTrip.tripDates.datesListed;
    const daysNeeded = arrayOfTripDays.length;
    const rowsNeeded = Math.ceil((arrayOfTripDays.length)/3);
    $(".tripPage").hide();
    $(".landingPage").hide();
    $(".navigation").hide();
    $(".itinerary").show();
    addRows(rowsNeeded, daysNeeded);

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

  $('#addItems').submit(function (event) {
    event.preventDefault();
    let gearArray =[];
    $("input[type=checkbox][name=gearItem]:checked").each(function () { 
      const gearItems = $(this).val();
      gearArray.push(gearItems);
    });
    currentTrip.gear = gearArray;
  });

});