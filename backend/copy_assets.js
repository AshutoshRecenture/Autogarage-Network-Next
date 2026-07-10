const fs = require("fs");
const path = require("path");

const frontendAssetsDir = path.join(__dirname, "../frontned/src/assets");
const backendPublicDir = path.join(__dirname, "public/images");

// List of subdirectories to create if they exist
const subDirs = ["dashboard", "hero"];

// Ensure target directories exist
if (!fs.existsSync(backendPublicDir)) {
  fs.mkdirSync(backendPublicDir, { recursive: true });
}
subDirs.forEach((dir) => {
  const fullPath = path.join(backendPublicDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Helper to copy files
function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  const files = fs.readdirSync(from);
  files.forEach((file) => {
    const fromPath = path.join(from, file);
    const toPath = path.join(to, file);
    const stat = fs.statSync(fromPath);

    if (stat.isFile()) {
      if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".webp") || file.endsWith(".svg")) {
        fs.copyFileSync(fromPath, toPath);
        console.log(`Copied: ${file}`);
      }
    } else if (stat.isDirectory() && subDirs.includes(file)) {
      copyFolderSync(fromPath, path.join(to, file));
    }
  });
}

console.log("Copying main assets...");
copyFolderSync(frontendAssetsDir, backendPublicDir);

console.log("Copying subfolder images...");
copyFolderSync(path.join(frontendAssetsDir, "images"), backendPublicDir);

console.log("Asset copying completed successfully!");
