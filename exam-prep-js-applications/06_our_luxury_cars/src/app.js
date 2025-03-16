import page from '../node_modules/page/page.mjs';

import homeView from './views/home.js';
import loginView from './views/login.js';
import logoutView from './views/logout.js';
import registerView from './views/register.js';
import dashboardView from './views/dashboard.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import deleteView from './views/delete.js';
import navigationView from './views/navigation.js';
import createView from './views/create.js';
import searchView from './views/search.js';

page(navigationView);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/dashboard/:carId/details', detailsView);
page('/dashboard/:carId/edit', editView);
page('/dashboard/:carId/delete', deleteView);
page('/search', searchView);

page();
