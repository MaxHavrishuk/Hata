/** Album Edit */
class PhotoAlbumEdit {
    constructor() {
        this.init();
    }
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const editAlbumBtn = document.querySelector('.edit-album-btn');
            editAlbumBtn.addEventListener('click', this.editStart);
            const popUpCancel = document.querySelector('.pop-up-cancel');
            popUpCancel.addEventListener('click', this.editCancel);
        });
    }
    editStart() {
        const popUp = document.querySelector('.pop-up');
        popUp.style.marginTop = '55px';
        const addPhotoBtn = document.querySelector('.add-photo-btn');
        addPhotoBtn.style.display = 'none';
        const removePhotoBtn = document.querySelector('.remove-photo-btn');
        removePhotoBtn.style.display = 'block';
    }
    editCancel() {
        const popUp = document.querySelector('.pop-up');
        popUp.style.marginTop = '-55px';
        const addPhotoBtn = document.querySelector('.add-photo-btn');
        addPhotoBtn.style.display = 'block';
        const removePhotoBtn = document.querySelector('.remove-photo-btn');
        removePhotoBtn.style.display = 'none';
    }
}
/** Display size */
class DisplaySize {
    constructor() {
        this.displayChange();
    }
    displayChange() {
        window.addEventListener('load', () => {
            let clientWidth = document.body.clientWidth;
            let clientHeight = (screen.height - 55).toString() + 'px';
            let mainContainer = document.querySelector('.main-container');
            mainContainer.style.minHeight = clientHeight;
            if (clientWidth < 576) {
                this.addClass();
            }
            else if (clientWidth > 575) {
                this.removeClass();
            }
        });
        window.addEventListener('resize', () => {
            let clientWidth = document.body.clientWidth;
            let clientHeight = (screen.height - 55).toString() + 'px';
            let mainContainer = document.querySelector('.main-container');
            mainContainer.style.minHeight = clientHeight;
            if (clientWidth < 576) {
                this.addClass();
            }
            else if (clientWidth > 575) {
                this.removeClass();
            }
        });
    }
    addClass() {
        const addPhotoBtn = document.querySelector('.add-photo-btn');
        addPhotoBtn.classList.add('add-photo-btn-mobile');
        addPhotoBtn.innerHTML = '<i class="fas fa-plus"></i>';
        const editAlbumBtn = document.querySelector('.edit-album-btn');
        editAlbumBtn.classList.add('edit-album-btn-mobile');
        editAlbumBtn.innerHTML = '<i class="fas fa-cog">';
        const removePhotoBtn = document.querySelector('.remove-photo-btn');
        removePhotoBtn.classList.add('remove-photo-btn-mobile');
        removePhotoBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    }
    removeClass() {
        const addPhotoBtn = document.querySelector('.add-photo-btn');
        addPhotoBtn.classList.remove('add-photo-btn-mobile');
        addPhotoBtn.innerHTML = 'Додати фото';
        const editAlbumBtn = document.querySelector('.edit-album-btn');
        editAlbumBtn.classList.remove('edit-album-btn-mobile');
        editAlbumBtn.innerHTML = '<i class="fas fa-cog mr-2"></i>' + 'Редагування';
        const removePhotoBtn = document.querySelector('.remove-photo-btn');
        removePhotoBtn.classList.remove('remove-photo-btn-mobile');
        removePhotoBtn.innerHTML = 'Видалити фото';
    }
}
const photoAlbumEdit = new PhotoAlbumEdit();
const displaySize = new DisplaySize();
