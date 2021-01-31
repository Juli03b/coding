const movies = [];
$('form').on('submit', function(e){
    e.preventDefault()
    const titleInput = $('#title-input'), ratingInput = $('#rating-input'), tableRow = $('table tr');
    if(titleInput.val() && ratingInput.val()){
        movies.push([titleInput[0] , ratingInput[0]]);
        $('#rev').append(`<div id='review' class = 'col-2 d-inline-block p-4'> <button class='btn btn-danger btn-sm'>x</button> Title: ${titleInput.val()} <p style='text-indent:20px' class='d-inline-block'> Rating: <b style='color: gold'>${ratingInput.val()}<b> </p></div>`)
    }
})



$('#rev').on('click', 'button', function(){
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