//WORD CONTROLLER
var wordController  = (function(){
    //set constructor
    var Word = function(id, word){
        this.id = id,
        this.word = word
    };
    // pull in array of word 
    // for now list will be hard coded
    var pulledWords = ['apple', 'orange', 'something'];
    //
    var data = {
        wordBank: {
            original: [],
            sorted: []
        },
        score: {
            wordCount: 0,
            wordsHelped: 0
        },
        name: ' '
    };

    //push pulled list into new array
    var addingWords = function (wordArray) {
        for(var i = 0; i < wordArray.length; i++)
        {
            var object = new Word;
            object.id = i;
            object.word = wordArray[i];
            data.wordBank.original.push(object);
            console.log(object);
        }
        return data.wordBank.original;
    };

    //shuffle array
    var shufflingWords = function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];           
        }
            data.wordBank.sorted = array;
            return array;
        };

    return {
        generateArrays: function() {
            addingWords(pulledWords);
            shufflingWords(data.wordBank.original);
            var getArray = data.wordBank.sorted;
            return getArray;
        },

        getSortedArray: function() { 
            return data.wordBank.sorted;
        },


        addToCount: function() {
            data.score.wordCount++;
            return data.score.wordCount;
        },

        addName: function(name) {
            data.name = name;
            console.log(data.name);
        },

        getScore: function() {
            return data.score.wordCount;
        }


    };
})();

//UI CONTROLLER
var UIController  = (function(){
    var DOMstrings = {
        wordCard: 'card__text',
        rightBtn: '.right__btn',
        leftBtn: '.left__btn',
        helpBtn: '.definition__btn',
        startBtn: '.start__btn',
        score: 'score'
    };

    return {
        addWordToCard: function(word) {
            var html, newHtml;
            //create HTML string w/ placeholder text
            element = DOMstrings.wordCard,
            html = ' <h2 class="card__text--size">%selectedWord%</h2>'
            //replace placeholder w/ actual data
            newHtml = html.replace('%selectedWord%', word);
            console.log(element);
            document.getElementById(element).innerHTML = newHtml ;
        },

        getDomstrings: function() {
            return DOMstrings;
        },

        changeVisibility: function(elementId) {
            var x = document.getElementById(elementId);
              x.style.visibility = 'visible';
              document.getElementById('introduction').style.display = 'none';
          },

        showScore: function(score) {
            element = DOMstrings.score,
            html = ' <h5 class="card__text--size">%score%</h5>';
            newHtml = html.replace('%score%', score);
            document.getElementById(element).innerHTML = newHtml ;            
        }
    };   
    
})();


//APP CONTROLLER
var controller  = (function(wordCtrl, uiCtrl){
    var setUpEventListners = function() {
        var DOM = uiCtrl.getDomstrings();
        document.querySelector(DOM.rightBtn).addEventListener('click', ctrlShowNextWord);
        document.querySelector(DOM.leftBtn).addEventListener('click', ctrlShowPrevWord);
        document.querySelector(DOM.helpBtn).addEventListener('click', ctrlShowDefinition);
        document.querySelector(DOM.startBtn).addEventListener('click', ctrlStartGame)
};

var ctrlShowNextWord = function() {
    score = wordCtrl.addToCount();
    console.log(score-1);
    array = wordCtrl.getSortedArray();
    uiCtrl.addWordToCard(array[score].word);  
    uiCtrl.showScore(score); 
    //Update score
};

var ctrlShowPrevWord = function() {
    console.log('going back');
};

var ctrlShowDefinition = function() {
    console.log('help');
};

var ctrlStartGame = function() {
    var name = document.getElementById("getName").value;
    console.log(name);
    wordCtrl.addName(name);
    uiCtrl.changeVisibility("container");
    array = wordCtrl.getSortedArray();
    uiCtrl.addWordToCard(array[0].word);
    uiCtrl.showScore(wordCtrl.getScore());
}

return {
    init: function() {
        console.log("App has started");       
        setUpEventListners();   
        wordCtrl.generateArrays();
        //initlize score
    }
};
    
    
})(wordController, UIController);
controller.init();

