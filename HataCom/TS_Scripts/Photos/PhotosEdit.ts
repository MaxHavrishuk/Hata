import { PhotosDomElements } from './PhotosDomElements';

export class PhotosEdit {

    constructor() {
        this.init();
    }

    init(): void {
        document.addEventListener('DOMContentLoaded', () => {
            const photosDomElements = new PhotosDomElements();
            photosDomElements.editBtn.addEventListener('click', this.editStart);
            photosDomElements.popUpCancel.addEventListener('click', this.editCancel);
        });
    }

    editStart(): void { 
        const photosDomElements = new PhotosDomElements();
        photosDomElements.popUp.style.marginTop = '55px';
        photosDomElements.addBtn.style.display = 'none';
        photosDomElements.removeBtn.style.display = 'block';
    }

    editCancel(): void {
        const photosDomElements = new PhotosDomElements();
        photosDomElements.popUp.style.marginTop = '-55px';
        photosDomElements.addBtn.style.display = 'block';
        photosDomElements.removeBtn.style.display = 'none';
    }
}