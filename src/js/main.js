// Preloader
$(window).on("load", function() {
    $(".loader").fadeOut();
})

// Connection module
$(document).ready(function() {
    $('.connection-module').hide();
});

function showConnectionModule() {
    $('.connection-module').show();
}