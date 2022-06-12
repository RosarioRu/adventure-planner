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

  $('#addItems').submit(function (event) {
    event.preventDefault();
    let gearArray =[];
    $("input[type=checkbox][name=gearItem]:checked").each(function () { 
      const gearItems = $(this).val();
      gearArray.push(gearItems);
    });
    currentTrip.gear = gearArray;
    console.log(currentTrip.gear);
  });

});