import page from './lib/page.js';

import createView from './views/create.js';
import dashboardView from './views/dashboard.js';
import editView from './views/edit.js';
import homeView from './views/home.js';
import loginView from './views/login.js';
import logoutView from './views/logout.js';
import registerView from './views/register.js';
import renderNavigation from './views/navigation.js';
import detailsView from './views/details.js';
import deleteView from './views/delete.js';

page(renderNavigation);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/dashboard/:itemId/details', detailsView);
page('/dashboard/:itemId/edit', editView);
page('/dashboard/:itemId/delete', deleteView);
page('/create', createView);
page('/edit', editView);

page();
