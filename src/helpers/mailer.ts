import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    // Create a hashed token using bcrypt
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      // Update the user with the hashed token
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour from now
      });
    } else if (emailType === "RESET") {
      // Update the user with the hashed token
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour from now
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "jordangrieve63@yahoo.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>
        Click <a href="${
          process.env.domain
        }/verifyemail?token=${hashedToken}">here</a>
        to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }
        or copy and paste the following link in your browser: ${process.env
          .domain!}/${
        emailType === "VERIFY"
          ? `verifyemail?token=${hashedToken}`
          : `resetpassword?token=${hashedToken}`
      }</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
