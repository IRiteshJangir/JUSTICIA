const appointmentConfirmation = ({ fullName, preferredDate, preferredTime, consultationType }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #D99A32;">Appointment Confirmation</h2>
      <p>Dear ${fullName},</p>
      <p>Thank you for requesting an appointment with JUSTICIA. We have received your request.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D99A32; margin: 20px 0;">
        <p><strong>Consultation Type:</strong> ${consultationType}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime}</p>
      </div>
      <p>Our team will review your request and contact you shortly to confirm the appointment.</p>
      <p>Best regards,<br>The JUSTICIA Team</p>
    </div>
  `;
};

const appointmentStatusUpdate = ({ fullName, status, adminNotes }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #D99A32;">Appointment Status Update</h2>
      <p>Dear ${fullName},</p>
      <p>The status of your appointment request has been updated to: <strong>${status}</strong></p>
      ${adminNotes ? `<p><strong>Notes from our team:</strong><br>${adminNotes}</p>` : ''}
      <p>If you have any questions, please feel free to contact us.</p>
      <p>Best regards,<br>The JUSTICIA Team</p>
    </div>
  `;
};

const newEnquiryNotification = ({ name, email, subject, message }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #D99A32;">New Contact Enquiry</h2>
      <p>A new enquiry has been submitted through the JUSTICIA website.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D99A32; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  `;
};

const enquiryAutoReply = ({ name }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #D99A32;">Thank you for contacting JUSTICIA</h2>
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
      <p>Our typical response time is within 1-2 business days.</p>
      <p>Best regards,<br>The JUSTICIA Team</p>
    </div>
  `;
};

module.exports = {
  appointmentConfirmation,
  appointmentStatusUpdate,
  newEnquiryNotification,
  enquiryAutoReply,
};
