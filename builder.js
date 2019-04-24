/*************************************************************************
_/                _/  _/_/_/    _/_/_/    _/_/_/    _/_/_/    _/      _/  
_/              _/   _/    _/  _/    _/  _/    _/  _/    _/    _/  _/     
_/    _/_/    _/    _/_/_/    _/_/_/    _/    _/  _/_/_/        _/        
_/  _/  _/  _/     _/        _/    _/  _/    _/  _/  _/        _/         
_/_/    _/_/      _/        _/_/_/    _/_/_/    _/    _/      _/  made it!
*************************************************************************/

document.getElementById("builder-form").addEventListener("submit", function(event){
    event.preventDefault();
    const budget = document.getElementById("builder-input").value;
    displayTeamResult(budget);
});

async function displayTeamResult(budget) {
    //Check valid input
    if(isNaN(budget) || budget - Math.floor(budget) != 0) {
        alert("Please enter a number without decimal point or other characters");
        return
    }
    //Set loading message
    var teamResultDiv = document.getElementById("team-result-div");
    teamResultDiv.innerHTML = "Searching...";
    //Get results
    console.log("Your budget is: " + budget);
};

  /*
  sendSearchRequest(searchTerm)
    .catch(function(error) {
      console.log(error);
      if(error.message == "Failed to fetch") {
        alert("Connection error!");
      };
    })
    .then(payload => generateSearchResultsHtmlElements(payload))
    .catch(error => console.error(error))
    //Display results
    .then(function(htmlElements) {
      resultsDiv.innerHTML = "";
      resultsDiv.appendChild(htmlElements.header1);
      resultsDiv.appendChild(htmlElements.results1);
      resultsDiv.appendChild(htmlElements.header2);
      resultsDiv.appendChild(htmlElements.results2);
      document.getElementById("search-input").select();
    });
};

async function sendSearchRequest(searchTerm) {
  const payload = {
    searchterm: searchTerm
  }
  const response = await fetch(searchApiUrl, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(payload)
  });
  return await response.json();
};
*/