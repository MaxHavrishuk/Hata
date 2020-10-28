//export class DisplaySize {

//    width: number;
//    height: number;
//    mainContainer: HTMLDivElement;

//    constructor(width: number, height: number, mainContainer: HTMLDivElement) {
//        this.width = width;
//        this.height = height;
//        this.mainContainer = mainContainer;
//        this.init();
//    }

//    init(): void {

//        window.addEventListener('load', () => {

//            if (this.width < 576) {
//                this.addClass();
//            } else if (this.width > 575) {
//                this.removeClass();
//            }
//        });

//        window.addEventListener('resize', () => {
//            this.width = document.body.clientWidth;
//            this.height = screen.height;

//            if (this.width < 576) {
//                this.addClass();
//            } else if (this.width > 575) {
//                this.removeClass();
//            }
//        });

//        this.mainContainer.style.minHeight = (this.height - 55).toString() + 'px';
//    }

//    addClass(): void {

//        addPhotoBtn.classList.add('add-photo-btn-mobile');
//        addPhotoBtn.innerHTML = '<i class="fas fa-plus"></i>';

//        editAlbumBtn.classList.add('edit-album-btn-mobile');
//        editAlbumBtn.innerHTML = '<i class="fas fa-cog">';

//        removePhotoBtn.classList.add('remove-photo-btn-mobile');
//        removePhotoBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
//    }

//    removeClass(): void {

//        addPhotoBtn.classList.remove('add-photo-btn-mobile');
//        addPhotoBtn.innerHTML = 'Додати фото';

//        editAlbumBtn.classList.remove('edit-album-btn-mobile');
//        editAlbumBtn.innerHTML = '<i class="fas fa-cog mr-2"></i>' + 'Редагування';

//        removePhotoBtn.classList.remove('remove-photo-btn-mobile');
//        removePhotoBtn.innerHTML = 'Видалити фото';
//    }
//}