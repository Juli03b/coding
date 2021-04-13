const getRandomItems = (arr, amt) => {
    const arrLen = arr.length;
    const ranItms = [];

    for (let i = 0; i < amt; i++) {
        const ranIdx = Math.floor(Math.random() * arrLen);
        
        ranItms.push(arr[ranIdx]);
    }

    return ranItms;
}
const pokes = [];
const $pokeDiv = $('#pokemon-div')

axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then(data => {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${data.data.count}`);
    })
    .then(data => {
        const pokemons = data.data.results;
        const randomPokemons = getRandomItems(pokemons, 3);
        const reqs = [];
        
        for(poke of randomPokemons) {
            reqs.push(axios.get(poke.url));
        }

        return Promise.all(reqs);
    })
    .then(data => {
        console.log(data, 'data');
        const species = [];

        for(pokemon of data){
            console.log(pokemon, 'pokkee');

            pokes.push({name: pokemon.data.name, img: pokemon.data.sprites.other.dream_world.front_default || 
                pokemon.data.sprites.other["official-artwork"].front_default})
            species.push(axios.get(pokemon.data.species.url));
        }
        console.log(species);
        return Promise.all(species);
    })
    .then(data => {        
        for (let i = 0; i < data.length; i++){
            let description;

            for(val of data[i].data.flavor_text_entries){
                if (val.language.name === "en"){
                    description = val.flavor_text;
                }
            }

            console.log(`${pokes[i].name}: ${description}`)
            
            $pokeDiv.append(`
            <div class="bg-dark badge text-wrap col-4 rounded-0">
                <img src="${pokes[i].img}" width="250"></img>
                <p>${pokes[i].name}</p>
                <p>${description}</p>
            </div>`)
        }
    });