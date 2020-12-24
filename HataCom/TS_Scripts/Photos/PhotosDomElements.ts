export class PhotosDomElements {
    mainContainer: HTMLDivElement;
    navBar: HTMLDivElement;
    navbarToggler: HTMLDivElement;
    breadCrumb: HTMLDivElement;
    addBtn: HTMLDivElement;
    editBtn: HTMLDivElement;
    popUp: HTMLDivElement;
    popUpCancel: HTMLDivElement;
    popUpSave: HTMLDivElement;
    popUpRemove: HTMLDivElement;
    albumName: HTMLDivElement;
    albumDescription: HTMLDivElement;
    albumNameEditing: HTMLDivElement;
    albumDescriptionEditing: HTMLDivElement;
    albumNameLabel: HTMLDivElement;
    albumDescriptionLabel: HTMLDivElement;
    constructor() {
        this.mainContainer = document.querySelector('.main-container') as HTMLDivElement;
        this.navBar = document.querySelector('.navbar') as HTMLDivElement;
        this.navbarToggler = document.querySelector('.navbar-toggler') as HTMLDivElement;
        this.breadCrumb = document.querySelector('.breadcrumbs') as HTMLDivElement;
        this.addBtn = document.querySelector('.add-photos-btn') as HTMLDivElement;
        this.editBtn = document.querySelector('.edit-album-btn') as HTMLDivElement;
        this.popUpRemove = document.querySelector('.pop-up-remove-btn') as HTMLDivElement;
        this.popUp = document.querySelector('.pop-up') as HTMLDivElement;
        this.popUpCancel = document.querySelector('.pop-up-cancel') as HTMLDivElement;
        this.popUpSave = document.querySelector('.pop-up-save') as HTMLDivElement;
        this.albumName = document.querySelector('.album-name') as HTMLDivElement;
        this.albumDescription = document.querySelector('.album-description') as HTMLDivElement;
        this.albumNameEditing = document.querySelector('.album-name-editing') as HTMLDivElement;
        this.albumDescriptionEditing = document.querySelector('.album-description-editing') as HTMLDivElement;
        this.albumNameLabel = document.querySelector('.album-name-label') as HTMLDivElement;
        this.albumDescriptionLabel = document.querySelector('.album-description-label') as HTMLDivElement;
    }
}