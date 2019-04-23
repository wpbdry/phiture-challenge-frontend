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
    displaySearchResults(searchTerm);
});

async function displaySearchResults(searchTerm) {
  //Set loading message
  var resultsDiv = document.getElementById("results-div");
  resultsDiv.innerHTML = "Loading...";
  //Get results
  sendSearchRequest(searchTerm)
    .then(payload => generateSearchResultsHtmlElements(payload))
    .catch(error => console.error(error))
    //Display results
    .then(function(elements) {
      resultsDiv.innerHTML = "";
      resultsDiv.appendChild(elements.header);
      resultsDiv.appendChild(elements.table);
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

function generateSearchResultsHtmlElements(apiReturn) {
  console.log(apiReturn);
  var headerText = "";
  var resultsTable;
  switch (apiReturn.exitcode) {
    case 1: //Server received empty search result
      if(apiReturn.search === "") {
        headerText = document.createTextNode("Please no empty searches :)");
      } else {
        headerText = document.createTextNode("Unknown server error...");
      };
      break;
    case 2: //Other server side error
      headerText = document.createTextNode("Unknown server error...");
      break;
    default: //Array of results is returned as expected
      results = apiReturn.results;
      if (results.length === 0) {
        headerText = document.createTextNode("No results for: " + apiReturn.search);
      } else {
        headerText = document.createTextNode("Results for: " + apiReturn.search);
        resultsTable = createResultsTable(results);
      };
  };
  // Return elements
  var headerEl = document.createElement("h2");
  headerEl.appendChild(headerText);
  return {
    header: headerEl,
    table: resultsTable
  };
};

function createResultsTable(searchResults) {
  //Create table
  table = document.createElement("table");
  //Add header row
  tableHeader = {
    photo: "img/profile-icon.png",
    name: "Name",
    age: "Age",
    nationality: "Nationality",
    club: "Club",
    overall: "Overall Score",
    value: "Value"
  };
  headerRow = createResultRow(tableHeader, "th");
  table.appendChild(headerRow);
  //Add result rows
  for(var i=0; i<searchResults.length; i++) {
    row = createResultRow(searchResults[i], "td");
    table.appendChild(row);
  };
  //Return results
  return table
};

function createResultRow(resultItem, cellType) {
  var row = document.createElement("tr");
  const keys = ["photo", "name", "age", "nationality", "club", "overall", "value"];
  for(var j=0; j<keys.length; j++) {
    var cell = document.createElement(cellType);
    if(keys[j] === "photo") {
      var cellContent = document.createElement("img");
      cellContent.setAttribute("src", resultItem.photo);
      cellContent.setAttribute("alt", resultItem.name);
    } else {
      var cellContent = document.createTextNode(resultItem[keys[j]]);
    };
    cell.appendChild(cellContent);
    row.appendChild(cell);
  };
  return row;
};