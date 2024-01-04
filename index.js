var tiles = [];
var userTilesInputs = [];
var level = 0;

//Création de la partie
$(document).keydown(function (e) { 
    if(level === 0)
    {
        generateTile();
        playTiles();
    }
});

//Jeu clique par clique
$('.btn').click(function (e) { 
    if(level > 0)
    {
        var color = e.currentTarget.id;

        //On fait l'animation du click
        animateButton(color);

        playAudio(color);
        
        //On ajoute la couleur aux inputs du joueur
        userTilesInputs.push(color);
        
        //Passer au niveau suivant ou game over
        checkGameOverOrNextLevel();
    }
});

/* Quand le joueur clique sur un bouton, on ajoute un effet de clique */
async function animateButton(buttonId)
{
    $('#'+buttonId).css('opacity', 0.2)
    await delay(200);
    $('#'+buttonId).css('opacity', 1);
}

/*S'arrête si le joueur s'est trompé, ou continue jusqu'à ce que le niveau soit complété*/
async function checkGameOverOrNextLevel()
{
    //On regarde si l'utilisateur a cliqué sur la bonne couleur
    for(var i=0; i<userTilesInputs.length; i++)
    {
        if(userTilesInputs[i] !== tiles[i])
        {
            playAudio('wrong');
            $('h1').text('Game is over! Press Any Key to Play Again.');
            //GAME OVER on reset le jeu
            level = 0;
            tiles = [];
            userTilesInputs = [];
        }
    }
    //Si la longueur des deux arrays est égale, alors le joueur a passé le niveau
    if((userTilesInputs.length === tiles.length) && tiles.length>0)
    {
        //Reset des inputs du joueur
        userTilesInputs = [];
        await delay(1000);
        //Ajout d'un niveau
        generateTile();
        playTiles();
    }
}

/*Jouer un audio*/
function playAudio(type)
{
    var audio = new Audio('./sounds/'+ type +'.mp3');
    audio.play();
}

/*Equivalent au niveau suivant*/
function generateTile()
{
    //Génère un tile entre 1 et 4
    var randomTile = Math.floor(Math.random()*4)+1;

    switch (randomTile) {
        case 1:
            randomTile = "green";
            break;
        case 2:
            randomTile = "red";
            break;
        case 3:
            randomTile = "yellow";
            break;
        case 4:
            randomTile = "blue";
            break;
    }

    //On ajoute ce nouveau tile à l'array
    tiles.push(randomTile);
    ++level;
    $('h1').text('Level '+level);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*Joue les tiles à la suite des un des autres*/
async function playTiles()
{
    for(var i=0; i<tiles.length; i++)
    {
        
        $('.'+tiles[i]).css('opacity', 0.2)
        await delay(600);
        $('.'+tiles[i]).css('opacity', 1)
        await delay(200);
    }
}