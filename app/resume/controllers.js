const Resume = require('./models/Resume');
const WorkingHistory = require('./models/WorkingHistory');
const Education = require('./models/Education');
const ForeignLanguage = require('./models/ForeignLanguage')
const ResumeEmploymentType = require('./models/ResumeEmploymentType');
const EmploymentType = require('../employmentType/EmploymentType');
const City = require('../region/City');
const Country = require('../region/Country');
const {Op} = require('sequelize')

const createResume = async(req, res) => {
    const resume = await Resume.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        position: req.body.position,
        cityId: req.body.cityId,
        citizenShip: req.body.citizenShip,
        about: req.body.about,
        birthday: req.body.birthday,
        gender: req.body.gender,
        salary: req.body.salary,
        salaryType: req.body.salaryType,
        mainLanguage: req.body.mainLanguage,
        skills: req.body.skills,
        userId: req.user.id,
    })
    if(req.body.workingHistories && req.body.workingHistories.length > 0){
        req.body.workingHistories.forEach(async history => {
            await WorkingHistory.create({
                resumeId: resume.id,
                companyName: history.companyName,
                companyDescription: history.companyDescription,
                responsibilities: history.responsibilities,
                startDate: history.startDate,
                endDate: history.endDate,
            })
        })
    }
    if(req.body.education && req.body.education.length > 0){
        req.body.education.forEach(async education => {
            await Education.create({
                resumeId: resume.id,
                level: education.level,
                universityName: education.universityName,
                faculty: education.faculty,
                major: education.major,
                endDate: education.endDate,
            })
        })
    }
    if(req.body.foreignLanguages && req.body.foreignLanguages.length > 0){
        req.body.foreignLanguages.forEach(async foreignLanguage => {
            await ForeignLanguage.create({
                resumeId: resume.id,
                level: foreignLanguage.level,
                name: foreignLanguage.name,
            })
        })
    }
    if(req.body.resumeEmploymentTypes && req.body.resumeEmploymentTypes.length > 0){
        req.body.resumeEmploymentTypes.forEach(async resumeEmploymentType => {
            await ResumeEmploymentType.create({
                resumeId: resume.id,
                employmentTypeId: resumeEmploymentType.employmentTypeId,
            })
        })
    }
    res.status(200).send(resume);
}

const getMyResumes = async(req, res) => {
    const resumes = await Resume.findAll({where: {userId: req.user.id}})
    res.status(200).send(resumes)
}

const getResume = async(req, res) => {
    const resume = await Resume.findByPk(req.params.id, {
        include: [
            {
                model: WorkingHistory,
                as: 'workingHistories'
            },
            {
                model: Education,
                as: 'education'
            },
            {
                model: EmploymentType,
                as: 'employmentTypes'
            },
            {
                model: ForeignLanguage,
                as: 'foreignLanguages'
            },
            {
                model: City,
                as: 'city'
            },
            {
                model: Country,
                as: 'country'
            },
        ]
    })
    res.status(200).send(resume)
}

const deleteResume = async(req, res) => {
    const data = await Resume.destroy({
        where: {
            id: req.params.id,
        }
    })

    res.status(200).end()
}

const editResume = async(req, res) => {
    await Resume.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        position: req.body.position,
        cityId: req.body.cityId,
        citizenShip: req.body.citizenShip,
        about: req.body.about,
        birthday: req.body.birthday,
        gender: req.body.gender,
        salary: req.body.salary,
        salaryType: req.body.salaryType,
        mainLanguage: req.body.mainLanguage,
        skills: req.body.skills,
        userId: req.user.id,
    },
    {
        where: {
            id: req.body.id
        }
    })

    await WorkingHistory.destroy({
        where: {
            resumeId: req.body.id
        }
    })
    await Education.destroy({
        where: {
            resumeId: req.body.id
        }
    })
    await ResumeEmploymentType.destroy({
        where: {
            resumeId: req.body.id
        }
    })
    await ForeignLanguage.destroy({
        where: {
            resumeId: req.body.id
        }
    })
    const resume = {
        id: req.body.id
    }
    if(req.body.workingHistories && req.body.workingHistories.length > 0){
        req.body.workingHistories.forEach(async history => {
            await WorkingHistory.create({
                resumeId: resume.id,
                companyName: history.companyName,
                companyDescription: history.companyDescription,
                responsibilities: history.responsibilities,
                startDate: history.startDate,
                endDate: history.endDate,
            })
        })
    }
    if(req.body.education && req.body.education.length > 0){
        req.body.education.forEach(async education => {
            await Education.create({
                resumeId: resume.id,
                level: education.level,
                universityName: education.universityName,
                faculty: education.faculty,
                major: education.major,
                endDate: education.endDate,
            })
        })
    }
    if(req.body.foreignLanguages && req.body.foreignLanguages.length > 0){
        req.body.foreignLanguages.forEach(async foreignLanguage => {
            await ForeignLanguage.create({
                resumeId: resume.id,
                level: foreignLanguage.level,
                name: foreignLanguage.name,
            })
        })
    }
    if(req.body.resumeEmploymentTypes && req.body.resumeEmploymentTypes.length > 0){
        req.body.resumeEmploymentTypes.forEach(async resumeEmploymentType => {
            await ResumeEmploymentType.create({
                resumeId: resume.id,
                employmentTypeId: resumeEmploymentType.employmentTypeId,
            })
        })
    }
    res.status(200).end()
}

const searchResume = async(req, res) => {
    const options = {};
    const {q, cityId, salaryFrom, salaryTo, salaryType, citizenShip} = req.query;
    if(q){
        options[Op.or] = [
            {firstname: { [Op.iLike]: `%${q}%`} },
            {lastname: { [Op.iLike]: `%${q}%`} },
            {position: { [Op.iLike]: `%${q}%`} },
            {about: { [Op.iLike]: `%${q}%`} },
            {skills: { [Op.iLike]: `%${q}%`} },
        ]
    }
    if(citizenShip){
        options.citizenShip = citizenShip
    }
    if(cityId){
        options.cityId = cityId
    }
    if(salaryFrom && !salaryTo){
        options.salary = { [Op.gte]: salaryFrom }
    }
    else if(!salaryFrom && salaryTo){
        options.salary = { [Op.lte]: salaryTo }
    }
    else if(salaryFrom && salaryTo){
        options.salary = { [Op.between]: [salaryFrom, salaryTo] }
    }
    if(salaryType){
        options.salaryType = salaryType
    }

    const resumes = await Resume.findAll({
        where: options
    })
    res.status(200).send(resumes)
}

module.exports = {
    createResume,
    getMyResumes,
    getResume,
    deleteResume,
    editResume,
    searchResume,
}