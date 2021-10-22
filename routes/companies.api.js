const express = require('express');
const router = express.Router();

const {
  getCompanies,
  createCompany,
  updateCompanyById,
  deleteCompanyById,
} = require("../controllers/companies.controller");

router.get('/', getCompanies);
router.post('/', createCompany);
router.put('/:id', updateCompanyById);
router.delete('/:id', deleteCompanyById);

module.exports = router;