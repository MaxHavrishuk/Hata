import { AuthDomElements } from './AuthDomElements';
const authDomElements = new AuthDomElements();

export class AuthFormChanger {
    init(): void {
        document.addEventListener('DOMContentLoaded', () => {
            authDomElements.signInLink.addEventListener('click', () => { this.showSignInForm(); });
            authDomElements.signUpLink.addEventListener('click', () => { this.showSignUpForm(); });
        });
    }

    showSignInForm(): void {
        authDomElements.signUpForm.style.display = 'none';
        authDomElements.signInForm.style.display = 'block';
        authDomElements.formWrp.style.height = '650px';
        authDomElements.formHeader.innerHTML = 'Вхід';
        authDomElements.signInLink.classList.add('active-link');
        authDomElements.signUpLink.classList.remove('active-link');
    }

    showSignUpForm(): void {
        authDomElements.signInForm.style.display = 'none';
        authDomElements.signUpForm.style.display = 'block';
        authDomElements.formWrp.style.height = '800px';
        authDomElements.formHeader.innerHTML = 'Реєстрація';
        authDomElements.signUpLink.classList.add('active-link');
        authDomElements.signInLink.classList.remove('active-link');
    }
}