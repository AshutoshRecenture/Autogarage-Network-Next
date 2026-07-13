const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const { configureCloudinary } = require("./config/cloudinary");

// Initialize Cloudinary
configureCloudinary();

// Routes imports
const authRoutes = require("./routes/auth.routes");
const captchaRoutes = require("./routes/captcha.routes");
const contactRoutes = require("./routes/contact.routes");
const blogRoutes = require("./routes/blog.routes");
const projectRoutes = require("./routes/project.routes");
const serviceRoutes = require("./routes/service.routes");
const bookingRoutes = require("./routes/booking.routes");
const mediaRoutes = require("./routes/media.routes");
const settingsRoutes = require("./routes/settings.routes");
const faqRoutes = require("./routes/faq.routes");
const userRoutes = require("./routes/user.routes");
const socialMediaRoutes = require("./routes/socialMedia.routes");
const pageContentRoutes = require("./routes/pageContent.routes");
const vacancyRoutes = require("./routes/vacancy.routes");
const websiteRegisterRoutes = require("./routes/websiteRegister.routes");

const path = require("path");

const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images folder
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Welcome test route
app.get("/", (req, res) => {
  res.json({ message: "Auto Garage Network GMS Suite API is running..." });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/captcha", captchaRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/users", userRoutes);
app.use("/api/social-media", socialMediaRoutes);
app.use("/api/pages", pageContentRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/website-register", websiteRegisterRoutes);

// Fallback middlewares for error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
