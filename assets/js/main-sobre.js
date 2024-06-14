const pokemonSobre = document.getElementById('pokemon-sobre')



function pokemon(id){
    pokeApi.getPokemon(id).then((pokemon) => {
const pokemonSobre = document.getElementById('pokemon-sobre')
    const newHtml = `
        <div class="image-pokemon pokemon-item" data-id="${pokemon.number}">
<img src="${pokemon.photo}"/>
</div>

<div class="details">
<h2>${pokemon.name}</h2>
<div class="details-list">
<ol class="types" >
 ${pokemon.abilities
          .map((ability) => `<li class="type ${ability}">${ability}</li>`)
          .join("")}

</ol>
</div>
</div>`
 }).join("");
pokemonSobre.innerHTML += newHtml;


}

