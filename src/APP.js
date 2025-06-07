import Handlebars from 'handlebars';
import * as Pages from './pages';

// Register partials
import Input from './components/Input.js';
import Button from './components/Button.js';
import Select from './components/Select.js';
import ErrorMessage from './components/ErrorMessage.js';
import Link from './components/Link.js';
import Label from './components/Label.js';
import Footer from './components/Footer.js';

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Select', Select);
Handlebars.registerPartial('ErrorMessage', ErrorMessage);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Label', Label);
Handlebars.registerPartial('Footer', Footer);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'startPage',
      questions: [],
      answers: [],
    };
    this.appElement = document.getElementById('app');
  }


  render() {
    let template;
    if (this.state.currentPage === 'startPage') {
      template = Handlebars.compile(Pages.StartPage);
      this.appElement.innerHTML = template({});
    }
    //this.attachEventListeners();
  }
}