export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
      }
      .header {
        background: linear-gradient(to right, #36D1DC, #5B86E5);
        padding: 30px;
        text-align: center;
        border-radius: 12px 12px 0 0;
      }
      .logo {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
        border-radius: 50%;
        background-color: white;
        padding: 10px;
      }
      .header h1 {
        color: white;
        margin: 0;
        font-size: 28px;
        font-weight: 500;
      }
      .content {
        background-color: #ffffff;
        padding: 35px;
        border-radius: 0 0 12px 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      }
      .greeting {
        font-size: 18px;
        color: #5B86E5;
      }
      .info-box {
        background-color: #f8f9fa;
        padding: 25px;
        border-radius: 10px;
        margin: 25px 0;
        border-left: 4px solid #36D1DC;
      }
      .info-box p {
        font-size: 16px;
        margin: 0 0 15px 0;
      }
      .info-box ul {
        padding-left: 20px;
        margin: 0;
      }
      .info-box li {
        margin-bottom: 10px;
      }
      .info-box li:last-child {
        margin-bottom: 0;
      }
      .cta-container {
        text-align: center;
        margin: 30px 0;
      }
      .cta-button {
        background: linear-gradient(to right, #36D1DC, #5B86E5);
        color: white;
        text-decoration: none;
        padding: 12px 30px;
        border-radius: 50px;
        font-weight: 500;
        display: inline-block;
      }
      .signature {
        margin-top: 25px;
        margin-bottom: 0;
      }
      .footer {
        text-align: center;
        padding: 20px;
        color: #999;
        font-size: 12px;
      }
      .footer a {
        color: #5B86E5;
        text-decoration: none;
        margin: 0 10px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg?t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480" alt="Messenger Logo" class="logo">
      <h1>Welcome to Messenger!</h1>
    </div>
    <div class="content">
      <p class="greeting"><strong>Hello ${name},</strong></p>
      <p>We're excited to have you join our messaging platform! Messenger connects you with friends, family, and colleagues in real-time, no matter where they are.</p>
      
      <div class="info-box">
        <p><strong>Get started in just a few steps:</strong></p>
        <ul>
          <li>Set up your profile picture</li>
          <li>Find and add your contacts</li>
          <li>Start a conversation</li>
          <li>Share photos, videos, and more</li>
        </ul>
      </div>
      
      <div class="cta-container">
        <a href=${clientURL} class="cta-button">Open Messenger</a>
      </div>
      
      <p style="margin-bottom: 5px;">If you need any help or have questions, we're always here to assist you.</p>
      <p style="margin-top: 0;">Happy messaging!</p>
      
      <p class="signature">Best regards,<br>The Messenger Team</p>
    </div>
    
    <div class="footer">
      <p>© 2025 Messenger. All rights reserved.</p>
      <p>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </p>
    </div>
  </body>
  </html>
  `;
}