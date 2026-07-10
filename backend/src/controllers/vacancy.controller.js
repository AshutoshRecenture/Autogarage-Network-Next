const Vacancy = require("../models/Vacancy");

// @desc    Get all vacancies
// @route   GET /api/vacancies
// @access  Public
const getVacancies = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const vacancies = await Vacancy.find(filter).sort({ createdAt: -1 });
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a vacancy
// @route   POST /api/vacancies
// @access  Private/Admin
const createVacancy = async (req, res) => {
  try {
    const { role, salary, workingHours, isActive } = req.body || {};

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const newVacancy = await Vacancy.create({
      role,
      salary: salary || "",
      workingHours: workingHours || "",
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(newVacancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a vacancy
// @route   PUT /api/vacancies/:id
// @access  Private/Admin
const updateVacancy = async (req, res) => {
  try {
    const { role, salary, workingHours, isActive } = req.body || {};

    const vacancy = await Vacancy.findById(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    if (role !== undefined) vacancy.role = role;
    if (salary !== undefined) vacancy.salary = salary;
    if (workingHours !== undefined) vacancy.workingHours = workingHours;
    if (isActive !== undefined) vacancy.isActive = isActive;

    const updatedVacancy = await vacancy.save();
    res.json(updatedVacancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a vacancy
// @route   DELETE /api/vacancies/:id
// @access  Private/Admin
const deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    await vacancy.deleteOne();
    res.json({ message: "Vacancy removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
};
