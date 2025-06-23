import  StartPage  from './pages/startPage/startPage';
import  RegistrationPage  from './pages/registrationPage/registrationPage';
import  ProfilePage  from './pages/profilePage/profilePage';
//import  CommonPage  from './pages/commonPage/commonPage';

interface AppState {
  currentPage: string;
}

export default class App {
  private state: AppState;

  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: 'registrationPage'
    };
    this.appElement = document.getElementById('app');
  }

  render(): string {
      const startPage = new StartPage();
      console.log(startPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(startPage.getContent());
      }
    
    return '';
  }
/*
  changePage(page: string): void {
    this.state.currentPage = page;
    this.render();
  }

  addQuestion(): void {
    const questionInput = document.getElementById('question-input') as HTMLInputElement;
    if (questionInput.value.trim()) {
      this.state.questions.push(questionInput.value);
      questionInput.value = '';
      this.render();
    }
  }

  createQuestionnaire(): void {
    if (this.state.questions.length > 0) {
      this.state.currentPage = 'answerQuestionnaire';
      this.render();
    }
  }

  submitAnswers(): void {
    alert('Answers submitted!');
  }
    */
}