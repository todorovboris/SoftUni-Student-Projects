import page from './lib/page.js';

import homeView from './views/home.js';
import loginView from './views/login.js';
import logoutView from './views/logout.js';
import registerView from './views/register.js';
import dashboardView from './views/dashboard.js';
import createView from './views/create.js';
import detailsView from './views/details.js';
import renderNavigation from './views/navigation.js';
import editView from './views/edit.js';
import deleteView from './views/delete.js';

page(renderNavigation);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/dashboard/:solutionId/details', detailsView);
page('/dashboard/:solutionId/edit', editView);
page('/dashboard/:solutionId/delete', deleteView);

page();
