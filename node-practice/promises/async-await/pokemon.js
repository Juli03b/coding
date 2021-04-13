const getRandomItems = (arr, amt) => {
    const arrLen = arr.length;
    const ranItms = [];

    for (let i = 0; i < amt; i++) {
        const ranIdx = Math.floor(Math.random() * arrLen);
        
        ranItms.push(arr[ranIdx]);
    }

    return ranItms;
}
const $pokeDiv = $('#pokemon-div')

async function appendPokemon(){
    const pokemonData = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const {data: allPokemon} = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${pokemonData.data.count}`);
    const randomPokemon = getRandomItems(allPokemon.results, 3);
    const pokemonDetailsReqs = [];
    const speciesReqs = [];
    const pokes = [];
    
    for(poke of randomPokemon) {
        
        pokemonDetailsReqs.push(axios.get(poke.url));
    }

    console.log(pokemonDetailsReqs, 'data');
    const pokemon = await Promise.all(pokemonDetailsReqs);

    for(poke of pokemon){
        console.log(pokemon, 'pokkee');
        pokes.push({name: poke.data.name, img: poke.data.sprites.other.dream_world.front_default || 
            poke.data.sprites.other["official-artwork"].front_default});
        speciesReqs.push(axios.get(poke.data.species.url));
    }
    const species = await Promise.all(speciesReqs);
    console.log(species);
       
    for (let i = 0; i < species.length; i++){
        let description;
        for(val of species[i].data.flavor_text_entries){
            if (val.language.name === "en"){
                description = val.flavor_text;
            }
        }

        console.log(`${pokes[i].name}: ${description}`);
        
        $pokeDiv.append(`
        <div class="bg-dark badge text-wrap col-4 rounded-0">
            <img src="${pokes[i].img}" width="250"></img>
            <p>${pokes[i].name}</p>
            <p>${description}</p>
        </div>`);
    }
}

appendPokemon()