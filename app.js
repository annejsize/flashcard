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
            new: [],
            used: []
        },
        score: {
            wordCount: 0,
            wordsHelped: 0
        },
    };

    //push pulled list into new array
    var addingWords = function (wordArray) {
        for(var i = 0; i < wordArray.length; i++)
        {
            var object = new Word;
            object.id = i;
            object.word = wordArray[i];
            data.wordBank.new.push(object);
            console.log(object);
        }
        return data.wordBank.new;
    };

    //shuffle array
    var shufflingWords = function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
            return array;
        };

    return {
        generateArrays: function() {
            addingWords(pulledWords);
            var getArray = data.wordBank.new;
            return getArray;
        },


        shuffling: function(array) {
            var shuffledWords = shufflingWords(array);
            return shuffledWords;
        },

        addToCount: function() {
            data.score.wordCount++;
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
        helpBtn: '.definition__btn'
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
};

var ctrlShowNextWord = function() {
    var test = wordCtrl.generateArrays();
    var test = wordCtrl.shuffling(test);
    uiCtrl.addWordToCard(test[0].word);
    score = console.log(wordCtrl.addToCount());
};

var ctrlShowPrevWord = function() {
    console.log('going back');
};

var ctrlShowDefinition = function() {
    console.log('help');
};

return {
    init: function() {
        console.log("App has started");
        
        setUpEventListners();        
    }
};
    
    
})(wordController, UIController);
controller.init();

