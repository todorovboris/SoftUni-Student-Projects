import page from '../node_modules/page/page.mjs';

import createView from './views/create.js';
import dashboardView from './views/dashboard.js';
import deleteView from './views/delete.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import homeView from './views/home.js';
import loginView from './views/login.js';
import logoutView from './views/logout.js';
import navigationView from './views/navigation.js';
import registerView from './views/register.js';

page(navigationView);

page('/', homeView);
page('/login', loginView);
page('/logout', logoutView);
page('/register', registerView);
page('/create', createView);
page('/dashboard', dashboardView);
page('/dashboard/:tattooId/details', detailsView);
page('/dashboard/:tattooId/edit', editView);
page('/dashboard/:tattooId/delete', deleteView);

page();
