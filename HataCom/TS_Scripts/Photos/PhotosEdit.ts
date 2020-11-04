import { PhotosDomElements } from './PhotosDomElements';

export class PhotosEdit {

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
        photosDomElements.albumName.style.display = 'none';
        photosDomElements.albumNameEditing.style.display = 'block';
        photosDomElements.albumDescription.style.display = 'none';
        photosDomElements.albumDescriptionEditing.style.display = 'block';
        photosDomElements.addBtn.style.display = 'none';
        photosDomElements.removeBtn.style.display = 'block';
    }

    editCancel(): void {
        const photosDomElements = new PhotosDomElements();
        photosDomElements.popUp.style.marginTop = '-55px';
        photosDomElements.albumName.style.display = 'block';
        photosDomElements.albumNameEditing.style.display = 'none';
        photosDomElements.albumDescription.style.display = 'block';
        photosDomElements.albumDescriptionEditing.style.display = 'none';
        photosDomElements.addBtn.style.display = 'block';
        photosDomElements.removeBtn.style.display = 'none';
    }
}