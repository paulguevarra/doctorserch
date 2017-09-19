var ApplicationModule = require('./../js/doctor.js').applicationModule;
// var apiKey = require('./../.env').apiKey;

let displayResults = function(response){
  let eachDoctor = 0;
  let doctorData = response.data;
  if (response.meta.count ===0){
    $('#solutions').append("The medical concern query returned empty. Please revise your query and try again.");
  }else {
    for (let eachDoctor in doctorData) {
      let nameFirst=doctorData[eachDoctor].profile.first_name;
      let nameLast=doctorData[eachDoctor].profile.last_name;
      let title=doctorData[eachDoctor].profile.title;
      let street;
      let city;
      let state;
      let practiceIndex=0;
      let practiceData=doctorData[practiceIndex].practices;
      for(let practiceIndex in practiceData){
        street=practiceData[practiceIndex].visit_address.street;
        city=practiceData[practiceIndex].visit_address.city;
        state=practiceData[practiceIndex].visit_address.state;
      }
      $('#solutions').append(`<li>${nameFirst} ${nameLast}, ${title} <br> Address: ${street} &nbsp ${city}, ${state}</li>`);
      eachDoctor++;
    }
  }
};



$(document).ready(function(){
  $("#doctor-form").submit(function(event){
    var applicationModule = new ApplicationModule();
    event.preventDefault();
    let inputConcern = $("#concern").val();
    applicationModule.getConcern(inputConcern, displayResults);
    $('#formsheet').hide();
    $('#resultsdisplay').show();
  });
});
