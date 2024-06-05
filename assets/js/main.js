
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

//Processamento assíncrono
//Por padrão o fetch usa o get
//Quando der certo rode a função o "then"
//Do contrário o "catch"
//E independente do sucesso ou fracasso, roda o "finally"

function convertPokemonToLi(pokemon) {
    return`
    <li class="pokemon">
          <span class="number">#001</span>
          <span class="name">${pokemon.name}</span>

          <div class="details">
            <ol class="types">
              <li class="type">grass</li>
              <li class="type">poison</li>
            </ol>

            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
              alt=${pokemon.name}
            />
          </div>
        </li>
    `
}

const pokemonList = document.getElementById('pokemonList')


fetch(url)
.then ((response) => response.json())
.then((jsonBody)=> jsonBody.results) //Convertendo para Json
.then((pokemons) => {
    
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
       pokemonList.innerHTML += convertPokemonToLi(pokemon)
       
    }
}) 
.catch ((error) => console.log(error))
