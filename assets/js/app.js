function resetOpacity(game1,game2,game3,game4){
    game1.style.opacity=0;
    game2.style.opacity=0;
    game3.style.opacity=0;
    game4.style.opacity=0;
}
function resetZindex(game1,game2,game3,game4){
    game1.style.zIndex=-100;
    game2.style.zIndex=-100;
    game3.style.zIndex=-100;
    game4.style.zIndex=-100;
}
function setGame(game){
    game.style.opacity=1;
    game.style.zIndex=100;
}
function setAll(ev,game1,game2,game3,game4){
    ev.preventDefault();
    resetOpacity(game1,game2,game3,game4);
    resetZindex(game1,game2,game3,game4);
}
function showContent(intro,game1,game2,game3,game4){
    intro.addEventListener("click",ev => {
        if(ev.target.matches('#intro .overlay.first a')){
            setAll(ev,game1,game2,game3,game4);
            setGame(game1)
        }
        if(ev.target.matches('#intro .overlay.second a')){
            setAll(ev,game1,game2,game3,game4);
            setGame(game2)

        }
        if(ev.target.matches('#intro .overlay.third a')){
            setAll(ev,game1,game2,game3,game4);
            setGame(game3)
        }
        if(ev.target.matches('#intro .overlay.fourth a')){
            setAll(ev,game1,game2,game3,game4);
            setGame(game4)
        }
    })
}

(function (){
    let intro = document.getElementById('intro');
    let game1 = document.querySelector('#intro .intro-second .game1');
    let game2 = document.querySelector('#intro .intro-second .game2');
    let game3 = document.querySelector('#intro .intro-second .game3');
    let game4 = document.querySelector('#intro .intro-second .game4');
    showContent(intro,game1,game2,game3,game4);
})();