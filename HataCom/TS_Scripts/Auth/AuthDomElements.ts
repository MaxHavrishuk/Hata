export class AuthDomElements {
    mainContainer: HTMLDivElement;
    signInForm: HTMLDivElement;
    signUpForm: HTMLDivElement;
    signInLink: HTMLDivElement;
    signUpLink: HTMLDivElement;
    formWrp: HTMLDivElement;
    formHeader: HTMLDivElement;
    activeLink: HTMLDivElement;
    constructor() {
        this.mainContainer = document.querySelector('.main-container') as HTMLDivElement;
        this.signInForm = document.querySelector('.signin-form') as HTMLDivElement;
        this.signUpForm = document.querySelector('.signup-form') as HTMLDivElement;
        this.signInLink = document.querySelector('.signin-link') as HTMLDivElement;
        this.signUpLink = document.querySelector('.signup-link') as HTMLDivElement;
        this.formWrp = document.querySelector('.form-wrp') as HTMLDivElement;
        this.formHeader = document.querySelector('.form-header') as HTMLDivElement;
        this.activeLink = document.querySelector('.active-link') as HTMLDivElement;
    }
}