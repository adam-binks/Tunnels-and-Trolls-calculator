var recentResults = [];
var maxRecentResults = 5;

function rollDice(numDice, allowDoubles) {
    "use strict";
    
    var result = Math.floor(Math.random() * (numDice * 6 - numDice + 1) + numDice);
    // check if a double was rolled - if so, add another dice roll to the result. The second dice roll could even be a double.
    if (allowDoubles && Math.random() < Math.pow(1 / 6, numDice)) {
        result += rollDice(numDice, true);
    }
    return result;
}

function rollCombat() {
    "use strict";
    
    var numDice = parseInt(document.getElementById("numDice").value);
    var numAdds = document.getElementById("numAdds");
    var resultsPara = document.getElementById("results");
    
    var actualAdds = 0;
    if (numAdds.value !== "") {
        actualAdds = parseInt(numAdds.value);
    }
    
    var result = rollDice(numDice, false) + actualAdds;
    
    recentResults.unshift(result);
    if (recentResults.length > maxRecentResults) {
        recentResults.pop(); // remove the oldest recent result
    }
    
    resultsPara.innerHTML = "";
    for (var i = 0; i < recentResults.length; i++) {
        resultsPara.innerHTML = resultsPara.innerHTML + "<br>" + recentResults[i];
    }
}

function rollSaving() {
    "use strict";
    
    var level = parseInt(document.getElementById("savingRollLevel").value);
    var attributeAmount = parseInt(document.getElementById("attributeAmount").value);
    var levelBonus = parseInt(document.getElementById("levelBonus").value);
    var resultsPara = document.getElementById("resultsSavingRoll");
    
    var diceResult = rollDice(2, true); // allow double rerolls
    var requiredScore = level * 5 + 15;
    
    var didMakeSavingRollText = "passed";
    if (diceResult < 5 ||  diceResult+attributeAmount+levelBonus < requiredScore) {
        didMakeSavingRollText = "failed";
    } 
    
    resultsPara.innerHTML = "You rolled " + diceResult + ". With attributes and level bonuses, the score is " + (diceResult + attributeAmount + levelBonus) + "<br>You " + didMakeSavingRollText + " the saving roll!";
}