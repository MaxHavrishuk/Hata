export class PhotosDomElements {

    mainContainer: HTMLDivElement;
    addBtn: HTMLDivElement;
    editBtn: HTMLDivElement;
    removeBtn: HTMLDivElement;
    popUp: HTMLDivElement;
    popUpCancel: HTMLDivElement;
    albumName: HTMLDivElement;
    albumDescription: HTMLDivElement;
    albumNameEditing: HTMLDivElement;
    albumDescriptionEditing: HTMLDivElement;

    constructor() {
        this.mainContainer = document.querySelector('.main-container') as HTMLDivElement;
        this.addBtn = document.querySelector('.add-photos-btn') as HTMLDivElement;
        this.editBtn = document.querySelector('.edit-album-btn') as HTMLDivElement;
        this.removeBtn = document.querySelector('.remove-photos-btn') as HTMLDivElement;
        this.popUp = document.querySelector('.pop-up') as HTMLDivElement;
        this.popUpCancel = document.querySelector('.pop-up-cancel') as HTMLDivElement;
        this.albumName = document.querySelector('.album-name') as HTMLDivElement;
        this.albumDescription = document.querySelector('.album-description') as HTMLDivElement;
        this.albumNameEditing = document.querySelector('.album-name-editing') as HTMLDivElement;
        this.albumDescriptionEditing = document.querySelector('.album-description-editing') as HTMLDivElement; 
    }
} 