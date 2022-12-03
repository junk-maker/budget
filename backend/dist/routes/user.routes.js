"use strict";
// import {Application} from 'express';
// import {RoutesConfig} from '../config/routes';
// import AppController from '../controllers/app.controller';
// import ProtectedRoute from '../middleware/protected.route';
// export class UsersRoutes extends RoutesConfig {
//     constructor(app: Application) {
//         super(app, 'UsersRoutes');
//     };
//     configureRoutes() {
//         this.app.route('/sign-in').post(AppController.login);
//         this.app.route('/sign-up').post(AppController.register);
//         this.app.route('/budget/:end/:year/:start/:month/:currency')
//             .put(ProtectedRoute.getProtected, AppController.editItem)
//             .post(ProtectedRoute.getProtected, AppController.addItem)
//             .get(ProtectedRoute.getProtected, AppController.getBudget)
//         ;
//         this.app.route('/budget/:id/:end/:year/:start/:month/:currency')
//             .delete(ProtectedRoute.getProtected, AppController.deleteItem)
//         ;
//         this.app.route('/contact')
//             .get(ProtectedRoute.getProtected, AppController.getMessage)
//             .post(ProtectedRoute.getProtected, AppController.sendMessage)
//         ;
//         this.app.route('/password-recovery').post(AppController.passwordRecovery);
//         this.app.route('/email-activation/:token').get(AppController.emailActivation);
//         this.app.route('/password-reset/:resetToken').put(AppController.passwordReset);
//         this.app.route('/features').get(ProtectedRoute.getProtected, AppController.getFeatures);
//         this.app.route('/settings/:list').get(ProtectedRoute.getProtected, AppController.getSettings);
//         this.app.route('/settings/change-email').put(ProtectedRoute.getProtected, AppController.changeEmail);
//         this.app.route('/verify-email/:token').get(AppController.getVerify).post(AppController.getVerifyEmail);
//         this.app.route('/settings/change-password').put(ProtectedRoute.getProtected, AppController.changePassword);
//         this.app.route('/settings/delete-account').delete(ProtectedRoute.getProtected, AppController.deleteAccount);
//         this.app.route('/statistics/:end/:year/:start/:month/:value/:currency').get(ProtectedRoute.getProtected, AppController.getStatistics);
//         return this.app;
//     };
// };
