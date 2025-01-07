export const baseTemplate = (logoUrl: string, content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: Arial, sans-serif;
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
      padding: 20px 0;
      background: white;
      border-radius: 8px 8px 0 0;
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
      padding: 12px 24px;
      background-color: #E02653;
      color: white !important;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .info-box {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 4px;
      margin: 20px 0;
      border-left: 4px solid #E02653;
    }
    .highlight {
      color: #E02653;
      font-weight: bold;
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      margin-bottom: 24px;
    }
    h2 {
      color: #2d3748;
      font-size: 20px;
      margin-bottom: 16px;
    }
    .contact-link {
      display: block;
      text-align: center;
      margin-top: 30px;
      color: #E02653;
      text-decoration: none;
      font-weight: 500;
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
      <a href="/contact" class="contact-link">¿Necesitas ayuda? Contáctanos</a>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Euro Connect. Todos los derechos reservados.
    </div>
  </div>
</body>
</html>
`