// Pobranie elementu
let button = document.querySelector('.scroll');

//dodanie listenera, odpowiedzialnego za uruchomienie akcji
button.addEventListener('click', goToTop);

//zdefiniowane funkcji (callback), uruchamianej po kliknięciu w przycisk
function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//dodanie funkcji odpowiedzialnej za pojawianie się przycisku po zjechaniu 200px w dół
function showTopButton() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.querySelector(".scroll").style.display = "block";
    } else {
        document.querySelector(".scroll").style.display = "none";
    }
}

window.onscroll = function() {showTopButton()};

