const Service = require("../models/Service");

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
  try {
    const { title, price, desc, icon } = req.body;

    const service = new Service({
      title,
      price,
      desc,
      icon,
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
  try {
    const { title, price, desc, icon } = req.body;

    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = title || service.title;
      service.price = price || service.price;
      service.desc = desc || service.desc;
      service.icon = icon || service.icon;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      await service.deleteOne();
      res.json({ message: "Service removed" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
