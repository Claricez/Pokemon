document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('sobre-pokemon.html')) {
        console.log('Script executado na página correta.');

        const pokemonSobre = document.getElementById('pokemon-sobre');
        if (!pokemonSobre) {
            console.error('Elemento com ID "pokemon-sobre" não encontrado na página.');
            return;
        }

        function getPokemonIdFromLocalStorage() {
            const id = localStorage.getItem('selectedPokemonId');
            console.log('ID do Pokémon obtido do local storage:', id);
            return id;
        }

        function displayPokemon(id) {
            pokeApiSobre.getPokemon(id).then((pokemon) => {
                console.log('Fetched Pokémon details:', pokemon);
                const newHtml = `
                    <div class="image-pokemon pokemon-item" data-id="${pokemon.number}">
                        <img src="${pokemon.photo}" alt="${pokemon.name}" />
                    </div>
                    <div class="details">
                        <h2>${pokemon.name}</h2>
                        <div class="details-list">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                        <p>Number: ${pokemon.number}</p>
                        <p>Type: ${pokemon.type}</p>
                        <p>Height: ${pokemon.height}</p>
                        <p>Weight: ${pokemon.weight}</p>
                        <p>Abilities: ${pokemon.abilities.join(', ')}</p>
                    </div>`;
                
                pokemonSobre.innerHTML = newHtml;
            }).catch((error) => {
                console.error('Error fetching Pokémon details:', error);
            });
        }

        const pokemonId = getPokemonIdFromLocalStorage();
        console.log('Pokemon ID from local storage:', pokemonId);
        if (pokemonId) {
            displayPokemon(pokemonId);
        } else {
            console.error('ID do Pokémon não encontrado no local storage.');
        }
    } else {
        console.log('Script não está na página correta. Caminho da página:', window.location.pathname);
    }
});
