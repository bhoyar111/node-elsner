import express from "express";
const apiRouter = express.Router();

import authToken from '../middleware/authToken'; // Auth token Middleware

/* Routes for Login */
import loginControl from '../controllers/auth/LoginController';
apiRouter.route('/login').post(loginControl.getLogin);
apiRouter.route('/logout').post(loginControl.getLogout);

/* Routes for User */
import userControl from '../controllers/UserController';
apiRouter.route('/users-ds').get(authToken, userControl.getUsersDS);
apiRouter.route('/users').get(authToken, userControl.getUsers);
apiRouter.route('/user-add').post(authToken, userControl.addUser);
apiRouter.route('/user-get/:id').get(authToken, userControl.getUser);
apiRouter.route('/user-update/:id').put(authToken, userControl.updateUser);
apiRouter.route('/user-delete/:id').delete(authToken, userControl.deleteUser);

/* Routes for Products */
import productControl from '../controllers/ProductController';
apiRouter.route('/products').get(authToken, productControl.getProducts);
apiRouter.route('/product-add').post(authToken, productControl.addProduct);
apiRouter.route('/product-get/:id').get(authToken, productControl.getProduct);
apiRouter.route('/product-update/:id').put(authToken, productControl.updateProduct);
apiRouter.route('/product-delete/:id').delete(authToken, productControl.deleteProduct);


export default apiRouter;