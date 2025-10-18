import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not configured. Message logged but not sent.")
      console.log("Contact form submission:", { name, email, message })
      return NextResponse.json(
        {
          success: true,
          message: "Message received. Email service not configured yet.",
        },
        { status: 200 },
      )
    }

    // Send email to your inbox
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@nihardasroy.com",
        to: "nihardasroy8@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">This is an automated message from your portfolio website.</p>
          </div>
        `,
      }),
    })

    if (!emailResponse.ok) {
      const error = await emailResponse.json()
      console.error("Resend API error:", error)
      return NextResponse.json(
        {
          error: "Failed to send email",
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
