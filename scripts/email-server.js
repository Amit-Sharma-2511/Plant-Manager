import http from 'http';
import nodemailer from 'nodemailer';

const PORT = 3001;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/send-email') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { name, email, subject, message } = JSON.parse(body);

        if (!name || !email || !subject || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: 'Missing required fields' }));
          return;
        }

        // Configure Nodemailer transporter with Gmail app password
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'technicalvideosamit@gmail.com',
            pass: 'gsedelchobugamwm' // Spaces removed
          }
        });

        const cleanSubject = subject.replace(/-/g, ' ');
        const year = new Date().getFullYear();
        const dateStr = new Date().toLocaleString();

        // Responsive, structured HTML template
        const emailBody = `
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8faf9; padding: 40px 20px; color: #1b2a22; margin: 0;">
  <div style="max-w: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0e7e2; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 81, 50, 0.05);">
    <!-- Header -->
    <div style="background-color: #0f5132; padding: 32px 24px; text-align: center;">
      <h1 style="font-family: Georgia, serif; color: #ffffff; margin: 0; font-size: 26px; font-weight: bold; letter-spacing: -0.5px;">GrowMyPlant<span style="color: #198754;">.</span></h1>
      <p style="color: #e2e8e4; margin: 6px 0 0 0; font-size: 13px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase;">New Contact Submission</p>
    </div>
    
    <!-- Body Content -->
    <div style="padding: 40px 32px;">
      <h2 style="font-family: Georgia, serif; color: #0f5132; margin-top: 0; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #f4f7f5; padding-bottom: 12px; font-weight: bold;">Inquiry Information</h2>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.5;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #526359; width: 140px; border-bottom: 1px solid #f4f7f5;">Full Name</td>
          <td style="padding: 10px 0; color: #1b2a22; border-bottom: 1px solid #f4f7f5;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #526359; border-bottom: 1px solid #f4f7f5;">Email Address</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f4f7f5;"><a href="mailto:${email}" style="color: #198754; text-decoration: none; font-weight: 600;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #526359; border-bottom: 1px solid #f4f7f5;">Subject Topic</td>
          <td style="padding: 10px 0; color: #1b2a22; font-weight: 500; border-bottom: 1px solid #f4f7f5; text-transform: capitalize;">${cleanSubject}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #526359; border-bottom: 1px solid #f4f7f5;">Date Received</td>
          <td style="padding: 10px 0; color: #1b2a22; border-bottom: 1px solid #f4f7f5;">${dateStr}</td>
        </tr>
      </table>

      <!-- Message Area -->
      <h3 style="font-family: Georgia, serif; color: #0f5132; font-size: 16px; margin: 32px 0 12px 0; font-weight: bold;">User Message</h3>
      <div style="background-color: #f4f7f5; border-left: 4px solid #198754; padding: 20px; border-radius: 0 12px 12px 0; font-size: 14px; color: #1b2a22; line-height: 1.6; white-space: pre-wrap; margin-bottom: 10px;">
${message}
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f8faf9; padding: 20px 32px; border-top: 1px solid #e0e7e2; text-align: center; font-size: 12px; color: #8a9c92;">
      <p style="margin: 0; line-height: 1.5;">This inquiry was sent programmatically from the GrowMyPlant contact portal.</p>
      <p style="margin: 4px 0 0 0; font-weight: 500;">© ${year} GrowMyPlant. All rights reserved.</p>
    </div>
  </div>
</div>
`;

        const mailOptions = {
          from: '"GrowMyPlant Contact" <technicalvideosamit@gmail.com>',
          to: 'sharmaamit99526@gmail.com',
          replyTo: email,
          subject: `[GrowMyPlant Contact] ${cleanSubject.toUpperCase()} - from ${name}`,
          html: emailBody
        };

        await transporter.sendMail(mailOptions);
        console.log(`[SMTP Success] Email sent successfully from ${name} to sharmaamit99526@gmail.com`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success' }));
      } catch (error) {
        console.error('[SMTP Error] Details:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: error.message }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`[SMTP Local Relay] Server is running on http://localhost:${PORT}`);
});
