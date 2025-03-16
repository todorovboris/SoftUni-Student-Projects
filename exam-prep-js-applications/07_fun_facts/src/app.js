import page from '../node_modules/page/page.mjs';

import homeView from './views/home.js';
import loginView from './views/login.js';
import logoutView from './views/logout.js';
import registerView from './views/register.js';
import dashboardView from './views/dashboard.js';
import createView from './views/create.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import deleteView from './views/delete.js';
import navigationView from './views/navigation.js';

page(navigationView);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/dashboard/:itemId/details', detailsView);
page('/dashboard/:itemId/edit', editView);
page('/dashboard/:itemId/delete', deleteView);

page();
