//WORD CONTROLLER
var wordController  = (function(){
    var Word = function(id, word, description){
        this.id = id,
        this.word = word,
        this.description = description
    };

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
    return {
        addNewWord: function(id, word, description) {
            var newWord = new Word(id, word,description);
            return newWord;
        }
    };
})();

//UI CONTROLLER
var UIController  = (function(){
    //stuff
    
    
})();


//APP CONTROLLER
var controller  = (function(wordCtrl, uiCtrl){
    //testing;

return {
    init: function() {
        console.log("App has started");
        var testing = wordCtrl.addNewWord(1, 'testing', 'testing testing testing');
        console.log(testing);
    }
};
    
    
})(wordController, UIController);

controller.init();

