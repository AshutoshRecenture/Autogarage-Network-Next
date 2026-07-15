'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { CldImage, CldVideoPlayer } from 'next-cloudinary';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'next-cloudinary/dist/cld-video-player.css';
import { FaStar, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaClock, FaUser, FaArrowRight } from 'react-icons/fa';

export default function Blog() {
  const swiperRef = useRef(null);
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const blogsData = (await import("../../data/blogs.json")).default;
        
        const processedBlogs = blogsData.map((blog, index) => ({
          ...blog,
          id: blog._id || index.toString(),
          slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        }));
        
        const fetchedBlogs = processedBlogs.slice(0, 3);
        setBlogs(fetchedBlogs);
        setError(null);
      } catch (err) {
        setError("Failed to load blog data.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Latest Blog</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Agile minds pouring in some informative, read-worthy content for you!</p>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-20 lg:px-24 relative">
        
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 px-4">
            {[1, 2, 3].map(skeleton => (
              <div key={skeleton} className="animate-pulse flex flex-col h-full">
                <div className="w-full aspect-[16/9] bg-slate-200 rounded mb-8"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-6 mx-auto"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-slate-200 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-8"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-20 px-4">
            <div className="bg-red-50 text-red-600 max-w-2xl mx-auto p-6 rounded-xl border border-red-100">
              <h3 className="font-bold text-lg mb-2">Oops! Couldn't load the blogs.</h3>
              <p>{error}</p>
              <p className="mt-4 text-sm opacity-80">Make sure your Cloudinary credentials are set in .env.local</p>
            </div>
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-20 px-4">
            <h3 className="text-xl font-medium text-slate-600">No blog posts found.</h3>
            <p className="text-slate-400 mt-2">Upload some images/videos to Cloudinary with the 'blog' tag to get started.</p>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <>
            {/* Custom Navigation Arrows - Only show if we actually have more than 3 items, or on smaller screens where they swipe. 
                Since we cap at 3 items, desktop won't need arrows. We'll add swiper-button-disabled support implicitly via Swiper state if needed, but for now they just work natively for md/lg breakpoints where slidesPerView < 3 */}
            <button 
              className="hidden md:flex blog-prev-btn absolute left-2 lg:left-6 top-[55%] -translate-y-1/2 w-12 h-24 bg-slate-400 hover:bg-blue-600 text-white items-center justify-center z-10 transition-all duration-300 rounded shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-0 disabled:pointer-events-none"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-2xl" />
            </button>
            
            <button 
              className="hidden md:flex blog-next-btn absolute right-2 lg:right-6 top-[55%] -translate-y-1/2 w-12 h-24 bg-slate-400 hover:bg-blue-600 text-white items-center justify-center z-10 transition-all duration-300 rounded shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-0 disabled:pointer-events-none"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next slide"
            >
              <FaChevronRight className="text-2xl" />
            </button>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={false} /* Disabled loop so it doesn't duplicate the 3 cards to fill empty space */
              grabCursor={true}
              autoplay={{ delay: 5000, disableOnInteraction: true }}
              navigation={{
                prevEl: '.blog-prev-btn',
                nextEl: '.blog-next-btn',
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 30 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
                1280: { slidesPerView: 3, spaceBetween: 50 },
              }}
              className="pb-12"
            >
              {blogs.map((blog, idx) => (
                <SwiperSlide key={`${blog.id}-${idx}`} className="h-auto">
                  <div className="flex flex-col h-full group bg-white shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden text-left">
                    
                    {/* Media Container - Edge to Edge with 2:1 aspect ratio to match reference */}
                    <div className="w-full relative overflow-hidden">
                      {blog.resourceType === 'video' ? (
                        <div className="w-full aspect-[2/1] bg-black">
                          <CldVideoPlayer
                            id={`video-${blog.id}-${idx}`}
                            width="600"
                            height="300"
                            src={blog.publicId}
                            colors={{ accent: '#1EA1F1' }}
                            logo={false}
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-[2/1] bg-slate-100 flex items-center justify-center overflow-hidden">
                          <CldImage
                            width="600"
                            height="300"
                            src={blog.image || "placeholder"}
                            alt={blog.title}
                            crop="fill"
                            gravity="auto"
                            format="webp"
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Content Container - Padded */}
                    <div className="flex flex-col flex-1 p-6 lg:p-8">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug mb-4 group-hover:text-[#1EA1F1] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-slate-500 text-[14px] leading-relaxed mb-8 flex-1 font-normal line-clamp-2">
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto">
                        <Link href={`/blog/${blog.slug}`} className="bg-[#1EA1F1] hover:bg-[#1589d1] text-white font-semibold text-[14px] py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 w-max">
                          Read More 
                          <FaArrowRight className="text-[12px]" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </section>
  );
}
