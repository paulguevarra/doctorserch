var apiKey = require('./../.env').apiKey;
var ApplicationModule = require('./../js/doctor.js').applicationModule;

$(document).ready(function(){
  var applicationModule = new ApplicationModule();
  $("#doctor-form").click(function(event){
    event.preventDefault();

    let inputName = $("#name").val();

    $.ajax({
      url: 'https://api.betterdoctor.com/2016-03-01/doctors?name=${inputName}&location=or-portland&user_location=45.514931%2C-122.679109&skip=0&limit=10&user_key=${apiKey}',
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(results){
        $('ul#solutions').append(`<li>Name: ${results.practices.name}</li>`);

      },
      error: function(){
        $('.errors').text("There was an error processing your request. Please try again.")
      }
    });


  });
});
