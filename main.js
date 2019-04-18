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
    var resultsDiv = document.getElementById("results-div");
    resultsDiv.innerText = "You searched for: " + searchTerm;
  });