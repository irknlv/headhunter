const EmploymentTypes = require('./EmploymentType')
const { Op } = require('sequelize')

const getAllEmpTypes = async(req, res) => {
    const empTypes = await EmploymentTypes.findAll()
    res.status(200).send(empTypes)
}

module.exports = {
    getAllEmpTypes,
}