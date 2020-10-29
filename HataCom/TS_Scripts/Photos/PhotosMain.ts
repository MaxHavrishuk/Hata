import { PhotosEdit } from './PhotosEdit';
import { PhotosAdapt } from './PhotosAdapt';

class PhotosMain {

    init(): void {
        const photosEdit = new PhotosEdit();
        const photosAdapt = new PhotosAdapt();
        photosEdit.init();
        photosAdapt.init();
    }
}

const main = new PhotosMain();
main.init();