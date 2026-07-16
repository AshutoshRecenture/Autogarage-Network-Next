import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import JobApplication from '@/models/JobApplication';
import Vacancy from '@/models/Vacancy';
import { verifyCaptchaToken } from '@/utils/captcha';
import { cloudinary, configureCloudinary } from '@/config/cloudinary';

// Initialize Cloudinary
configureCloudinary();

const uploadToCloudinary = async (file) => {
  if (!file) return "";
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "resumes", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    return result.secure_url || result.url || "";
  } catch (error) {
    console.error("Cloudinary resume upload failed:", error);
    return "";
  }
};

export async function GET(req) {
  try {
    await connectDB();
    const vacancies = await Vacancy.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(vacancies);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    const captchaToken = formData.get("captchaToken");
    if (!(await verifyCaptchaToken(captchaToken))) {
      return NextResponse.json(
        { status: false, message: "Invalid or expired Captcha verification. Please try again." },
        { status: 400 }
      );
    }
    
    const name = formData.get("name");
    const email = formData.get("email");
    const city = formData.get("city");
    const phone = formData.get("phone");
    const applyFor = formData.get("applyFor");
    const experience = formData.get("experience");
    
    if (!name || !email || !city || !phone || !applyFor || !experience) {
      return NextResponse.json(
        { status: false, message: "Please fill in all mandatory fields." },
        { status: 400 }
      );
    }

    let resumeUrl = "";
    const resume = formData.get("resume");
    if (resume && typeof resume === 'object') {
      resumeUrl = await uploadToCloudinary(resume);
    }

    if (!resumeUrl) {
      return NextResponse.json(
        { status: false, message: "Please upload your resume." },
        { status: 400 }
      );
    }

    const application = await JobApplication.create({
      name,
      email,
      city,
      phone,
      applyFor,
      experience,
      resumeUrl,
      message: formData.get("message") || "",
    });

    return NextResponse.json(
      { status: true, message: "Application submitted successfully!", data: application },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job Application Submission Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
