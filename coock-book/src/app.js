import page from '//unpkg.com/page/page.mjs';

import loginPage from './views/login.js';
import registerPage from './views/register.js';
import createPage from './views/create.js';
import logoutPage from './views/logout.js';
import catalogPage from './views/catalog.js';
import homePage from './views/home.js';
import renderNavigation from './views/navigation.js';
import detailsPage from './views/details.js';

// Middleware - this will execute before each navigation
page(renderNavigation);

// Execute by route
page('/', homePage);
page('/catalog', catalogPage);
page('/catalog/:recipeId', detailsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/logout', logoutPage);

// Start router
page();
