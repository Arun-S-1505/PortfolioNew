import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    
    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create professional email content
    const emailContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:     ${name}
Email:    ${email}
Date:     ${new Date().toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'short' 
          })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This message was sent from your portfolio contact form.
To reply, simply respond to this email.
    `.trim();

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "arunsivagnanamurthy@gmail.com",
      subject: `📬 New Portfolio Message from ${name}`,
      replyTo: email,
      text: emailContent,
    });
    
    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
