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



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modal1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function showChangeNameModule() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}