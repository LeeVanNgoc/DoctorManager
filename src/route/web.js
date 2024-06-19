import express from "express";
import homController from "../controllers/homController";
let router = express.Router();

let initWebRoutes = (app) => {
	router.get("/", homController.getHomePage	);

	router.get("/aboutMe", homController.getAboutPage);
	router.get("/crud", homController.getCRUD);
	
	router.post("/post-crud", homController.postCRUD);
	router.get('/get-crud', homController.displayGetCRUD);
	//rest api
	return app.use("/", router);
}

module.exports = initWebRoutes;