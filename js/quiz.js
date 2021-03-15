let preQuestions;

let promise = new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve("OK!");
        fetch('https://quiztai.herokuapp.com/api/quiz')
        .then(resp => resp.json())
        .then(resp => {
               preQuestions = resp;
             // kod wykorzystujący preQuestions  <-

             let next = document.querySelector('.next');
             let previous = document.querySelector('.previous');
             let question = document.querySelector('.question');
             let answers = document.querySelectorAll('.list-group-item');
             let list = document.querySelector('.list');
             let results = document.querySelector('.results');
             let average = document.querySelector('.average');
             let pointsElem = document.querySelector('.score');
             let restart = document.querySelector('.restart');
             let userScorePoint = document.querySelector('.userScorePoint');
             let questionCounter = document.querySelector('#index');
             let index = 0;
             let points = 0;
             
             setQuestion(index);
             
             for (let i = 0; i < answers.length; i++) {
                 answers[i].addEventListener('click', doAction);
             }
             
             function doAction(event) {
                 //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
                 if (event.target.innerHTML === preQuestions[index].correct_answer) {
                     points++;
                     pointsElem.innerText = points;
                     markCorrect(event.target);
                 }
                 else {
                     markInCorrect(event.target);
                 }
                 disableAnswers();
             }
             
             function activateAnswers() {
                 for (let i = 0; i < answers.length; i++) {
                    answers[i].addEventListener('click', doAction);
                 }
              }
              activateAnswers();
             
              function disableAnswers() {
                 for (let i = 0; i < answers.length; i++) {
                    answers[i].removeEventListener('click', doAction);
                 }
              }
              function markCorrect(elem) {
                 elem.classList.add('correct');
              }
              function markInCorrect(elem) {
                 elem.classList.add('incorrect');
              }
              function clearClass(){
                 for (let i = 0; i < answers.length; i++) {
                     answers[i].classList.remove('correct');
                     answers[i].classList.remove('incorrect');    
                  }
              }
              
             restart.addEventListener('click', function (event) {
                 event.preventDefault();
             
                 index = 0;
                 points = 0;
                 let userScorePoint = document.querySelector('.score');
                 userScorePoint.innerHTML = points;
                 setQuestion(index);
                 activateAnswers();
                 list.style.display = 'block';
                 results.style.display = 'none';
             });
             
             function setQuestion(index) {
                 clearClass();
                 questionCounter.innerHTML = (index+1);
                 question.innerHTML = preQuestions[index].question;
              
                 answers[0].innerHTML = preQuestions[index].answers[0];
                 answers[1].innerHTML = preQuestions[index].answers[1];
                 answers[2].innerHTML = preQuestions[index].answers[2];
                 answers[3].innerHTML = preQuestions[index].answers[3];
             
                 if (preQuestions[index].answers.length === 2) {
                     answers[2].style.display = 'none';
                     answers[3].style.display = 'none';
                 } else {
                     answers[2].style.display = 'block';
                     answers[3].style.display = 'block';
                 }
              
              }
              
              restart.addEventListener('click', function () {
                 results.style.display = 'none';
                 list.style.display = 'block';
                 points = 0;
                 index = 0;
                 setQuestion(index);
              });
              
             next.addEventListener('click', function () {
                 index++;
                 if (index >= preQuestions.length) {
                     list.style.display = 'none';
                     results.style.display = 'block';
                     userScorePoint.innerHTML = points;
                     let games = localStorage.getItem("games");
                     let pointsLocalStorage = localStorage.getItem("points");
                     if(games===null){
                         localStorage.setItem("games", "1");
                         localStorage.setItem("points", points);
                     }else{
                         games = parseInt(games) + 1;
                         pointsLocalStorage = parseFloat(pointsLocalStorage);
                         let avg = (pointsLocalStorage+points)/games;
                         avg = Math.round(avg * 1000)/1000;
                         localStorage.removeItem("games");
                         localStorage.removeItem("points");
                         localStorage.setItem("games", games);
                         localStorage.setItem("points", avg);
                         average.innerHTML = avg;
                     }
                 } else {
                     setQuestion(index);
                     activateAnswers();
                 }
              
              });
              
             previous.addEventListener('click', function () {
                 if(index === 0){
                     return;
                 }else{
                     index--;
                     setQuestion(index);
                 }
                 activateAnswers();
              });
              

        });
    }, 250);
 });
         
promise.then((response) => {
    console.log("Test! " + response);
    
});

