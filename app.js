//WORD CONTROLLER
var wordController  = (function(){
    
    var Word = function(id, word, description){
        this.id = id,
        this.word = word,
        this.description = description
    };

    var wordBank = ['apple', 'orange', 'something'];
    var definitionBank = ['red fruid', 'orange fruit', 'to denote a generic thing'];

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

    var addingWords = function (wordArray, definitionArray) {
        for(var i = 0; i < wordArray.length; i++)
        {
            var object = new Word;
            object.id = i;
            object.word = wordArray[i];
            object.description = definitionArray[i];
            data.wordBank.new.push(object);
            console.log(object);
        }
        return data.wordBank.new;
    };

    var shufflingWords = function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
            return array;
        }


    return {
        generateArrays: function() {
            addingWords(wordBank, definitionBank);
        },

        getWords: function() {
           var getArray = data.wordBank.new;
           return getArray;
        },

        shuffling: function(array) {
            var shuffledWords = shufflingWords(array);
            return shuffledWords;
        }
    };
})();

//UI CONTROLLER
var UIController  = (function(){
    var DOMstrings = {
        wordCard: '.card__text',
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
            //insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeEnd', newHtml);       
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
    var test = wordCtrl.getWords();
    var test1 = wordCtrl.shuffling(test);
    console.log(test1[0].word);
    uiCtrl.addWordToCard(test[0].word);
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
        wordCtrl.generateArrays();
        setUpEventListners();        
    }
};
    
    
})(wordController, UIController);
controller.init();

