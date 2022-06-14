import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {Trip, TripDates} from './js/trip';
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

function parseDateIndex(activeId) {
  const dateIndexStr = activeId.replace("foodDate", "");
  const dateIndex = parseInt(dateIndexStr);
  return dateIndex;
}

function foodListClickHandler() {
  $(this).addClass('active').siblings().removeClass('active');
  $(':input','#foodPlanning').val('');
}

function populateFoodDatesList(tripObject){
  const dates = tripObject.tripDates.datesListed;

  for (let j = 0; j < dates.length; j++){
    if(j === 0){
      $('.list-group').append($('<a class="list-group-item list-group-item-action flex-column align-items-start active"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + dates[j] + '</h5></div><p class="mb-1"></p></a>').attr('id', "foodDate" + j));
    } else {
      $('.list-group').append($('<a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + dates[j] + '</h5></div><p class="mb-1"></p></a>').attr('id', "foodDate" + j));
    }
  }
  $('.list-group-item').on("click", foodListClickHandler);
}

function updateFoodDatesList(tripObject, activeDateId){
  let dateIndex = parseDateIndex(activeDateId);
  let foodArr = Object.values(tripObject.food[dateIndex]);
  $('#' + activeDateId + ' p').html("");
  for(let i=0; i<foodArr.length; i++) {
    if (foodArr[i] !== ""){
      $('#' + activeDateId + ' p').append("<li>" + foodArr[i] + "</li>");
    }
  }
}

function fillFoodPlannerForm(tripObject){
  let activeFoodDateId = $('.list-group').find('a.active').attr("id");
  let dateIndex = parseDateIndex(activeFoodDateId);
  if (tripObject.food[dateIndex] !== undefined) {
    let foodObject = tripObject.food[dateIndex];
    let foodObjectKeys = Object.keys(foodObject);

    const foodKeyAndInputMap = {
      "breakfast" : "breakfastInput",
      "morning_snack" : "morningSnackInput",
      "lunch" : "lunchInput",
      "afternoon_snack" : "afternoonSnackInput",
      "dinner" : "dinnerInput"
    };
    for (let i = 0; i < foodObjectKeys.length; i++) {
      let foodObjectKey = foodObjectKeys[i];
      if (foodObject[foodObjectKey] !== "") {
        let formInputId = foodKeyAndInputMap[foodObjectKey];
        let foodObjectValue = foodObject[foodObjectKey];
        $('#' + formInputId).val(foodObjectValue);
      }
    } 
  }
}

/*DOCUMENT READY JQUERY UI STARTS HERE */
$(function() {
  let currentUser;
  let currentTrip;

  /*LANDING PAGE SUBMIT BUTTON*/
  $('#begin').submit(function (event) {
    event.preventDefault();
    const user = $('#user').val();
    // const tripTypeValue = $('#tripType').val();
    currentUser = new Person(user);
    // window.location.href='tripForm.html';
    $(".tripPage").show();
    $(".landingPage").hide();
  });

  /*TRIP CREATE SUBMIT BUTTON*/
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

    populateFoodDatesList(currentTrip);
  });
  
  /*FOOD PLANNING SUBMIT BUTTON */
  $('#foodPlanning').on("submit", function(event) {
    event.preventDefault();

    let breakfast = $('#breakfastInput').val();
    let morningSnack = $('#morningSnackInput').val();
    let lunch = $('#lunchInput').val();
    let afternoonSnack = $('#afternoonSnackInput').val();
    let dinner = $('#dinnerInput').val();
    let activeFoodDateId = $('.list-group').find('a.active').attr("id");
    let foodDateIndex = parseDateIndex(activeFoodDateId);
    currentTrip.food[foodDateIndex] = {"breakfast" : breakfast, "morning_snack" : morningSnack, "lunch" :  lunch, "afternoon_snack" : afternoonSnack, "dinner" : dinner};
    updateFoodDatesList(currentTrip, activeFoodDateId);
  });

  /*FOOD PAGE LIST GROUP CLICK*/
  $('.list-group').on("click", function(){
    fillFoodPlannerForm(currentTrip);
  });
});