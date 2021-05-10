window.addEventListener('load', () => {
    registerServiceWorker();
});

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./service-worker.js');
        } catch (e) {
            console.log(`Service worker registration failed`);
        }
    }
}

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