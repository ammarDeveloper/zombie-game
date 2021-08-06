let cross = true;
let score = 0;
let audiogo = new Audio('music/sfx-defeat4.mp3');
let gamemusic = new Audio('music/untamed-land-948.mp3');
let game_Over = false;
setInterval(() => {
    let windowwidth = window.innerWidth;


    if(windowwidth <= 780){
        let zoombie = document.querySelector('.zoombie');
        zoombie.classList.remove('zoombie-move');
        let win = document.querySelector('.window-err');
        win.style.visibility = 'visible';
        let game_win = document.querySelector('.game-background');
        game_win.style.visibility = 'hidden';
        document.querySelector('.game-over').style.visibility = 'hidden';
    } else {
        let win = document.querySelector('.window-err');
        win.style.visibility = 'hidden';
        let game_win = document.querySelector('.game-background');
        game_win.style.visibility = 'visible';
        document.onkeydown = function(e){
            if(e.keyCode == 38 && !game_Over){
                gamemusic.play();
                let char = document.querySelector('.char');
                char.classList.add('animateChar');
                setTimeout(() => {
                    char.classList.remove('animateChar');
                }, 800);
            }
         
            if(e.keyCode === 39 && !game_Over){
                gamemusic.play();
                let char = document.querySelector('.char');
                let cx = parseInt(window.getComputedStyle(char, null).getPropertyValue('left'));
                char.style.transform = 'scale(1, 1)';
                char.style.left = cx + 100+"px";
            }
        
            if(e.keyCode === 37 && !game_Over){
                gamemusic.play();
                let char = document.querySelector('.char');
                let cx = parseInt(window.getComputedStyle(char, null).getPropertyValue('left'));
                char.style.transform = 'scale(-1, 1)';
                char.style.left = cx - 100 + "px";
            }
        }
        
        setInterval(() => {
            let char = document.querySelector('.char');
            let gameOver = document.querySelector('.game-over');
            let zoombie = document.querySelector('.zoombie');
        
            let cx = parseInt(window.getComputedStyle(char, null).getPropertyValue('left'));
            let cy = parseInt(window.getComputedStyle(char, null).getPropertyValue('bottom'));
        
            let zx = parseInt(window.getComputedStyle(zoombie, null).getPropertyValue('left'));
            let zy = parseInt(window.getComputedStyle(zoombie, null).getPropertyValue('bottom'));
        
            let offsetX = Math.abs(cx - zx);
            let offsetY = Math.abs(cy - zy);
        
        
            if(offsetX < 67 && offsetY < 100){
                gameOver.style.visibility = 'visible';
                zoombie.classList.remove('zoombie-move');
                document.querySelector('.char').style.left = 65+"px";
                game_Over = true;
                gamemusic.pause();
                audiogo.play();
                setTimeout(() => {
                    audiogo.pause();
                }, 2000);

            } else if(offsetX < 66 && cross){
                score++;
                document.querySelector('.score').innerHTML = `Your score: ${score}`;
                cross = false;
                setTimeout(() => {
                    cross = true;
                }, 1000);
        
                let zoombie_move = document.querySelector('.zoombie-move');
                let animation_duration = parseFloat(window.getComputedStyle(zoombie_move).getPropertyValue('animation-duration'))
                if(score % 10 === 0){
                    setTimeout(() => {
                        animation_duration = animation_duration + 0.1+'s';
                        zoombie_move.style.animationDuration = animation_duration;
                    }, 500);
                }
            }
        }, 100);
    }
}, 1000);