import userService from "../services/userService";

let handleLogin = async (req, res) => {
	let email = req.body.email;
	let password =  req.body.password;

	if(!email || !password){
		return res.status(500).json({
			errCode: 1,
			message: 'Missing inputs parameter!'
		})
	}

	let userData = await userService.handleUserLogin(email, password);

	return res.status(200).json({
		errCode: userData.errCode,
		message: userData.errMessage,
		user: userData.user ? userData.user : {}	
	});	
}

let handleGetAllUser = async (req, res) => {
	let id = req.query.id; //ALL, Id
	if(!id){
		return res.status(200).json({
			errCode: 1,
            message: 'Missing inputs parameter!',
			users: []
		})
	}
	let users = await userService.getAllUsers(id);

	
	return res.status(200).json({
		errCode: 0,
		errMessage: 'Ok',
		users,
		
	})
}
let handleCreateNewUser = async (req, res) => {
	let message = await userService.creatrNewUser(req.body);
	console.log(message);
	return res.status(200).json(message);
}

let handleEditNewUser = async (req, res) => {
	let data = req.body;
	let message = await userService.updateUserData(data);
	return res.status(200).json(message);
}

let handleDeleteNewUser = async (req, res) => {
	if(!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameter!"
		})
	}
	let message = await userService.deleteUser(req.body.id, req.body);
	return res.status(200).json(message);
}

module.exports = {
	handleLogin: handleLogin,
	handleGetAllUser: handleGetAllUser,
	handleCreateNewUser: handleCreateNewUser,
	handleEditNewUser: handleEditNewUser,
	handleDeleteNewUser: handleDeleteNewUser,
}

//check email exist
//compare password,
//if match, return userInfor
//if not match, return error message
//access_token: JWT json web token