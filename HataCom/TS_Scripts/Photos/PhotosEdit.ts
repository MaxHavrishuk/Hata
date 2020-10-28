export class PhotosEdit {

    constructor() {
        this.init();
    }

    init(): void {
        document.addEventListener('DOMContentLoaded', () => {
            const editAlbumBtn = document.querySelector('.edit-album-btn') as HTMLDivElement;
            editAlbumBtn.addEventListener('click', this.editStart);

            const popUpCancel = document.querySelector('.pop-up-cancel') as HTMLDivElement;
            popUpCancel.addEventListener('click', this.editCancel);
        });
    }

    editStart(): void {
        const popUp = document.querySelector('.pop-up') as HTMLDivElement;
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