# SoftUni JS Back-End Course Exam Preparation

1. Initialize project

-   [x] `npm init --yes`
-   [x] Change module system
-   [x] Nodemon setup `npm i -D nodemon`
-   [x] Add start/dev script
-   [ ] Setup debugging

2. Express

-   [x] Install `npm i express`
-   [x] Setup inital http server
-   [x] Add public resources (images, css...)
-   [x] Add static middleware
-   [x] Add body parser
-   [x] Add routes modular router
-   [x] Add home controller

3. Handlebars

-   [x] Install `npm i express-handlebars`
-   [x] Config handlebars as view engine
-   [x] Enable mongo documents to be passed to the view
-   [x] Change views directory
-   [x] Add resources to views folder
-   [x] Add layouts dir + main file + update href of styles
-   [x] Add partials dir
-   [x] Add home view

4. Database

-   [x] Install mongoose `npm i mongoose`
-   [x] Setup db connection
-   [x] Add user model

5. Register

-   [x] Install bcrypt `npm i bcrypt`
-   [x] Fix navigation links
-   [x] Add register view
-   [x] Fix register form(names)
-   [x] Add authController
-   [x] Add GET register page
-   [x] Add POST register action
-   [x] Add authService with register
-   [x] Hash password
-   [x] Check rePassword
-   [x] Check if user exists

6. Login

-   [x] Add jsonwebtoken `npm i jsonwebtoken`
-   [x] Add cookie parser `npm i cookie-parser`
-   [x] Add cookie parser middleware in index.js
-   [x] Add login view
-   [x] Fix login form
-   [x] Add GET login action
-   [x] Add POST login action
-   [x] Add login to auth-handler
-   [x] Validate if user exists
-   [x] Validate if password is correct
-   [x] Generate token through util function
-   [x] Return token as cookie
-   [x] Autologin on register

7. Logout

-   [x] Add get logout action

8. Authentication

-   [x] Add auth middleware
-   [x] Check if guest(!token)
-   [x] Token verification(validation)
-   [x] Attach user to request
-   [x] Attach user to handlebars context

9.  Authorization

-   [ ] Add isAuth middleware
-   [ ] Add route guards authorization

10. Error Handling

-   [ ] Add error util file
-   [ ] Add notifications
-   [ ] Extract error message
-   [ ] Add error handling for register
-   [ ] Add error handling for login

11. Bonus

-   [ ] Dynamic Navigation
-   [ ] Dynamic Titles
-   [ ] Set titles from view
-   [ ] Async jsonwebtoken
-   [ ] Add types for jsonwebtoken lib

12. TempData | Optional

-   [ ] Install express session `npm i express-session`
-   [ ] Config express session
-   [ ] Add temp data middleware
