const findElements = () => {
  const menu = document.getElementsByClassName('expand-menu')[0];
  const divToShow = document.getElementById('current-user');
  const nav = document.getElementsByClassName('nav-wrapper')[0];
  const sidebar = document.getElementsByClassName('sidebar')[0];
  const logo = document.getElementById('logo');
  const button = document.getElementsByClassName('expand-menu-button')[0];

  return { menu, divToShow, nav, sidebar, logo, button };
};

export const hideMenu = () => {
  let { menu, divToShow, nav, sidebar, logo, button } = findElements();

  if (menu) {
    menu.style.display = 'none';
    sidebar.classList.remove('hidden');
    logo.classList.remove('hidden');
    divToShow.classList.add('hidden');
    nav.classList.remove('unfixed');
    button.innerHTML = 'Menu';
  }
};

export const showElements = () => {
  let { menu, divToShow, nav, sidebar, logo, button } = findElements();

  menu.style.display = 'flex';
  divToShow.classList.remove('hidden');
  sidebar.classList.add('hidden');
  logo.classList.add('hidden');
  nav.classList.add('unfixed');
  button.innerHTML = '>';
};

export const hideElements = () => {
  let { menu, divToShow, nav, sidebar, logo, button } = findElements();
  menu.style.display = 'none';
  sidebar.classList.remove('hidden');
  logo.classList.remove('hidden');
  divToShow.classList.add('hidden');
  nav.classList.remove('unfixed');
  button.innerHTML = 'Menu';
};
