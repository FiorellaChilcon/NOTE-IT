import { components } from '../views/index.js'
const changeView = (route) => {
    const actualView = document.getElementById('actual-view');
    actualView.innerHTML = '';
    switch (route) {
        case '':
        case '#':
        case '#/sign-in':
        case '#/': {
            return actualView.appendChild(components.signin())
        }
        case '#/sign-up': {
            return actualView.appendChild(components.signup())
        }
        case '#/appNote': {
            return actualView.appendChild(components.appNote())
        }
        default:
            return actualView.appendChild(components.different());
    }
}

export { changeView }