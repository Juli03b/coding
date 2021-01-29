const movies = [];
$('form').on('submit', function(e){
    e.preventDefault()
    const titleInput = $('#title-input'), ratingInput = $('#rating-input'), tableRow = $('table tr');
    if(titleInput.val() && ratingInput.val()){
        movies.push([titleInput[0] , ratingInput[0]]);
        $('table tr').append(`<td class= movie-review > <button>x</button> Title: ${titleInput.val()} Rating: <b>${ratingInput.val()}<b></td>`)
    }
})

$('table').on('click', 'button', function(){
    $(this).parent().remove()
})

$('div input').eq(0).on('change', function(){
    if($(this).prop('checked')){
        //     if($('div input').eq(1).prop('checked') ){
        //         console.log($('form td'))
        // }else{
        //     $('div input').eq(1).text('Sort from A to Z')
            
        // }
        sortAlphabetically()
    }
})

const sortAlphabetically = () => {
    movies.sort((a, b) => {
        if (a[0].value  > b[0].value) {
            return -1;
        }
        if (b[0].value > a[0].value ) {
            return 1;
        }
        return 0;
    })
}