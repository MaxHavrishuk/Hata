import { AuthDomElements } from './AuthDomElements';

export class AuthAdapt {

    width: number;
    height: number;

    constructor() {
        this.width = document.body.clientWidth;
        this.height = screen.height;
    }

    init(): void {
        const authDomElements = new AuthDomElements();

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
        authDomElements.mainContainer.style.minHeight = (this.height - 150).toString() + 'px';
    }

    /** Add a new classes for mobile mode */
    addClass(): void {
        // const authDomElements = new AuthDomElements();
    }

    /** Remove mobile mode classes */
    removeClass(): void {
        // const authDomElements = new AuthDomElements();
    }
}