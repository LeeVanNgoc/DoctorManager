let getHomePage = (req, res) => {
	return res.render('homePage.ejs');
}

let getAboutPage = (req, res) => {
	return res.render('test/about.ejs');
}
// Quy tac object
// Object: {
// 	key: '',
// 	value: ''
// }
module.exports = {
	getHomePage: getHomePage,
	getAboutPage: getAboutPage
}