import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';
import e from 'express';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
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
			resolve('Ok create a new user succeed!')
		} catch (error) {
			reject(error)
		}
	})
}

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

let getAllUser = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = db.User.findAll({
				raw: true
			});
			resolve(users)
		} catch (error) {
			reject(error)
		}
	})
}

let getUserInfoById = (userID) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { id : userID},
				raw: true,
			})

			if (user) {
				resolve(user)
			} else {
				resolve({})
			}
		} catch (error) {
			reject(error)
		}
	});

}

let updateUserData = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { id: data.id }
			})
			if (user) {
				user.firstName = data.firstName;
				user.lastName = data.lastName;
				user.address = data.address;

				await user.save();

				let allUser = await db.User.findAll();
				resolve(allUser);
			} else {
				resolve();
			}
			await db.User.update({

			})
		} catch (error) {
			reject(error)
		}
	})
}

let deleteUserById = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: {id : userId}
			})

			if (user) {
				await user.destroy();
			}
			
			resolve();
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = {
	createNewUser: createNewUser,
	getAllUser: getAllUser,
	getUserInfoById: getUserInfoById,
	updateUserData: updateUserData,
	deleteUserById: deleteUserById
}