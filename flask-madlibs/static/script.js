const RGB_GEN = () => {
    const R = Math.round(Math.random() * 255 ), G = Math.round(Math.random() * 255 ), B = Math.round(Math.random() * 255 );
    return `rgb(${R},${G},${B})`;
}

$('#story').css('color', RGB_GEN());
$('#story').css('-webkit-text-stroke-width', '.5px');
$('#story').css('-webkit-text-stroke-color', RGB_GEN());