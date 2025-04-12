const filterButtons = document.querySelectorAll('.filter-button button');
const filterableCards = document.querySelectorAll('.filterable-cards .card');

const filterCards = e => {
    document.querySelector('.filter-active').classList.remove('filter-active');
    e.target.classList.add('filter-active');
    
    filterableCards.forEach(card => {
        card.classList.add('hide');

        if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === 'all') {
            card.classList.remove('hide');
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', filterCards);
});
