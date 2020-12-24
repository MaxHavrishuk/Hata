import { PhotosDomElements } from './PhotosDomElements';
import { AlbumToEdit } from './PhotosInterfaces';

const photosDomElements = new PhotosDomElements();

const dataToEdit: AlbumToEdit = {
    albumName: '',
    albumDescription: '',
    photosToEdit: []
};

const albumNameString: string = photosDomElements.albumName.innerHTML.trim();
const albumDescString: string = photosDomElements.albumDescription.innerHTML.trim();
let isPhotosTextAreaChanged = false;

export class PhotosEdit {

    init(): void {
        document.addEventListener('DOMContentLoaded', () => {
            // Start edit
            photosDomElements.editBtn.addEventListener('click', () => {
                this.startEdit();
                this.albumNameEdit();
                this.albumDescriptionEdit();
                this.photosNamesEdit();
                this.photosCheckboxesEdit();
                this.removeSelectedPhotos();
                this.saveChanges();
            });
            // Cancel edit
            photosDomElements.popUpCancel.addEventListener('click', this.cancelEdit);
        });
    }

    startEdit(): void {
        photosDomElements.albumName.style.display = 'none';
        photosDomElements.albumNameEditing.style.display = 'block';
        photosDomElements.albumDescription.style.display = 'none';
        photosDomElements.albumDescriptionEditing.style.display = 'block';
        photosDomElements.popUp.style.marginTop = '55px';
        photosDomElements.addBtn.style.display = 'none';
        photosDomElements.editBtn.style.display = 'none';
        photosDomElements.albumNameLabel.style.display = 'block';
        photosDomElements.albumDescriptionLabel.style.display = 'block';
        photosDomElements.breadCrumb.style.opacity = '0';
        dataToEdit.albumName = photosDomElements.albumName.innerHTML.trim();
        dataToEdit.albumDescription = photosDomElements.albumDescription.innerHTML.trim();
        // Show checkboxes
        const checkboxToShowArray = document.querySelectorAll<HTMLElement>('.checkbox-remove');
        checkboxToShowArray.forEach((element) => {
            element.style.display = 'block';
        });
        // Hide photos names
        const photosNames = document.querySelectorAll<HTMLElement>('.photo-name');
        photosNames.forEach((element) => {
            element.style.display = 'none';
        });
        // Show textarea photos names
        const photosTextAreaNames = document.querySelectorAll<HTMLElement>('.photo-name-editing');
        photosTextAreaNames.forEach((element) => {
            element.style.display = 'block';
        });
        // Disable photo links
        const photoLinksToDisableArray = document.querySelectorAll<HTMLElement>('.photo-link');
        photoLinksToDisableArray.forEach((element) => {
            element.removeAttribute('href');
            element.removeAttribute('data-fancybox');
        });
    }

    albumNameEdit(): void {
        // Fill textarea album name field
        photosDomElements.albumNameEditing.innerHTML = albumNameString;

        photosDomElements.albumNameEditing.addEventListener('input', (event) => {
            dataToEdit.albumName = (event.currentTarget as HTMLTextAreaElement).value;

            if (dataToEdit.albumName !== albumNameString || dataToEdit.albumDescription !== albumDescString || isPhotosTextAreaChanged) {
                photosDomElements.popUpSave.removeAttribute('disabled');
            }
            else {
                photosDomElements.popUpSave.setAttribute('disabled', 'true');
            }
        });
    }

    albumDescriptionEdit(): void {
        // Fill textarea album description field
        photosDomElements.albumDescriptionEditing.innerHTML = albumDescString;

        photosDomElements.albumDescriptionEditing.addEventListener('input', (event) => {
            dataToEdit.albumDescription = (event.currentTarget as HTMLTextAreaElement).value;

            if (dataToEdit.albumDescription !== albumDescString || dataToEdit.albumName !== albumNameString || isPhotosTextAreaChanged) {
                photosDomElements.popUpSave.removeAttribute('disabled');
            }
            else {
                photosDomElements.popUpSave.setAttribute('disabled', 'true');
            }
        });
    }

    photosNamesEdit(): void {
        const photosNamesArray = document.querySelectorAll<HTMLElement>('.photo-name');
        const photosTextAreaNamesArray = document.querySelectorAll<HTMLElement>('.photo-name-editing');
        // Fill photos textarea fields
        for (let i = 0; i < photosNamesArray.length; i++) {
            photosTextAreaNamesArray[i].innerHTML = photosNamesArray[i].innerHTML.trim();
        }
        // Fill "dataToEdit.photosToEdit" array
        for (const element of photosTextAreaNamesArray) {
            dataToEdit.photosToEdit.push({ photoId: element.dataset.id, photoName: element.innerHTML });
        }
        // Add event listener on each photo textarea element
        photosTextAreaNamesArray.forEach((element) => {
            element.addEventListener('input', (event) => {
                element.innerHTML = ((event.currentTarget as HTMLTextAreaElement).value);
                // Add new "photoName" value to "dataToEdit.photosToEdit" array
                for (let i = 0; i < photosTextAreaNamesArray.length; i++) {
                    dataToEdit.photosToEdit[i].photoName = photosTextAreaNamesArray[i].innerHTML;
                }
                // Create checking string arrays
                const allTextAreaPhotosNamesArray: string[] = [];
                const allPhotosNamesArray: string[] = [];
                // Fill checking string arrays
                for (const element of photosTextAreaNamesArray) {
                    allTextAreaPhotosNamesArray.push(element.innerHTML);
                }
                for (const element of photosNamesArray) {
                    allPhotosNamesArray.push(element.innerHTML);
                }
                // Create variables of concatenation of all strings
                const concAllPhotosTextAreaStrings = allTextAreaPhotosNamesArray.join('');
                const concAllPhotosNamesStrings = allPhotosNamesArray.join('');
                // Check for changes
                if (concAllPhotosTextAreaStrings !== concAllPhotosNamesStrings) {
                    photosDomElements.popUpSave.removeAttribute('disabled');
                    isPhotosTextAreaChanged = true;
                }
                else {
                    isPhotosTextAreaChanged = false;
                    if (dataToEdit.albumName === albumNameString &&
                        dataToEdit.albumDescription === albumDescString
                    ) {
                        photosDomElements.popUpSave.setAttribute('disabled', 'true');
                    }
                }
            });
        });
    }

    photosCheckboxesEdit(): void {
        // Fill "toRemove" properties of "dataToEdit.photosToEdit" array
        const checkboxToRemoveArray = document.querySelectorAll<HTMLInputElement>('.checkbox-remove');
        for (let i = 0; i < checkboxToRemoveArray.length; i++) {
            dataToEdit.photosToEdit[i].toRemove = checkboxToRemoveArray[i].checked;
        }
        // Add event listener on each checkbox element
        checkboxToRemoveArray.forEach((element) => {
            element.addEventListener('input', () => {
                for (const arrayElement of checkboxToRemoveArray) {
                    if (arrayElement.checked === true) {
                        photosDomElements.popUpRemove.removeAttribute('disabled');
                        break;
                    }
                    else {
                        photosDomElements.popUpRemove.setAttribute('disabled', 'true');
                    }
                }
            });
        });
    }

    removeSelectedPhotos(): void {
        photosDomElements.popUpRemove.addEventListener('click', () => {
            const checkboxToRemoveArray = document.querySelectorAll<HTMLInputElement>('.checkbox-remove');
            for (const arrayElement of checkboxToRemoveArray) {
                if (arrayElement.checked === true) {
                    const result = dataToEdit.photosToEdit.filter((element) => {
                        return element.photoId === arrayElement.id;
                    });
                    for (const iterator of dataToEdit.photosToEdit) {
                        if (iterator.photoId === result[0].photoId) {
                            iterator.toRemove = true;
                        }
                    }
                    document.getElementById(`${arrayElement.id}`)?.parentElement?.setAttribute('style', 'opacity: 0');
                    setTimeout(() => {
                        document.getElementById(`${arrayElement.id}`)?.parentElement?.remove();
                    }, 300);
                }
            }
            photosDomElements.popUpRemove.setAttribute('disabled', 'true');
            photosDomElements.popUpSave.removeAttribute('disabled');
        });
    }

    saveChanges(): void {
        // Create and fill new photoNames array for check
        const photosNamesInnerHtmlArray: string[] = [];
        for (const element of dataToEdit.photosToEdit) {
            if (typeof element.photoName === 'string') {
                photosNamesInnerHtmlArray.push(element.photoName);
            }
        }
        // Add event listener on "save" button
        photosDomElements.popUpSave.addEventListener('click', (event) => {
            event.preventDefault();
            // Check for changes in albumName
            if (dataToEdit.albumName === albumNameString) {
                delete dataToEdit.albumName;
            }
            // Check for changes in albumDescription
            if (dataToEdit.albumDescription === albumDescString) {
                delete dataToEdit.albumDescription;
            }
            // Check for changes in photos properties
            for (let i = 0; i < dataToEdit.photosToEdit.length; i++) {
                if (dataToEdit.photosToEdit[i].photoName === photosNamesInnerHtmlArray[i] &&
                    dataToEdit.photosToEdit[i].toRemove === false
                ) {
                    dataToEdit.photosToEdit.splice(i, 1);
                    photosNamesInnerHtmlArray.splice(i, 1);
                    i--;
                }
            }
            const toSend = JSON.stringify(dataToEdit);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/Photo/Upload', true);
            xhr.send(toSend);
        });
    }

    cancelEdit(): void {
        photosDomElements.popUp.style.marginTop = '-100px';
        photosDomElements.albumName.style.display = 'block';
        photosDomElements.albumNameEditing.style.display = 'none';
        photosDomElements.albumDescription.style.display = 'block';
        photosDomElements.albumDescriptionEditing.style.display = 'none';
        photosDomElements.addBtn.style.display = 'block';
        photosDomElements.editBtn.style.display = 'block';
        photosDomElements.albumNameLabel.style.display = 'none';
        photosDomElements.albumDescriptionLabel.style.display = 'none';
        photosDomElements.breadCrumb.style.opacity = '1';
        // Hide checkboxes
        const checkboxRemoveArray = document.querySelectorAll<HTMLElement>('.checkbox-remove');
        checkboxRemoveArray.forEach((element) => {
            element.style.display = 'none';
        });
        // Show photos names
        const photosNames = document.querySelectorAll<HTMLElement>('.photo-name');
        photosNames.forEach((element) => {
            element.style.display = 'block';
        });
        // Hide textarea photos names
        const photosTextAreaNames = document.querySelectorAll<HTMLElement>('.photo-name-editing');
        photosTextAreaNames.forEach((element) => {
            element.style.display = 'none';
        });
        // Reload page
        setTimeout(() => {
            location.reload();
        }, 300);
    }
}
