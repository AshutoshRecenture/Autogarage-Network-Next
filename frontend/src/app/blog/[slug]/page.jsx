import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaClock, FaCalendarAlt, FaUser } from "react-icons/fa";

// Fetch blog data server-side
async function getBlog(slug) {
  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${slug}`, { 
      cache: 'no-store'
      // If backend is completely unreachable, this will throw
    });
    
    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch from API: ${res.status}`);
    }
    
    const result = await res.json();
    return Array.isArray(result) ? result[0] : (result.data || result);
  } catch (err) {
    // console.error("Error fetching blog server-side", err);
    // Return mock data for preview purposes
    return getMockBlog(slug);
  }
}

function getMockBlog(slug) {
  // Mock data fallback left intact...
  const mocks = {
    "how-workshop-management-systems-increase-profitability": {
      title: "How Workshop Management Systems Increase Profitability",
      excerpt: "Discover the hidden metrics and workflows you can optimize using a digital management system in your independent garage.",
      content: "<p>Managing an independent auto garage involves juggling appointments, technicians, parts inventory, and customer communication. A digital Workshop Management System (WMS) acts as the central nervous system for your business.</p><h3>1. Eliminating Paper Job Cards</h3><p>Paper job cards get lost, smudged with oil, and take time to manually decipher. A digital system ensures that mechanics see exactly what they need to do on their tablets, tracking time accurately.</p><h3>2. Automated Customer Follow-ups</h3><p>Following up on recommended work often slips through the cracks. Automated SMS reminders have proven to increase return business by up to 35%.</p>",
      category: "Business Tips",
      readingTime: 4,
      createdAt: new Date().toISOString(),
      author: "Alex Rivera",
      featuredImage: "/images/dashboard-mockup.png"
    },
    "top-5-mot-diary-features": {
      title: "Top 5 MOT Diary Features You Aren't Using (But Should Be)",
      excerpt: "Are you fully utilizing automated SMS reminders and integrated DVSA lookups? Learn how to unlock the full potential of your MOT Diary.",
      content: "<p>The MOT Diary is more than just a calendar. Here are five features you should activate today:</p><ol><li><strong>DVSA Lookup Integration:</strong> Instantly pull vehicle details by entering the registration number.</li><li><strong>Automated Reminder Campaigns:</strong> Set it and forget it. Notify customers 4 weeks, 2 weeks, and 1 day before their MOT expires.</li><li><strong>Online Booking Widget:</strong> Let customers book directly from your website 24/7.</li><li><strong>Technician Allocation:</strong> Assign MOT lanes and testers dynamically to prevent double booking.</li><li><strong>Reporting Dashboard:</strong> Analyze your busiest days and no-show rates to optimize staffing.</li></ol>",
      category: "Software Guide",
      readingTime: 6,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      author: "Sarah Jenkins",
      featuredImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
    }
  };

  return mocks[slug] || {
    title: "Why Your Auto Garage Needs a Bespoke Website in 2026",
    excerpt: "In a digital-first world, relying on word-of-mouth isn't enough. See how a professional web presence drives local foot traffic.",
    content: "<p>Your website is your digital storefront. If it looks outdated, potential customers will assume your garage equipment is outdated too. A premium bespoke website built with Next.js provides lightning-fast performance, ensuring you rank higher on Google local search results.</p><blockquote><p>\"Our foot traffic increased by 40% in the first quarter after launching our bespoke website.\" - A Happy Customer</p></blockquote>",
    category: "Marketing",
    readingTime: 5,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    author: "Marketing Team",
    featuredImage: "/images/premium-features-bg.png"
  };
}

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);
  if (!blog) return { title: "Blog Not Found" };
  
  return {
    title: `${blog.title} | Auto Garage Network Blog`,
    description: blog.excerpt,
  };
}

export default async function SingleBlogPage({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Blog Post Not Found</h1>
        <Link href="/blog" className="text-blue-600 hover:underline">
          &larr; Back to all articles
        </Link>
      </div>
    );
  }

  let formattedDate;
  if (blog.date) {
    formattedDate = blog.date; // Use the pre-formatted string if available
  } else if (blog.createdAt) {
    formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } else {
    formattedDate = "Recently";
  }
  
  const displayImage = blog.featuredImage || blog.image;

  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      
      {/* Blog Header Image */}
      <div className="w-full h-[400px] md:h-[500px] relative bg-slate-900">
        {displayImage && (
          <Image 
            src={displayImage} 
            alt={blog.title} 
            fill
            priority
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-16">
          <div className="max-w-[1000px] mx-auto px-6 w-full">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors"
            >
              <FaChevronLeft className="text-xs" /> Back to Blog
            </Link>
            
            {blog.category && (
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                {blog.category}
              </div>
            )}
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-400" />
                <span>{blog.author || "Admin"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-400" />
                <span>{formattedDate}</span>
              </div>
              {(blog.readingTime || blog.readTime) && (
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-400" />
                  <span>{blog.readTime || `${blog.readingTime} Min Read`}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-[1000px] mx-auto px-6 mt-16">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100">
          
          {blog.excerpt && (
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-12 pb-12 border-b border-slate-100">
              {blog.excerpt}
            </p>
          )}

          {Array.isArray(blog.content) ? (
            <div className="prose prose-slate prose-lg md:prose-xl max-w-none">
              {blog.content.map((block, i) => (
                <p key={i}>{typeof block === 'string' ? block : JSON.stringify(block)}</p>
              ))}
            </div>
          ) : (
            <article 
              className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:pr-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}
          
        </div>
      </div>

    </main>
  );
}
