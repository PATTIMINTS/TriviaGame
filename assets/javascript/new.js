(function() {
    let questions = [{
      question: 'This band wrote a song by the title of "Surrender" released in 1976.',
      choices: [' a The Vapors', ' b The Jam', ' c Cheap Trick', ' d Television'],
      correctAnswer: 2
    }, {
      question: 'This is one of the more misinterpreted songs of all time written by The Vapors, word was that the title/lyrics of this song refers to the facial features people get at the moment of climax. Name that Song.',
      choices: [' a Looking for the Magic', ' b Turning Japanese', ' c Shake Some Action', ' d Surrender'],
      correctAnswer: 1
    }, {
      question: 'In the City released in 1977 was written by an English mod band.  Select the correct band.',
      choices: [' a The Knack', ' b Blondie', ' c The Pandoras', ' d Tha Jam'],
      correctAnswer: 3
    }, {
      question: 'This song released in 1977 by Dwight Twilley Band was playing on a loop in the horror movie "You&apos;re next',
      choices: [' a A Million Miles Away', ' b Looking for the Magic', ' c All Kinds of Girls', ' d Hanging on the Telephone'],
      correctAnswer: 1
    }, {
      question: "What is 8*8?",
      choices: [20, 30, 40, 50, 64],
      correctAnswer: 4
    }];
    
    let questionCounter = 0; //Tracks question number
    let selections = []; //Array containing user choices
    let quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      let qElement = $('<div>', {
        id: 'question'
      });
      
      let header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      let question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      let radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      let radioList = $('<ul>');
      let item;
      let input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          let scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      let score = $('<p>',{id: 'question'});
      
      let numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
      return score;
    }
  })();