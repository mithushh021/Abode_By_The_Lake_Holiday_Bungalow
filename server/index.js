/**
 * ABODE BY THE LAKE — Backend Server
 * Express + Nodemailer contact form API
 */

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
const PORT = process.env.PORT || 5000

// ---- Middleware ----
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ---- Email transporter ----
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// ---- Health check ----
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Abode by the Lake server running' })
})

// ---- Contact form endpoint ----
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, checkIn, checkOut, guests, message } = req.body

  // Basic validation
  if (!firstName || !lastName || !email || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ error: 'Required fields missing.' })
  }

  try {
    // --- Email to property owner ---
    const ownerMail = {
      from: `"Abode by the Lake" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking Enquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #222;">
          <div style="background:#0b0a09; padding: 2rem; text-align:center; border-bottom: 2px solid #c9a84c;">
            <h1 style="color:#c9a84c; font-weight:300; margin:0; font-size:1.8rem;">Abode by the Lake</h1>
            <p style="color:#999; font-size:0.75rem; letter-spacing:0.2em; text-transform:uppercase; margin:0.4rem 0 0;">New Booking Enquiry</p>
          </div>
          <div style="padding: 2rem; background: #f9f6f0;">
            <table style="width:100%; border-collapse:collapse; font-size:0.9rem;">
              <tr><td style="padding:0.6rem 0; border-bottom:1px solid #ddd; color:#888; width:35%;">Guest Name</td>
                  <td style="padding:0.6rem 0; border-bottom:1px solid #ddd; font-weight:600;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:0.6rem 0; border-bottom:1px solid #ddd; color:#888;">Email</td>
                  <td style="padding:0.6rem 0; border-bottom:1px solid #ddd;"><a href="mailto:${email}" style="color:#9a7a30;">${email}</a></td></tr>
              <tr><td style="padding:0.6rem 0; border-bottom:1px solid #ddd; color:#888;">Phone</td>
                  <td style="padding:0.6rem 0; border-bottom:1px solid #ddd;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding:0.6rem 0; border-bottom:1px solid #ddd; color:#888;">Check-In</td>
                  <td style="padding:0.6rem 0; border-bottom:1px solid #ddd;">${checkIn}</td></tr>
              <tr><td style="padding:0.6rem 0; border-bottom:1px solid #ddd; color:#888;">Check-Out</td>
                  <td style="padding:0.6rem 0; border-bottom:1px solid #ddd;">${checkOut}</td></tr>
              <tr><td style="padding:0.6rem 0; border-bottom:1px solid #ddd; color:#888;">Guests</td>
                  <td style="padding:0.6rem 0; border-bottom:1px solid #ddd;">${guests}</td></tr>
              <tr><td style="padding:0.6rem 0; color:#888; vertical-align:top;">Message</td>
                  <td style="padding:0.6rem 0;">${message || 'No additional message.'}</td></tr>
            </table>
          </div>
          <div style="background:#0b0a09; padding:1.2rem; text-align:center;">
            <p style="color:#555; font-size:0.72rem; margin:0;">Received via abodebythelake.lk contact form</p>
          </div>
        </div>
      `,
    }

    // --- Auto-reply to guest ---
    const guestMail = {
      from: `"Abode by the Lake" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'We received your enquiry — Abode by the Lake',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #222;">
          <div style="background:#0b0a09; padding: 2rem; text-align:center; border-bottom: 2px solid #c9a84c;">
            <h1 style="color:#c9a84c; font-weight:300; margin:0; font-size:1.8rem;">Abode by the Lake</h1>
            <p style="color:#999; font-size:0.75rem; letter-spacing:0.2em; text-transform:uppercase; margin:0.4rem 0 0;">Luxury Holiday Bungalow · Sri Lanka</p>
          </div>
          <div style="padding: 2.5rem; background: #f9f6f0; line-height:1.8;">
            <p>Dear ${firstName},</p>
            <p>Thank you for reaching out to <strong>Abode by the Lake</strong>. We have received your enquiry and will be in touch within <strong>24 hours</strong> to confirm availability and discuss your stay.</p>
            <p style="background:#fff; border-left:3px solid #c9a84c; padding:1rem 1.2rem; margin:1.5rem 0; font-size:0.88rem;">
              <strong>Your Enquiry Summary:</strong><br/>
              Check-In: <strong>${checkIn}</strong><br/>
              Check-Out: <strong>${checkOut}</strong><br/>
              Guests: <strong>${guests}</strong>
            </p>
            <p>In the meantime, feel free to reach us directly:</p>
            <p>📞 <strong>+94 77 123 4567</strong> (Phone & WhatsApp)<br/>
               ✉️ <strong>stay@abodebythelake.lk</strong></p>
            <p style="color:#888; font-style:italic;">We look forward to welcoming you to the lake.</p>
            <p>Warm regards,<br/><strong>The Abode by the Lake Team</strong></p>
          </div>
          <div style="background:#0b0a09; padding:1.2rem; text-align:center;">
            <p style="color:#555; font-size:0.72rem; margin:0;">Lake Road, Negombo, Western Province, Sri Lanka 11500</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(ownerMail)
    await transporter.sendMail(guestMail)

    console.log(`[Contact] Enquiry from ${firstName} ${lastName} <${email}>`)
    res.status(200).json({ success: true, message: 'Enquiry sent successfully.' })

  } catch (err) {
    console.error('[Contact] Email error:', err)
    // Still log the enquiry even if email fails
    console.log('[Contact] Enquiry data:', { firstName, lastName, email, phone, checkIn, checkOut, guests, message })
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

// ---- Start server ----
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║   Abode by the Lake — Server         ║
  ║   Running on http://localhost:${PORT}   ║
  ╚══════════════════════════════════════╝
  `)
})
