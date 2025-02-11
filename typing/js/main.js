const GAME_TIME = 5;

let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const btn = document.querySelector('.btn');

init();

function init() {
    btnChange('게임로딩중')
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

// 게임실행
function run() {
    if(isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME; //게임시작할때 항상 이 시간으로 초기화
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000); // 1초마다 카운트다운 실행
    checkInterval = setInterval(checkStatus, 50); // 0.5초마다 게임상태 체크
    btnChange('게임중');
}

function checkStatus() {
    if(!isPlaying && time === 0) {
        btnChange("게임시작");
        clearInterval(checkInterval);
    }
}

// 단어 불러오기
function getWords() {
    // axios 사용
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response){
            response.data.forEach((word) => {
                if(word.length < 10) {
                    words.push(word);
                }
            });
            btnChange('게임시작')
        })
        .catch(function (error){
            console.log(error);
        });
    btnChange("게임시작");
}

wordInput.addEventListener('input', checkMatch)

// 단어일치 체크
function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if(!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex]  
    }
}

function countDown() {
    // '삼항 연산자' (조건) ? 참일경우 : 거짓일경우
    time > 0 ? time -- : isPlaying = false; 
    
    // 시간 0전에 맞추면 checkMatch() 실행. 점수 오르고 시간 초기화, 새로운 단어 보여줌.
    // 시간 0이 되면 isPlaying = false -> checkStatus() 실행)

    if(!isPlaying) {
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;

    // 시간 0 되면 더이상 시간이 흐르지 않고 게임시작으로 바뀜, 다시 반복
}

function btnChange(text) {
    btn.innerText = text;
    text === '게임시작' 
        ? btn.classList.remove('loading') 
        : btn.classList.add('loading');
}