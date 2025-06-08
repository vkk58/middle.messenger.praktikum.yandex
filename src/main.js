import './styles/main.pcss';
import './pages/profilePage/styles.pcss';
import './pages/commonPage/styles.pcss';
import './pages/errorPage/styles.pcss';
import App from './APP.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
});