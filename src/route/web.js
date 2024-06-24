import express from "express";
import homController from "../controllers/homController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
	router.get("/", homController.getHomePage	);

	router.get("/aboutMe", homController.getAboutPage);
	router.get("/crud", homController.getCRUD);
	
	router.post("/post-crud", homController.postCRUD);
	router.get('/get-crud', homController.displayGetCRUD);
	router.get('/edit-crud', homController.getEditCRUD);
	router.post('/put-crud', homController.putCRUD);
	router.get('/delete-crud', homController.deleteCRUD);

	//rest api
	router.post('/api/login', userController.handleLogin);
	router.get('/api/get-all-users', userController.handdleGetAllUser);
	return app.use("/", router);
}

module.exports = initWebRoutes;