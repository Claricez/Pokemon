const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type; //Recebendo os gets

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  pokemon.species = pokeDetail.species;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name);
  const [ability] = abilities;
  pokemon.abilities = abilities;
  pokemon.ability = ability;
  return pokemon;
}
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};
pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  //Processamento assíncrono
  //Por padrão o fetch usa o get
  //Quando der certo rode a função o "then"
  //Do contrário o "catch"
  //E independente do sucesso ou fracasso, roda o "finally"
  return fetch(url)
    .then((response) => response.json()) //Convertendo para Json
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error));
};

pokeApi.getPokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return pokeApi.getPokemonDetail(url);
};


Promise.all([
  fetch("https://pokeapi.co/api/v2/pokemon/1"),
  fetch("https://pokeapi.co/api/v2/pokemon/2"),
]).then((responses) => Promise.all(responses.map(response => response.json())))
  .then((results) => {
    console.log(results);
  });