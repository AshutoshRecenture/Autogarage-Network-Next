const fs = require("fs");
const path = require("path");

const blogSectionPath = path.join(__dirname, "../frontned/src/components/BlogSection.jsx");

let content = fs.readFileSync(blogSectionPath, "utf8");

// 1. Remove the static image imports
const importRegex = /\/\/ Import downloaded blog image assets[\s\S]*?import heroImg from "\.\.\/assets\/images\/hero\/hero\.jpg";/g;
if (content.match(importRegex)) {
  content = content.replace(importRegex, "// Blog images are now fetched dynamically from the backend static folder");
  console.log("Static image imports removed.");
} else {
  console.log("Static image imports not found or already removed.");
}

// 2. Locate the posts array and replace it with state & useEffect
const postsStartMarker = "const BlogSection = ({ limit }) => {\n  const [currentPage, setCurrentPage] = useState(1);\n  const [selectedPost, setSelectedPost] = useState(null);\n  const [selectedCategory, setSelectedCategory] = useState(\"All\");\n  const postsPerPage = 9;\n\n  useEffect(() => {\n    if (!limit) {\n      window.scrollTo({ top: 0, behavior: \"smooth\" });\n    }\n  }, [currentPage, limit]);\n\n  const posts = [";

const postsEndMarker = "  ];\n\n  const allCategories = [\"All\", ...new Set(posts.map((post) => post.category))];";

const startIndex = content.indexOf(postsStartMarker);
const endIndex = content.indexOf(postsEndMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const replacementText = `const BlogSection = ({ limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const postsPerPage = 9;

  useEffect(() => {
    if (!limit) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, limit]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);`;

  content = content.substring(0, startIndex) + replacementText + "\n\n" + content.substring(endIndex + 4);
  fs.writeFileSync(blogSectionPath, content, "utf8");
  console.log("BlogSection.jsx updated with dynamic fetch success!");
} else {
  console.error("Markers not found! Start:", startIndex, "End:", endIndex);
}
