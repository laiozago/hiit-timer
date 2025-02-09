//pegar o tempoTotal do localStorage
let tempoTotal = localStorage.getItem('tempoTotal');

//colocar no id tempoTotal o tempoTotal
document.getElementById('tempoTotal').innerHTML = tempoTotal;

//botão de volta para setHiit.html
document.getElementById('startPauseBtn').addEventListener('click', function(){
    window.location.href = 'setHiit.html';
});