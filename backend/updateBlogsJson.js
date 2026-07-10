const fs = require("fs");
const path = require("path");

const blogsPath = path.join(__dirname, "src/data/blogs.json");
let blogs = JSON.parse(fs.readFileSync(blogsPath, "utf8"));

const mapping = {
  "Workshop-Management-Systems-600x300.webp": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507788/Workshop-Management-Systems-1000x436.webp",
  "workshop-management-software-600x300.jpg": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507787/workshop-management-software-1000x436_1.jpg",
  "The-Automate-Garage-Management-Software-600x300.jpg": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507786/The-Automate-Garage-Management-Software-1000x436.jpg",
  "new_garage-managment-600x300.jpg": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507785/new_garage-managment-1000x436.jpg",
  "international-enters-into-tyre-software-600x300.jpg": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507784/international-enters-into-tyre-software-1000x436.jpg",
  "garage-software-improve-customer-600x300.jpg": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507783/garage-software-improve-customer-1000x436.jpg",
  "garage-management-software-efficient-600x300.jpg": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507782/garage-management-software-efficient-1000x436.jpg",
  "experience-garage-management-software-600x300.jpg": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507781/experience-garage-management-software-1000x436.jpg",
  "garage-managemen-software-vehicle-600x300.jpg": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507781/garage-managemen-software-vehicle-1000x436.jpg",
  "Automate-Tasks-600x300.webp": "https://res.cloudinary.com/n4okswsd/image/upload/v1783507779/Automate-Tasks-1000x436.webp"
};

blogs.forEach(blog => {
  if (mapping[blog.image]) {
    blog.image = mapping[blog.image];
  } else {
    blog.image = "https://res.cloudinary.com/n4okswsd/image/upload/Blog/hero.jpg";
  }
});

fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2));
console.log("Updated blogs.json with exact Cloudinary URLs.");
