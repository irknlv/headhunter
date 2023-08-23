const sendEMail = require('../utils/sendMail')
const AuthCode = require('../auth/AuthCode')
const User = require('../auth/User')
const Role = require('../auth/Role')
const jwt = require('jsonwebtoken')
const Company = require('../auth/Company')
const bcrypt = require('bcrypt')
const {jwtOptions} = require('./passport')

const sendVerificationEmail = (req, res) => {
    const code = "HH" + Date.now()

    AuthCode.create({
        email: req.body.email,
        code: code,
        validTill: Date.now() + 120000
    })

    sendEMail(req.body.email, "Код авторизации hh.kz", code);
    res.status(200).end();
}

const verifyCode = async(req, res) => {
    const authCode = await AuthCode.findOne(
        {
            where: {email: req.body.email},
            order: [['validTill', 'DESC']],
        })
    if(!authCode){
        res.status(401).send({error: "code is invalid"})
    } else if(new Date(authCode.validTill).getTime() < Date.now()) {
        res.status(402).send({error: "code is invalid"})
    } else if(authCode.code != req.body.code){
        res.status(403).send({error: "code is invalid"})
    }
      else {
        const role = await Role.findOne({where: {name: 'employee'}})
        let user = await User.findOne({where: {email: req.body.email}});
        if(!user) {
            user = await User.create({
            roleId: role.id,
            email: req.body.email,
            })
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            role: {
                id: role.id,
                name: role.name
            }
        }, jwtOptions.secretOrKey, {
            expiresIn: 24*60*60*365
        });
        res.status(200).send({token});
    }
}

const signUp = async(req, res) => {
    const role = await Role.findOne({
        where: {
            name: 'manager',
        }
    })
    const company = await Company.create({
        name: req.body.companyName,
        description: req.body.companyDescription,
        address: req.body.companyAddress,
        logo: '/company/' + req.file.filename,
    })
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    await User.create({
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullName,
        companyId: company.id,
        roleId: role.id,  
    })
    res.status(200).end();
}

const logIn = async(req, res) => {
    if(!req.body.email || req.body.email.length == 0 || !req.body.password || req.body.password.length ==0){
        res.status(401).send({message: 'Bad Credentials'})
    } else {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if(!user) return res.status(401).send({message: 'User whith that email does not exist'})
        
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(isMatch){
            const role = await Role.findByPk(user.roleId)
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                phone: user.phone,
                role: {
                    id: role.id,
                    name: role.name
                }
            }, jwtOptions.secretOrKey, {
                expiresIn: 24*60*60*365
            });
            res.status(200).send({token});
        }else{
            res.status(401).send({message: 'Password is incorrect'})
        }
    }
}

module.exports = {
    sendVerificationEmail,
    verifyCode,
    signUp,
    logIn,
}