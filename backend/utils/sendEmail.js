import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"SajiloMart" <${process.env.EMAIL}>`,
    to: email,
    subject: "Verify Your Account",
    html: `
  <div style="font-family: Arial; padding: 20px;">
    <h2 style="color:#333;">SajiloMart Verification</h2>
    <p>Your OTP code is:</p>
    <h1 style="letter-spacing: 5px;">${otp}</h1>
    <p>This code will expire in 10 minutes.</p>
    <hr/>
    <p style="font-size:12px;color:gray;">
      If you didn't request this, ignore this email.
    </p>
  </div>
`,
  });
};
