// Verifique se o script está sendo executado na página correta
if (window.location.pathname.includes('sobre-pokemon.html')) {
    const pokemonSobre = document.getElementById('pokemon-sobre');

    function getPokemonIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    function displayPokemon(id) {
        pokeApi.getPokemon(id).then((pokemon) => {
            console.log('Fetched Pokémon details:', pokemon); // Adicionando log para verificar os detalhes do Pokémon
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

    const pokemonId = getPokemonIdFromUrl();
    console.log('Pokemon ID from URL:', pokemonId); // Adicionando log para verificar o ID do Pokémon
    if (pokemonId) {
        displayPokemon(pokemonId);
    } else {
        console.error('ID do Pokémon não encontrado na URL.');
    }
}
