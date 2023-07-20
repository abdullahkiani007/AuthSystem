import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter object with your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${process.env.HOST_MAIL}`,
    pass: `${process.env.HOST_PASS}`,
  },
});

// Email content

// Sending the email

const sendCode = async (email, code) => {
  const mailOptions = {
    from: `${process.env.HOST_MAIL}`,
    to: email,
    subject: "Verification Code",
    text: "This is a test email sent from Node.js with Nodemailer.",
    html: `<h1>${code}</h1>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    return {
      status: 200,
      message: "Code sent",
    };
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return {
      status: 500,
      message: "Nodemailer Error",
    };
  }
};

export default sendCode;
