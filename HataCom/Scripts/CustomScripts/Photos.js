// #Display size event
window.addEventListener('load', () => {

    let clientWidth = document.body.clientWidth;
    let clientHeight = (screen.height - 55).toString() + 'px';
    document.querySelector('.main-container').style.minHeight = clientHeight;
    console.log(clientHeight);
    if (clientWidth < 576) {
        addClass();
    } else if (clientWidth > 575) {
        removeClass();
    }
});

window.addEventListener('resize', () => {

    let clientWidth = document.body.clientWidth;
    let clientHeight = (screen.height - 55).toString() + 'px';
    document.querySelector('.main-container').style.minHeight = clientHeight;

    if (clientWidth < 576) {
        addClass();
    } else if (clientWidth > 575) {
        removeClass();
    }
});

function addClass() {
    document.querySelector('.edit-album-btn').classList.add('edit-album-btn-mobile');
    document.querySelector('.edit-album-btn').innerHTML = '<i class="fas fa-cog"></i>';
}

function removeClass() {
    document.querySelector('.edit-album-btn').classList.remove('edit-album-btn-mobile');
    document.querySelector('.edit-album-btn').innerHTML = 'Редагувати альбом';
}