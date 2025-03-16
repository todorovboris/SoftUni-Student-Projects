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
import navigationMiddleware from './middlewares/navigation.js';
import notificationMiddleware from './middlewares/notification.js';

page(notificationMiddleware);
page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/logout', logoutView);
page('/register', registerView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/dashboard/:itemId/details', detailsView);
page('/dashboard/:itemId/edit', editView);
page('/dashboard/:itemId/delete', deleteView);

page();
