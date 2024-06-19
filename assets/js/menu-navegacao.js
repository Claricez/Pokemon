document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('sobre-pokemon.html')) {
        console.log('Script executado na página correta.');

        const pokemonSobre = document.getElementById('pokemon-sobre');
        const menu = document.getElementById('menu');
        if (!pokemonSobre) {
            console.error('Elemento com ID "pokemon-sobre" não encontrado na página.');
            return;
        }

        function getPokemonIdFromLocalStorage() {
            const id = localStorage.getItem('selectedPokemonId');
            console.log('ID do Pokémon obtido do local storage:', id);
            return id;
        }

     


function menuBar(id) {
    menu.getPokemon(id).then((pokemon) => {
    const newHtml = `
        <div class="${pokemon.type}">
            <div class="menu-navigation">
                <a href="../../index.html">Retornar</a>
                <p class="number-pokemon" id="pokemon-number">#${pokemon.number}</p>
                <a>Like</a>
            </div>
        </div>
    `;
    menu.innerHTML = newHtml;
})
}
})