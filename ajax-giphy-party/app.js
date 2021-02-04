console.log("Let's get this party started!!!!");

async function searchGif (q) {
    const req = await axios.get('https://api.giphy.com/v1/gifs/search', {params : {q , api_key : 'pfWyPGBsBX97BEFl8QMx2hhusSXNNQ89', limit: 1}})
    return req;
  }

async function rndGif (tag) {
  const req = await axios.get('https://api.giphy.com/v1/gifs/random', {params : {tag , api_key : 'pfWyPGBsBX97BEFl8QMx2hhusSXNNQ89'}})
  return req;
}

const appendGif = (url) => {
  const classVal = `col-4 d-inline-block rounded mx-auto p-2 `
  $('#gif-div').append(`<img class=${classVal} src=${url}></img>`)
}

$('#search-form').on('submit', async function (e) {
  e.preventDefault();
  const res = await searchGif($('#search-input').val());

  appendGif(res.data.data['0'].images.original.url);
  })

$('#rnd-gif-btn').on('click', async function(e){
  const res = await rndGif($('#search-input').val());

  appendGif(res.data.data.images.original.url);
})

$("#clear-btn").on('click', function(e){
  $('#gif-div').html('')
})