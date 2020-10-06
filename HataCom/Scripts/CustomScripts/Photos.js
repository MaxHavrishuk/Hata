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
    document.querySelector('.add-photo-btn').classList.add('add-photo-btn-mobile');
    document.querySelector('.add-photo-btn').innerHTML = '<i class="fas fa-image"></i>';

    document.querySelector('.edit-album-btn').classList.add('edit-album-btn-mobile');
    document.querySelector('.edit-album-btn').innerHTML = '<i class="fas fa-cog">';
}

function removeClass() {
    document.querySelector('.add-photo-btn').classList.remove('add-photo-btn-mobile');
    document.querySelector('.add-photo-btn').innerHTML = 'Додати фото';

    document.querySelector('.edit-album-btn').classList.remove('edit-album-btn-mobile');
    document.querySelector('.edit-album-btn').innerHTML = 'Редагувати альбом';
}

console.log(document.querySelector('.album-description').innerHTML.trim().length);