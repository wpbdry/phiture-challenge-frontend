/*************************************************************************
_/                _/  _/_/_/    _/_/_/    _/_/_/    _/_/_/    _/      _/  
_/              _/   _/    _/  _/    _/  _/    _/  _/    _/    _/  _/     
_/    _/_/    _/    _/_/_/    _/_/_/    _/    _/  _/_/_/        _/        
_/  _/  _/  _/     _/        _/    _/  _/    _/  _/  _/        _/         
_/_/    _/_/      _/        _/_/_/    _/_/_/    _/    _/      _/  made it!
*************************************************************************/

document.getElementById("search-form").addEventListener("submit", function(event){
    event.preventDefault();
    const searchTerm = document.getElementById("search-input").value;
    sendSearchRequest(searchTerm)
    .then(payload => displaySearchResults(payload))
    .catch(error => console.error(error));
});

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

function displaySearchResults(apiReturn) {
  var resultsDiv = document.getElementById("results-div");
  const textResult = apiReturn.result;
  resultsDiv.innerText = "The server returned: " + textResult;
};