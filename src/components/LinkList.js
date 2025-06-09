export default `<nav>
  <ul>
    <li>
    {{> Link href="#" class="footer-link" data-page="startPage" text="Авторизация"}}
    {{> Link href="#" class="footer-link" data-page="registrationPage" text="Регистрация"}}
    {{> Link href="#" class="footer-link" data-page="commonPage" text="Основная"}}
    {{> Link href="#" class="footer-link" data-page="profilePage" text="Профиль"}}
    {{> Link href="#" class="footer-link" data-page="errorPage500" text="Ошибка 500"}}
    {{> Link href="#" class="footer-link" data-page="errorPage400" text="Ошибка 404"}}
    </li>
  </ul>
</nav>`;
