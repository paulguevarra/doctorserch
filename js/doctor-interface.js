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
      let nameMiddle=doctorData[eachDoctor].profile.middle_name;
      let nameLast=doctorData[eachDoctor].profile.last_name;
      let title=doctorData[eachDoctor].profile.title;
      let picture=doctorData[eachDoctor].profile.image_url;
      let street;
      let city;
      let state;
      let accepting;
      let practiceIndex=0;
      let practiceData=doctorData[eachDoctor].practices;
      let phoneNumDoc;
      let phoneTypeDoc;
      for(let practiceIndex in practiceData){
        street=practiceData[practiceIndex].visit_address.street;
        city=practiceData[practiceIndex].visit_address.city;
        state=practiceData[practiceIndex].visit_address.state;
        accepting=practiceData[practiceIndex].accepts_new_patients;
        if(accepting===true){
          accepting="Yes";
        }else {
          accepting="No";
        }
        let phoneIndex=0;
        let phoneData=practiceData[practiceIndex].phones;
        for(let phoneIndex in phoneData){
          phoneNumDoc=phoneData[phoneIndex].number;
          phoneTypeDoc=phoneData[phoneIndex].type;
          // phoneIndex++;
        }
        practiceIndex++;
      }
      $('#solutions').append(`<div class="col-md-10 well">${nameFirst} ${nameMiddle} ${nameLast}, ${title} <br> Address: ${street} &nbsp ${city}, ${state} <br> Accepting new patients: ${accepting}<br> ${phoneTypeDoc}: ${phoneNumDoc} <br> <img src='${picture}'> </div>`);
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
