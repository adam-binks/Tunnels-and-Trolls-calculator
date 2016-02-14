var recentResults = [];
var maxRecentResults = 5;

function rollDice(numDice) {
    "use strict";
    
    var result = Math.floor(Math.random() * (numDice * 6 - numDice + 1) + numDice);
    return result;
}

// roll two dice. if they're the same, roll again and add on that result
function rollTwoDiceAndCheckForDoubles() {
    "use strict";
    
    var roll1 = Math.floor(Math.random() * 5 + 1);
    var roll2 = Math.floor(Math.random() * 5 + 1);
    
    var result = roll1 + roll2;
    
    if (roll1 === roll2) {
        result += rollTwoDiceAndCheckForDoubles();
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
    
    var diceResult = rollTwoDiceAndCheckForDoubles();
    var requiredScore = level * 5 + 15;
    
    var didMakeSavingRollText = "passed";
    if (diceResult < 5 ||  diceResult+attributeAmount+levelBonus < requiredScore) {
        didMakeSavingRollText = "failed";
    } 
    
    resultsPara.innerHTML = "You rolled " + diceResult + ". With attributes and level bonuses, the score is " + (diceResult + attributeAmount + levelBonus) + "<br>You " + didMakeSavingRollText + " the saving roll!";
}