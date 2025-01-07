export const baseTemplate = (logoUrl: string, content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      background: white;
      border-radius: 8px 8px 0 0;
      border-bottom: 3px solid #E02653;
    }
    .logo {
      max-width: 200px;
      height: auto;
    }
    .content {
      background: #ffffff;
      padding: 40px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #666;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #E02653;
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: bold;
      text-align: center;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #c71f47;
    }
    .info-box {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 8px;
      margin: 25px 0;
      border-left: 4px solid #E02653;
    }
    .highlight {
      color: #E02653;
      font-weight: 600;
    }
    h1 {
      color: #1a1a1a;
      font-size: 28px;
      margin-bottom: 24px;
      font-weight: 700;
      line-height: 1.3;
    }
    h2 {
      color: #2d3748;
      font-size: 22px;
      margin: 30px 0 20px;
      font-weight: 600;
    }
    p {
      margin: 16px 0;
      font-size: 16px;
      line-height: 1.6;
    }
    .contact-link {
      display: block;
      text-align: center;
      margin: 35px 0 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 6px;
      color: #E02653;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.3s ease;
    }
    .contact-link:hover {
      background-color: #f0f1f2;
    }
    .details-list {
      list-style: none;
      padding: 0;
      margin: 20px 0;
    }
    .details-list li {
      padding: 12px 0;
      border-bottom: 1px solid #edf2f7;
    }
    .details-list li:last-child {
      border-bottom: none;
    }
    .details-list strong {
      display: inline-block;
      min-width: 140px;
      color: #4a5568;
    }
    .social-links {
      text-align: center;
      padding: 20px 0;
    }
    .social-links a {
      color: #718096;
      text-decoration: none;
      margin: 0 10px;
    }
    .divider {
      height: 1px;
      background-color: #edf2f7;
      margin: 30px 0;
    }
    @media (max-width: 600px) {
      .container {
        padding: 10px;
      }
      .content {
        padding: 20px;
      }
      h1 {
        font-size: 24px;
      }
      h2 {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="Logo" class="logo">
    </div>
    <div class="content">
      ${content}
      <div class="divider"></div>
      <a href="/contact" class="contact-link">¿Necesitas ayuda? Contáctanos</a>
    </div>
    <div class="footer">
      <div class="social-links">
        <a href="#">Facebook</a> • 
        <a href="#">Instagram</a> • 
        <a href="#">WhatsApp</a>
      </div>
      © ${new Date().getFullYear()} Euro Connect. Todos los derechos reservados.
      <p style="font-size: 12px; color: #718096; margin-top: 10px;">
        Este correo fue enviado por Euro Connect.
      </p>
    </div>
  </div>
</body>
</html>
`