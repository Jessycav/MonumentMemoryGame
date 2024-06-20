// Définir le tableau des 8 images à utiliser pour le jeu
const cards = [
    'images/alhambra_grenade.jpg',
    'images/colisee.jpg',
    'images/grande_muraille.jpg',
    'images/maison_blanche.jpg',
    'images/parlement_budapest.jpg',
    'images/temple_dor_kyoto.jpg',
    'images/tour_eiffel1.jpg',
    'images/tower_bridge.jpg'
];

const defaultImage = 'images/interrogation.jpg';

// Récupérer l'espace de jeu 
const gameBoard = document.getElementById('game-board');

// Créer une variable pour stocker les paires 
let selectedCards = [];

// Créer les cartes 
function createCard(cardSource) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardSource;

// Ajouter le contenu de la carte 
    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = cardSource;

    card.appendChild(cardContent);

    card.addEventListener('click', onCardClick);
    return card;
}

// Dupliquer les images 
function duplicateArray(arraySimple) {
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);

    return arrayDouble;
}

function shuffleArray(arrayToshuffle) {
// Trier le tableau 
    const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
    return arrayShuffled;
}
// Afficher la carte au clic 
function onCardClick(e) {
    const card = e.target.parentElement
    card.classList.add('flip')
    
// Vérifier des paires 
    selectedCards.push(card);
    //Définir le nombre de cartes à comparer 
    if(selectedCards.length == 2){
        setTimeout(() => {
        // Comparer les cartes sélectionnées 
        if(selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
            // Paire trouvée 
            selectedCards[0].classList.add("matched");
            selectedCards[1].classList.add("matched");
            selectedCards[0].removeEventListener('click', onCardClick);
            selectedCards[1].removeEventListener('click', onCardClick);
            
            const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)');
            console.log(allCardsNotMatched.length);
            if(allCardsNotMatched.length == 0){
                // Le joueur a gagné 
                alert`
                <span class="success-text">
                    BRAVO ! Vous avez gagné !<br />
                </span>
                `
            }
        }
        else {
            // Paire non trouvée 
            selectedCards[0].classList.remove("flip");
            selectedCards[1].classList.remove("flip");    
        }
        selectedCards = [];
        }, 700);
    }
}

let allCards = duplicateArray(cards);
// Mélanger le tableau 
allCards = shuffleArray(allCards);

// Parcourir le tableau, créer une carte et l'ajouter à l'espace de jeu 
allCards.forEach(card => {
    const cardHtml = createCard(card);
    gameBoard.appendChild(cardHtml);
})




