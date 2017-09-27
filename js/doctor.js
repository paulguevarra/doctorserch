let apiKey = require('./../.env').apiKey;
let ApplicationModule = function(){

};
ApplicationModule.prototype.getConcern = function(inputConcern, displayResults){
  $.ajax({
    url: `https://api.betterdoctor.com/2016-03-01/doctors?name=${inputConcern}&location=or-portland&user_location=45.514931%2C-122.679109&sort=best-match-asc&skip=0&limit=5&user_key=${apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response){
        displayResults(response);
    },
    error: function(){
      $('.errors').text("There was an error processing your request. Please try again.");
    }
  });
};


exports.applicationModule=ApplicationModule;
