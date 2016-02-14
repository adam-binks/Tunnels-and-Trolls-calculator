var recentResults = [];
var maxRecentResults = 5;

function rollCombat() {
    "use strict";
    
    var numDice = parseInt(document.getElementById("numDice").value);
    var numAdds = document.getElementById("numAdds");
    var resultsPara = document.getElementById("results");
    
    var actualAdds = 0;
    if (numAdds.value !== "") {
        actualAdds = parseInt(numAdds.value);
    }
    
    var result = rollDice(numDice) + actualAdds;
    
    recentResults.unshift(result);
    if (recentResults.length > maxRecentResults) {
        recentResults.pop(); // remove the oldest recent result
    }
    
    resultsPara.innerHTML = "";
    for (var i = 0; i < recentResults.length; i++) {
        resultsPara.innerHTML = resultsPara.innerHTML + "<br>" + recentResults[i];
    }
}

function rollDice(numDice) {
    return Math.floor(Math.random() * (numDice * 6 - numDice + 1) + numDice);
}