const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
   
    const newHtml = pokemons
      .map(
        (pokemon) => ` <li data-id="${pokemon.number}" class="pokemon ${pokemon.type} pokemon-item">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="details">
      <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
      </ol>

      <img
        src="${pokemon.photo}"
        alt=${pokemon.name}
      />
    </div>
  </li>`
      )
      .join("");
      
    pokemonList.innerHTML += newHtml;
    addClickEventToPokemonItems();
  });
}
function addClickEventToPokemonItems() {
  const pokemonItems = document.querySelectorAll('.pokemon-item');
  pokemonItems.forEach(item => {
      item.addEventListener('click', () => {
          const id = item.getAttribute('data-id');
          console.log('ID do Pokémon:', id);
          localStorage.setItem('selectedPokemonId', id);  // Armazenar o ID no local storage
          window.location.href = `sobre-pokemon.html`; // Redirecionar sem o parâmetro de ID
      });
  });
}
//Carregar mais pokemons
loadPokemonItens(offset, limit);
loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;
  if (qtdRecordNextPage > maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});



