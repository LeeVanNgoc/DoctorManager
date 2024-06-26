
import db from '../models/index';
import bcrypt from 'bcryptjs'

const e = require("express");
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword)
		} catch (error) {
			reject(error)
		}	
		
	})
}

let handleUserLogin = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = {};
			let isExits = await checkUserEmail(email);
			if(isExits){
                //User already exist
				
				let user = await db.User.findOne({
					attributes: ['email', 'roleId', 'password'],
					where: {email : email},
					raw: true 
				});

				if(user) {
					// Compare password
					let check = await bcrypt.compareSync(password, user.password);
					if(check) {
						userData.errCode = 0;
						userData.errMessage = 'Ok';
						delete user.password,
						userData.user = user;
					} else {
						userData.errCode = 3;
                        userData.errMessage = `Password is incorrect`;
					}
				} else {
					userData.errCode = 2;
                    userData.errMessage = `User not found.`;
				}
            }else{
				userData.errCode = 1;
				userData.errMessage = `Your's email isn't exist in your system. Please try other email`;
            }
			resolve(userData)
		} catch (error) {
			reject(error)
		}
	})
}

let checkUserEmail = (userEmail) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: {
					email: userEmail,
				}
			});

			if(user){
				resolve(true)
			}else{
				resolve(false)
			}
		} catch (error) {
			reject(error)
		}
    });
}

let getAllUsers = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users ='';
			if(userId === 'ALL'){
				users = await db.User.findAll({
					attributes: {
						exclude: ['password']
					}
				})
			}
			
			if (userId && userId !== 'ALL') {
				users = await db.User.findOne({	
					where: {
                        id: userId
                    },
					attributes: {
						exclude: ['password']
					},
				})
			}
			resolve(users)
		} catch (error) {
			reject(error)
		}
	})
}

let creatrNewUser = (data) => {
	return new Promise(async (resolve, reject) => {
        try {
			//Check email is exist
			let check = await checkUserEmail(data.email);
			if (check === true) {
				resolve({
					errCode: 1,
					errMessage: "Your email is already in used, plz try another!",
				})
			} else {
				let hashPasswordFromBycrypt = await hashUserPassword(data.password);
				await db.User.create({
					email: data.email,
					password: hashPasswordFromBycrypt,
					firstName: data.firstName,
					lastName: data.lastName,
					address: data.address,
					phonenumber: data.phonenumber,
					gender: data.gender === '1' ? true : false,
					roleId: data.roleId,
				});
				
				resolve({
					errCode: 0,
					errMessage: 'Ok'
				})
			}
			
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = async (userId) => {
	return new Promise (async (resolve, reject) => {
		let foundUser = await db.User.findOne({
			where: {
				id: userId
			}
		})
		if (!foundUser) {
			resolve({
				errCode: 2,
				errMessage: 'User not found',
			})
		}
		await db.User.destroy({
			where: {
				id: userId
			}
		});
		resolve({
			errCode: 0,
            errMessage: 'User was deleted!'
		})
	})
}

let updateUserData = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				resolve({
					errCode: 2,
					message: "Missing required parameters!"
				})
			}
			let user = await db.User.findOne({
				where: { id: data.id },
				raw: false,
			})
			if (user) {
				user.firstName = data.firstName;
				user.lastName = data.lastName;
				user.address = data.address;
				await user.save();
				
				resolve({
					errCode: 0,
					message: "Update the user succeeds!"
				});
			} else {
				resolve({
					errCode: 1,
                    message: "User not found!"
				});
			}
		} catch (error) {
			reject(error)
		}
	})
}
module.exports = {
	handleUserLogin: handleUserLogin,
	getAllUsers: getAllUsers,
	creatrNewUser: creatrNewUser,
	deleteUser: deleteUser,
	updateUserData: updateUserData,
}