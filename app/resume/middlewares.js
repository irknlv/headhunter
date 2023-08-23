const Resume = require("./models/Resume");

const validateResume = (req, res, next) => {
    let errors = {};
    if(!req.body.firstname || req.body.firstname.length <= 0){
        errors.firstname = 'Поле "Имя" обязательное';
    }
    if(!req.body.lastname || req.body.lastname.length <= 0){
        errors.lastname = 'Поле "Фамилия" обязательное';
    }
    if(!req.body.phone || req.body.phone.length <= 0){
        errors.phone = 'Поле "Телефон" обязательное';
    }
    if(!req.body.position || req.body.position.length <= 0){
        errors.position = 'Поле "Желаемая должность" обязательное';
    }
    if(!req.body.about || req.body.about.length <= 0){
        errors.about = 'Поле "О себе" обязательное';
    }
    if(JSON.stringify(errors) !== JSON.stringify({})){
        res.status(400).send(errors);
    } else{
        next()
    }
}

const isAuthor = async(req, res, next) => {
    const id = req.params.id || req.body.id
    const resume = await Resume.findByPk(id);
    if(!resume){
        res.status(400).send({message: 'Resume is not exist'})
    } else if(req.user.id === resume.userId){
        next();
    } else {
        res.status(403).send({message: 'Access forbidden'})
    }
}
module.exports = {
    validateResume,
    isAuthor,
}