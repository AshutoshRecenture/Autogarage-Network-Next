const User = require("../models/User");

const seedAdmin = async () => {
  try {
    // 1. Super Admin Account
    const superAdminEmail = "superadmin@autogaragenetwork.com";
    let superAdmin = await User.findOne({ email: superAdminEmail });

    if (!superAdmin) {
      console.log("Seeding super admin account...");
      await User.create({
        name: "Super Admin",
        email: superAdminEmail,
        password: "superadmin123",
        role: "super_admin",
      });
      console.log("SUCCESS: Super admin seeded successfully!");
    } else {
      if (superAdmin.role !== "super_admin") {
        superAdmin.role = "super_admin";
        await superAdmin.save();
        console.log("SUCCESS: Existing super admin upgraded!");
      } else {
        console.log("Super admin account already exists.");
      }
    }

    // 2. Standard Admin Account
    const adminEmail = "admin@autogaragenetwork.com";
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      console.log("Seeding default standard admin account...");
      await User.create({
        name: "Standard Admin",
        email: adminEmail,
        password: "admin123",
        role: "admin",
        permissions: {
          contacts: { read: true, write: false },
          chatLeads: { read: true, write: false },
          blogs: { read: true, write: true }, // blogs write access
          faqs: { read: true, write: false },
          media: { read: true, write: false },
          settings: { read: true, write: false },
          socialMedia: { read: true, write: false },
          vacancies: { read: true, write: false },
          pages: { read: true, write: true },
          websiteRegister: { read: true, write: true },
        },
      });
      console.log("SUCCESS: Standard admin seeded successfully!");
    } else {
      // Force role and permissions to be standard admin for testing
      adminUser.role = "admin";
      adminUser.permissions = {
        contacts: { read: true, write: false },
        chatLeads: { read: true, write: false },
        blogs: { read: true, write: true },
        faqs: { read: true, write: false },
        media: { read: true, write: false },
        settings: { read: true, write: false },
        socialMedia: { read: true, write: false },
        vacancies: { read: true, write: false },
        pages: { read: true, write: true },
        websiteRegister: { read: true, write: true },
      };
      await adminUser.save();
      console.log("SUCCESS: Standard admin role/permissions updated.");
    }

    // 3. System Settings initialization
    const Settings = require("../models/Settings");
    let settings = await Settings.findOne();
    if (!settings) {
      console.log("Seeding default system settings...");
      await Settings.create({});
    }

    // 4. Predefined Core Pages seeding
    const PageContent = require("../models/PageContent");
    const corePages = [
      {
        title: "Home",
        slug: "home",
        bannerTitle: "Run Your Garage Smarter",
        bannerSubtitle:
          "Auto Garage Network is the premium garage management system & website provider for UK workshops.",
        content:
          `<div class="max-w-4xl mx-auto text-center !p-5 md:!p-8 bg-[#0c1222]/50 border border-white/5 rounded-[24px] shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
            <h2 class="!mt-0 !mb-3 text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 tracking-tight leading-tight">
              Welcome to Auto Garage Network
            </h2>
            <div class="h-0.5 w-16 bg-indigo-500 mx-auto rounded-full !my-3"></div>
            <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium !my-0">
              Providing the best digital products and services for garages in the UK. We empower auto workshops with high-fidelity websites, custom booking systems, and automated workflows.
            </p>
          </div>`,
      },
      {
        title: "About Us",
        slug: "about-us",
        bannerTitle: "About Auto Garage Network",
        bannerSubtitle:
          "We act as a lifetime e-partner for garage owners, building bespoke digital solutions.",
        content:
          `<div class="max-w-4xl mx-auto text-center !p-5 md:!p-8 bg-[#0c1222]/50 border border-white/5 rounded-[24px] shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
            <h2 class="!mt-0 !mb-3 text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 tracking-tight leading-tight">
              Our Journey & Commitment
            </h2>
            <div class="h-0.5 w-16 bg-indigo-500 mx-auto rounded-full !my-3"></div>
            <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium !my-0">
              Auto Garage Network is dedicated to supporting workshop owners with expert solutions. We believe in providing lifetime value, ensuring your business stays at the forefront of digital innovations.
            </p>
          </div>`,
      },
      {
        title: "Pricing Plans",
        slug: "pricing",
        bannerTitle: "Transparent & Flexible Pricing Plans",
        bannerSubtitle:
          "No hidden fees. Choose a plan that fits your workshop requirements.",   
        content:
          `<div class="max-w-4xl mx-auto text-center !p-5 md:!p-8 bg-[#0c1222]/50 border border-white/5 rounded-[24px] shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
            <h2 class="!mt-0 !mb-3 text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 tracking-tight leading-tight">
              Flexible Plans for Every Garage
            </h2>
            <div class="h-0.5 w-16 bg-indigo-500 mx-auto rounded-full !my-3"></div>
            <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium !my-0">
              Affordable, transparent pricing built around the needs of your business. Grow your audience, drive more bookings, and manage customer interactions without breaking the bank.
            </p>
          </div>`,
      },
      {
        title: "Search Engine Optimisation",
        slug: "seo",
        bannerTitle: "Search Engine Optimisation (SEO) Services",
        bannerSubtitle:
          "Position your workshop at the top of local rankings to drive steady leads.",
        content:
          `<div class="max-w-4xl mx-auto text-center !p-5 md:!p-8 bg-[#0c1222]/50 border border-white/5 rounded-[24px] shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
            <h2 class="!mt-0 !mb-3 text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 tracking-tight leading-tight">
              Dominate Local Search Results
            </h2>
            <div class="h-0.5 w-16 bg-indigo-500 mx-auto rounded-full !my-3"></div>
            <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium !my-0">
              Boost your website visibility and rank first in search results. Our targeted search engine optimization strategy puts your workshop on the map for local drivers looking for vehicle repairs.
            </p>
          </div>`,
      },
      {
        title: "Contact Us",
        slug: "contact-us",
        bannerTitle: "Contact Our Sales & Support Teams",
        bannerSubtitle:
          "Have questions? Reach our sales and support teams using the form or details below.",
        content:
          `<div class="max-w-4xl mx-auto text-center !p-5 md:!p-8 bg-[#0c1222]/50 border border-white/5 rounded-[24px] shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
            <h2 class="!mt-0 !mb-3 text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 tracking-tight leading-tight">
              Get In Touch With Us
            </h2>
            <div class="h-0.5 w-16 bg-indigo-500 mx-auto rounded-full !my-3"></div>
            <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium !my-0">
              Contact our support and sales teams for any assistance you need. We are available to help you configure your dashboard, manage domains, and address customer inquiries.
            </p>
          </div>`,
      },
    ];

    for (const page of corePages) {
      let existingPage = await PageContent.findOne({ slug: page.slug });
      if (!existingPage) {
        console.log(`Seeding core page: ${page.title}...`);
        await PageContent.create(page);
      } else {
        // Sync layout adjustments to database if different
        if (existingPage.content !== page.content) {
          existingPage.content = page.content;
          await existingPage.save();
          console.log(`Updated page content to styled template for: ${page.title}`);
        }
      }
    }
  } catch (error) {
    console.error("ERROR: Seeding admin failed:", error.message);
  }
};

module.exports = seedAdmin;
