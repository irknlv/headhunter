const Role = require('./Role')
const User = require('./User')

const isAuth = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.status(401).send({message: "Unauthorized"})
    }
}
const isEmployee = async(req, res, next) => {
    if(req.user){
        const role = await Role.findByPk(req.user.roleId)
        if(role.name === "employee"){
            next();
        } else {
            res.status(403).send({message: "Access denied!"})
        }
    } else {
        res.status(403).send({message: "Unauthorized"})
    }
}
const isManager = async(req, res, next) => {
    if(req.user){
        const role = await Role.findByPk(req.user.roleId)
        if(role.name === "manager"){
            next();
        } else {
            res.status(403).send({message: "Access denied!"})
        }
    } else {
        res.status(403).send({message: "Unauthorized"})
    }
}

const validateSignUp = async(req, res, next) => {
    let errors = {}

    if(!req.body.email || req.body.email.length == 0){
        errors.email = 'Поле "email" обязательное'
    }
    if(!req.body.fullName || req.body.fullName.length == 0){
        errors.fullName = 'Поле "Полное имя" обязательное'
    }
    if(!req.body.companyName || req.body.companyName.length == 0){
        errors.companyName = 'Поле "Название компании" обязательное'
    }
    if(!req.body.password || req.body.password.length == 0){
        errors.password = 'Поле "Пароль" обязательное'
    }
    if(!req.body.rePassword || req.body.rePassword.length == 0){
        errors.rePassword = 'Поле "Подтвердить пароль" обязательное'
    }
    if(req.body.password != req.body.rePassword){
        errors.passwords = 'Пароли не совпадают!'
    }
    const user = await User.findOne({
        where: {
            email: req.body.email,
        }
    })
    if(user){
        errors.email = "Пользователь с таким email уже зарегистрирован!"
    }
    if(JSON.stringify(errors) !== JSON.stringify({})){
        res.status(400).send(errors);
    } else{
        next()
    }
}

module.exports = {
    isAuth,
    isEmployee,
    isManager,
    validateSignUp
}