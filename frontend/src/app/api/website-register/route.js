import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import WebsiteRegister from '@/models/WebsiteRegister';
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
        { folder: "documents", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    return result.secure_url || result.url || "";
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return "";
  }
};

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
    
    const email = formData.get("email");
    const contactName = formData.get("contactName");
    const phone = formData.get("phone");
    const companyNumber = formData.get("companyNumber");
    
    if (!email || !contactName || !phone || !companyNumber) {
      return NextResponse.json(
        { status: false, message: "Please fill in all mandatory fields: Email, Contact Name, Phone No., and Company Number." },
        { status: 400 }
      );
    }

    let termsDocUrl = "";
    let privacyDocUrl = "";
    let returnsDocUrl = "";

    const termsDoc = formData.get("termsDoc");
    if (termsDoc && typeof termsDoc === 'object') {
      termsDocUrl = await uploadToCloudinary(termsDoc);
    }
    
    const privacyDoc = formData.get("privacyDoc");
    if (privacyDoc && typeof privacyDoc === 'object') {
      privacyDocUrl = await uploadToCloudinary(privacyDoc);
    }
    
    const returnsDoc = formData.get("returnsDoc");
    if (returnsDoc && typeof returnsDoc === 'object') {
      returnsDocUrl = await uploadToCloudinary(returnsDoc);
    }
    
    const noDomainName = formData.get("noDomainName");

    const newRegister = await WebsiteRegister.create({
      monFriFrom: formData.get("monFriFrom") || "Closed",
      monFriTo: formData.get("monFriTo") || "Closed",
      satFrom: formData.get("satFrom") || "Closed",
      satTo: formData.get("satTo") || "Closed",
      sunFrom: formData.get("sunFrom") || "Closed",
      sunTo: formData.get("sunTo") || "Closed",
      email: formData.get("email"),
      address: formData.get("address") || "",
      contactName: formData.get("contactName"),
      phone: formData.get("phone"),
      domainName: formData.get("domainName") || "",
      domainRegUrl: formData.get("domainRegUrl") || "",
      domainUsername: formData.get("domainUsername") || "",
      domainPassword: formData.get("domainPassword") || "",
      noDomainName: noDomainName === "true" || noDomainName === true,
      sellTyres: formData.get("sellTyres") || "No",
      offerServices: formData.get("offerServices") || "No",
      useSocialMedia: formData.get("useSocialMedia") || "No",
      companyNumber: formData.get("companyNumber"),
      termsDocUrl,
      privacyDocUrl,
      returnsDocUrl,
      companyAge: formData.get("companyAge") || "",
      socialInfo: formData.get("socialInfo") || "",
      salesPerson: formData.get("salesPerson") || "",
      designStyle: formData.get("designStyle") || "",
    });

    return NextResponse.json(
      { status: true, message: "Website requirement gathering form submitted successfully!", data: newRegister },
      { status: 201 }
    );
  } catch (error) {
    console.error("Website Register Submission Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
