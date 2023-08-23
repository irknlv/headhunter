const Company = require('../auth/Company');
const EmploymentType = require('../employmentType/EmploymentType');
const City = require('../region/City');
const Specialization = require('../specialization/models/Specialization');
const Experience = require('./models/Experience')
const Vacancy = require('./models/Vacancy')
const { Op } = require('sequelize');

const getExperiences = async(req, res) => {
    const experiences = await Experience.findAll()

    res.status(200).send(experiences);
}

const createVacancy = async(req, res) => {
    const vacancy = await Vacancy.create({
        name: req.body.name,
        salaryFrom: req.body.salaryFrom,
        salaryTo: req.body.salaryTo,
        salaryType: req.body.salaryType,
        address: req.body.address,
        description: req.body.description,
        skills: req.body.skills,
        aboutCompany: req.body.aboutCompany,
        cityId: req.body.cityId,
        userId: req.user.id,
        companyId: req.user.companyId,
        specializationId: req.body.specializationId,
        experienceId: req.body.experienceId,
        employmentTypeId: req.body.employmentTypeId,
      })
    res.status(200).end()
}

const getMyVacancies = async(req, res) => {
    const vacancies = await Vacancy.findAll({
        where: {
            companyId: req.user.companyId
        }
    })
    res.status(200).send(vacancies)
}

const getVacancy = async(req, res) => {
    const vacancy = await Vacancy.findByPk(req.params.id, {
        include: [
            {
                model: City,
                as: 'city'
            },
            {
                model: Experience,
                as: 'experience'
            },
            {
                model: Specialization,
                as: 'specialization'
            },
            {
                model: Company,
                as: 'company'
            },
            {
                model: EmploymentType,
                as: 'employmentType'
            },
        ]
    });
    if(vacancy){
        res.status(200).send(vacancy)
    } else{
        res.status(404).send({message: "Vacancy with that was not found"})
    }
}

const deleteVacancy = async(req, res) => {
    await Vacancy.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).end()
    
}

const editVacancy = async(req, res) => {
    const vacancy = await Vacancy.update({
        name: req.body.name,
        salaryFrom: req.body.salaryFrom,
        salaryTo: req.body.salaryTo,
        salaryType: req.body.salaryType,
        address: req.body.address,
        description: req.body.description,
        skills: req.body.skills,
        aboutCompany: req.body.aboutCompany,
        cityId: req.body.cityId,
        userId: req.user.id,
        companyId: req.user.companyId,
        specializationId: req.body.specializationId,
        experienceId: req.body.experienceId,
        employmentTypeId: req.body.employmentTypeId,
      },
      {
        where: {
            id: req.params.id || req.body.id
        }
      })
    res.status(200).end()
}

const searchVacancy = async(req, res) => {
    const options = {};
    const {q, specializationId, cityId, employmentTypeId, salary, salaryType, experienceId} = req.query;
    if(q){
        options[Op.or] = [
            {name: { [Op.iLike]: `%${q}%`} },
            {description: { [Op.iLike]: `%${q}%`} },
            {aboutCompany: { [Op.iLike]: `%${q}%`} },
            {skills: { [Op.iLike]: `%${q}%`} },
        ]
    }
    if(specializationId){
        options.specializationId = specializationId
    }
    if(cityId){
        options.cityId = cityId
    }
    if(employmentTypeId){
        options.employmentTypeId = employmentTypeId
    }
    if(experienceId){
        options.experienceId = experienceId
    }
    if(salaryType){
        options.salaryType = salaryType
    }
    if(salary){
        options.salaryFrom = {[Op.lte]: salary}
        options.salaryTo = {[Op.gte]: salary}
    }

    const vacancies = await Vacancy.findAll({
        where: options
    })
    res.status(200).send(vacancies)
}

module.exports = {
    getExperiences,
    createVacancy,
    getMyVacancies,
    getVacancy,
    deleteVacancy,
    editVacancy,
    searchVacancy,
}