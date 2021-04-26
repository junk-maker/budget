


const login = async (req, res, next) => {
    res.send('Login')
};
const register = async (req, res, next) => {
    res.send('Register')
};
const resetPassword = async (req, res, next) => {};
const recoverPassword = async (req, res, next) => {};

module.exports = {login, register, resetPassword, recoverPassword};