document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('sobre-pokemon.html')) {
        console.log('Script executado na página correta.');

        const pokemonSobre = document.getElementById('pokemon');
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
                <div >
                    <div class="menu-navigation">
                    <a href="../../index.html">Retornar</a>
                      <p class="id-pokemon">#${pokemon.number}</p>
                    <a>Like</a>
                </div>
                <div class="content-details" id="pokemon-sobre">
                    <div class="image-pokemon pokemon-item" data-id="${pokemon.number}">
                        <img src="${pokemon.photo}" alt="${pokemon.name}" class="photo-pokemon"/>
                    </div>
                    <h2>${pokemon.name}</h2>
                        <div class="details-list">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                </div>
                <div class="description-content ${pokemon.type}">
                    <p class="about-title">About</p>
                    <div class="details">
                        
                      
                        <p><b>Type:</b> ${pokemon.type}</p>
                        <p><b>Height: </b> ${pokemon.height}</p>
                        <p><b>Weight:</b> ${pokemon.weight}</p>
                        <p><b>Abilities:</b> ${pokemon.abilities.join(', ')}</p>
                    </div>
                </div>
                </div>
                    `
                    
                
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
