import { PhotosDomElements } from './PhotosDomElements';

export class PhotosAdapt {

    width: number;
    height: number;

    constructor() {
        this.width = document.body.clientWidth;
        this.height = screen.height;
    }

    init(): void {
        const photosDomElements = new PhotosDomElements();

        window.addEventListener('load', () => {
            this.width = document.body.clientWidth;
            this.height = screen.height;

            if (this.width < 576) {
                this.addClass();
            } else if (this.width > 575) {
                this.removeClass();
            }
        });

        window.addEventListener('resize', () => {
            this.width = document.body.clientWidth;
            this.height = screen.height;

            if (this.width < 576) {
                this.addClass();
            } else if (this.width > 575) {
                this.removeClass();
            }
        });

        // Height of main container
        photosDomElements.mainContainer.style.minHeight = (this.height - 55).toString() + 'px';
    }

    /** Add a new classes for mobile mode */
    addClass(): void {
        const photosDomElements = new PhotosDomElements();
        photosDomElements.addBtn.classList.add('add-photos-btn-mobile');
        photosDomElements.addBtn.innerHTML = '<i class="fas fa-plus"></i>';

        photosDomElements.editBtn.classList.add('edit-album-btn-mobile');
        photosDomElements.editBtn.innerHTML = '<i class="fas fa-cog">';

        photosDomElements.popUpRemove.classList.add('pop-up-remove-btn-mobile');
        photosDomElements.popUpRemove.innerHTML = '<i class="fas fa-trash-alt"></i>';

        photosDomElements.popUpSave.classList.add('pop-up-save-mobile');
        photosDomElements.popUpSave.classList.add('ml-3');
        photosDomElements.popUpSave.innerHTML = '<i class="fas fa-save"></i>';
    }

    /** Remove mobile mode classes */
    removeClass(): void {
        const photosDomElements = new PhotosDomElements();
        photosDomElements.addBtn.classList.remove('add-photos-btn-mobile');
        photosDomElements.addBtn.innerHTML = 'Додати фото';

        photosDomElements.editBtn.classList.remove('edit-album-btn-mobile');
        photosDomElements.editBtn.innerHTML = '<i class="fas fa-cog mr-2"></i>' + 'Редагування';

        photosDomElements.popUpRemove.classList.remove('pop-up-remove-btn-mobile');
        photosDomElements.popUpRemove.innerHTML = '<i class="fas fa-trash-alt mr-2"></i>' + 'Видалити фото';

        photosDomElements.popUpSave.classList.remove('pop-up-save-mobile');
        photosDomElements.popUpSave.innerHTML = '<i class="fas fa-save mr-2"></i>' + 'Зберегти';
    }
}