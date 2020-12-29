import { AuthAdapt } from './AuthAdapt';
import { AuthFormChanger } from './AuthFormChanger';

class PhotosMain {

    init(): void {
        const authAdapt = new AuthAdapt();
        const authFormChanger = new AuthFormChanger();
        authAdapt.init();
        authFormChanger.init();
    }
}

const main = new PhotosMain();
main.init();