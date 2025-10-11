export const emailTemplate = (name: string, email: string, message: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
  <style>
    ${require('./email-styles').emailStyles}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬New Message!</h1>
      <p>Someone reached out through your portfolio!</p>
    </div>

    <div class="content">
      <div class="message-card">
        <div class="field">
          <div class="field-label">👤 From</div>
          <div class="field-value">${name}</div>
        </div>

        <div class="field">
          <div class="field-label">📧 Email Address</div>
          <div class="field-value">${email}</div>
        </div>

        <div class="field">
          <div class="field-label">💬 Message</div>
          <div class="field-value">
            <div class="message-content">${message.replace(/\n/g, "<br>")}</div>
          </div>
        </div>
      </div>

      <p style="text-align: center; color: #6b7280; font-size: 16px;">
        <span class="emoji">⚡</span>
        This message was sent through your portfolio contact form. Consider responding within 24 hours to maintain great communication!
      </p>
    </div>

    <div class="footer">
      <p>
        <strong>Arun Saravanan S</strong> - Web Developer<br>
        <span class="highlight">Portfolio Message Notification</span><br>
        Your Location • arunsivagnanamurthy@gmail.com
      </p>
    </div>
  </div>
</body>
</html>
`;