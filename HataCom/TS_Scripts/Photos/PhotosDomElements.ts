export class PhotosDomElements {

    mainContainer: HTMLDivElement;
    addBtn: HTMLDivElement;
    editBtn: HTMLDivElement;
    removeBtn: HTMLDivElement;

    constructor() {
        this.mainContainer = document.querySelector('.main-container') as HTMLDivElement;
        this.addBtn = document.querySelector('.add-photo-btn') as HTMLDivElement;
        this.editBtn = document.querySelector('.edit-album-btn') as HTMLDivElement;
        this.removeBtn = document.querySelector('.remove-photo-btn') as HTMLDivElement;
    }
} 