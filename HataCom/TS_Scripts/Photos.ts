/** Album Edit */
class PhotoAlbumEdit {

    constructor() {
        this.init();
    }

    init(): void {
        document.addEventListener('DOMContentLoaded', () => {
            const editAlbumBtn = document.querySelector('.edit-album-btn') as HTMLDivElement
            editAlbumBtn.addEventListener('click', this.editStart);

            const popUpCancel = document.querySelector('.pop-up-cancel') as HTMLDivElement;
            popUpCancel.addEventListener('click', this.editCancel);
        });
    }

    editStart(): void {
        const popUp = document.querySelector('.pop-up') as HTMLDivElement
        popUp.style.marginTop = '55px';

        const addPhotoBtn = document.querySelector('.add-photo-btn') as HTMLDivElement;
        addPhotoBtn.style.display = 'none';

        const removePhotoBtn = document.querySelector('.remove-photo-btn') as HTMLDivElement;
        removePhotoBtn.style.display = 'block';
    }

    editCancel(): void {
        const popUp = document.querySelector('.pop-up') as HTMLDivElement;
        popUp.style.marginTop = '-55px';

        const addPhotoBtn = document.querySelector('.add-photo-btn') as HTMLDivElement;
        addPhotoBtn.style.display = 'block';

        const removePhotoBtn = document.querySelector('.remove-photo-btn') as HTMLDivElement;
        removePhotoBtn.style.display = 'none';
    }

}

/** Display size */
class DisplaySize {

    constructor() {
        this.displayChange();
    }

    displayChange(): void {
        window.addEventListener('load', (): void => {

            let clientWidth = document.body.clientWidth;
            let clientHeight = (screen.height - 55).toString() + 'px';

            let mainContainer = document.querySelector('.main-container') as HTMLDivElement;
            mainContainer.style.minHeight = clientHeight;

            if (clientWidth < 576) {
                this.addClass();
            } else if (clientWidth > 575) {
                this.removeClass();
            }
        });
        window.addEventListener('resize', (): void => {

            let clientWidth = document.body.clientWidth;
            let clientHeight = (screen.height - 55).toString() + 'px';

            let mainContainer = document.querySelector('.main-container') as HTMLDivElement;
            mainContainer.style.minHeight = clientHeight;

            if (clientWidth < 576) {
                this.addClass();
            } else if (clientWidth > 575) {
                this.removeClass();
            }
        });
    }

    addClass(): void {

        const addPhotoBtn = document.querySelector('.add-photo-btn') as HTMLDivElement;
        addPhotoBtn.classList.add('add-photo-btn-mobile');
        addPhotoBtn.innerHTML = '<i class="fas fa-plus"></i>';

        const editAlbumBtn = document.querySelector('.edit-album-btn') as HTMLDivElement;
        editAlbumBtn.classList.add('edit-album-btn-mobile');
        editAlbumBtn.innerHTML = '<i class="fas fa-cog">';

        const removePhotoBtn = document.querySelector('.remove-photo-btn') as HTMLDivElement;
        removePhotoBtn.classList.add('remove-photo-btn-mobile');
        removePhotoBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    }

    removeClass(): void {
        const addPhotoBtn = document.querySelector('.add-photo-btn') as HTMLDivElement;
        addPhotoBtn.classList.remove('add-photo-btn-mobile');
        addPhotoBtn.innerHTML = 'Додати фото';

        const editAlbumBtn = document.querySelector('.edit-album-btn') as HTMLDivElement;
        editAlbumBtn.classList.remove('edit-album-btn-mobile');
        editAlbumBtn.innerHTML = '<i class="fas fa-cog mr-2"></i>' + 'Редагування';

        const removePhotoBtn = document.querySelector('.remove-photo-btn') as HTMLDivElement;
        removePhotoBtn.classList.remove('remove-photo-btn-mobile');
        removePhotoBtn.innerHTML = 'Видалити фото';
    }
}

const photoAlbumEdit = new PhotoAlbumEdit();
const displaySize = new DisplaySize();
