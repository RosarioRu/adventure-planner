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

//the function below builds the itinerary on the DOM -- it will create as many "cards" as there are days where we can display the plan for that day//
//it will display 3 days on each row with each row having an id of row(#of row)
function addRows (totalRows, totalDays) {
  let dayCount=1;
  for (let rows=1; rows<=totalRows; rows++) {
    $("#tripItinerary").append("<div class='row' id='row" + rows + "'>" + "</div>");
    for (let days=1; days<=3 && dayCount<=totalDays ; days++) {
      $("#row" + rows + "").append("<div class='col-lg-4'><div class='card'><div class='card-body'><h5 class='card-title'>Day " + dayCount + "</h5><p class='card-text' id='day" + dayCount + "'>Content of day's itinerary</p><a href='#' class='btn btn-primary'>Go somewhere</a></div></div></div>");
      dayCount=dayCount+1;
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
$(document).ready(function() {
  let currentUser;
  let currentTrip;
  let arrayOfTripDays;
  

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
    
    //clears other divs and displays itinerary div, then calls addRows() to show itinerary on page
    arrayOfTripDays = currentTrip.tripDates.datesListed;
    const daysNeeded = arrayOfTripDays.length;
    const rowsNeeded = Math.ceil((arrayOfTripDays.length)/3);
    $(".tripPage").hide();
    $(".landingPage").hide();
    $(".navigation").hide();
    $(".itinerary").show();
    addRows(rowsNeeded, daysNeeded);

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

  /*FOOD PAGE LIST-GROUP CLICK LISTENER*/
  $('.list-group').on("click", function(){
    fillFoodPlannerForm(currentTrip);
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

  $("#personalForm").submit(function(event) {
    event.preventDefault();
    let personalGearList = [];
    $("input[type='checkbox'][name=personal]:checked").each(function() {
      const itemsSelected = $(this).val();
      console.log(itemsSelected);
      personalGearList.push(itemsSelected);
    });
    currentTrip.personalSupplies = personalGearList;
    
    $("#tripItinerary .card p").append("<button type='button' class='btn btn-link' id='displayPersonalGearList'>Personal Gear List</button>");
    // $("#displayPersonalGearList").on("click", ;

  });

});