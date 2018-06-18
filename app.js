/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0,0];
var roundScore = 0;
var activePLayer = 0;
var gamePlaying = true;

var player1 = prompt("Nombre del jugador 1:");
var player2 = prompt("Nombre del jugador 2:");


init();

// Tirar dado
$('.btn-roll').bind('click', function (){
        if (gamePlaying) {  
        // 1 - Tirar dado
        var dice = Math.floor(Math.random() * 6) + 1;
        // 2 - Mostrar resultado
        var diceDOM = $('.dice');
        diceDOM.css('display','block');
        diceDOM.attr('src','dice-' + dice + '.png');
        // Cambiar de jugador si el número es 1
        if (dice !== 1) {
                // Sumar al marcador
                roundScore += dice;
                $('#current-' + activePLayer).text(roundScore); 
        }else{
        // Siguiente jugador
        nextPlayer();
        }};
});
$('.btn-hold').bind('click', function () {
        if (gamePlaying) {
        // Agregar resultado del tiro al GLOBAL
        scores[activePLayer] += roundScore;
        // Actualizar la UI
        $('#score-' + activePLayer).text(scores[activePLayer]);
        // Revisar si gano
        if (scores[activePLayer] >= 10) {
                $('#name-'+activePLayer).text('Ganador!');
                $('.dice').css('display','none');
                $('.player-'+activePLayer+'-panel').addClass('winner');
                gamePlaying = false;
        } else {
        // Siguiente jugador
        nextPlayer();
        };        
        };
})

function nextPlayer() {
        // Siguiente jugador
        activePLayer === 0 ? activePLayer = 1 : activePLayer = 0;
        roundScore = 0;
        $('#current-0').text('0');
        $('#current-1').text('0');
        $('.player-0-panel').toggleClass('active');
        $('.player-1-panel').toggleClass('active'); 
        // Ocultar dado
        $('.dice').css('display','none');
};

$('.btn-new').on('click',init);

function init() {
        scores = [0,0];
        activePLayer = 0;
        roundScore = 0; 
        gamePlaying = true;
        // Ocultar imagen Dado
        $('.dice').hide();
        // Player 1 y 2 resultado en 0
        $('#score-0').text('0');
        $('#score-1').text('0');
        // Player 1 y 2 acumulado en 0
        $('#current-0').text('0');
        $('#current-1').text('0');
        $('#name-0').text(player1);
        $('#name-1').text(player2);
        $('.player-0-panel').removeClass('winner');
        $('.player-1-panel').removeClass('winner');
        // Deja al Player 1 como jugador Activo
        $('.player-0-panel').removeClass('active');
        $('.player-1-panel').removeClass('active');
        $('.player-0-panel').addClass('active'); 
}