import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import TemplateClassName from './js/template.js';

$(document).ready(function() {
  $('#begin').submit(function (event) {
    event.preventDefault();
    const user = $('#user').val();
    const tripTypeValue = $('#tripType').val();
    console.log(tripTypeValue);
    console.log(user);
    // window.location.href='tripForm.html';
  });
});