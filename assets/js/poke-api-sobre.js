const pokeApiSobre = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.types = types;
    pokemon.type = types[0];

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name);
    pokemon.abilities = abilities;
    pokemon.ability = abilities[0];

    return pokemon;
}

pokeApiSobre.getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};
