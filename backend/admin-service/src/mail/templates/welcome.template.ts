export const getWelcomeEmailTemplate = (name: string, to: string, pass: string, frontendUrl: string, startDateTime?: Date | string, assessmentTitle?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to OriginBI</title>
  <style>
    @import url('https://db.onlinewebfonts.com/c/a5dba0b16bff4acae22426705d079a08?family=Haskoy');

    body { 
      margin: 0; 
      padding: 0; 
      background-color: #f1f3f7; 
      font-family: 'Haskoy', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f1f3f7;
      padding-bottom: 40px;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      /* Confetti Background - Placeholder URL */
      background-image: url('https://originbi-assets.s3.ap-south-1.amazonaws.com/email-confetti-bg-top.png'); 
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: top center;
    }

    .main-table {
      width: 100%;
      border-spacing: 0;
      color: #1e293b;
    }

    /* Header Section with Confetti */
    .header-section {
      text-align: left;
      padding: 60px 40px 20px 40px;
      background-color: transparent;
    }

    .header-title {
      font-size: 28px;
      font-weight: 700;
      color: #000000;
      margin: 0;
      line-height: 1.2;
    }

    /* Green Line Separator */
    .separator-line {
      height: 4px;
      background-color: #2ed573;
      width: 100%;
      margin-top: 20px;
      margin-bottom: 40px;
    }

    /* Content Area */
    .content-section {
      padding: 0 40px;
    }

    .greeting {
      font-size: 18px;
      color: #000000;
      margin-bottom: 16px;
    }

    .greeting strong {
      color: #1a237e;
    }

    .intro-text {
      font-size: 16px;
      line-height: 1.6;
      color: #333333;
      margin-bottom: 24px;
    }

    .login-heading {
      color: #2ed573;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    /* Credentials Grid */
    .credentials-table {
      width: 100%;
      margin-bottom: 24px;
    }
    
    .cred-label {
      font-size: 15px;
      color: #666666;
      padding: 6px 0;
      width: 40%;
    }
    
    .cred-value {
      font-size: 15px;
      color: #000000;
      font-weight: 500;
      padding: 6px 0;
    }

    /* Button */
    .btn-primary {
      display: inline-block;
      background-color: #1a237e;
      color: #ffffff;
      padding: 14px 28px;
      border-radius: 4px; 
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      margin-top: 10px;
      margin-bottom: 30px;
    }

    .footer-note {
      font-size: 15px;
      line-height: 1.6;
      color: #333333;
      margin-bottom: 30px;
    }
    
    .sign-off {
      font-size: 16px;
      color: #333333;
      margin-bottom: 50px;
    }
    
    .sign-off strong {
      display: block;
      color: #000000;
      font-weight: 700;
    }

    /* Footer / Bottom Pattern */
    .bottom-pattern {
      height: 100px;
      background-color: #e8ecf2;
      background-image: url('https://originbi-assets.s3.ap-south-1.amazonaws.com/email-footer-pattern.png');
      background-size: cover;
      padding: 20px 40px;
      text-align: left;
    }

    .copyright {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 8px;
    }

    .footer-links a {
      color: #1a237e;
      text-decoration: none;
      font-size: 12px;
      font-weight: 500;
    }

    @media screen and (max-width: 600px) {
      .header-section { padding: 40px 20px 20px 20px; }
      .content-section { padding: 0 20px; }
      .bottom-pattern { padding: 20px; }
      .header-title { font-size: 24px; }
      .cred-label, .cred-value { font-size: 14px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <table class="main-table">
        <tr>
          <td class="header-section">
            <h1 class="header-title">Thank you for Registering</h1>
            <div class="separator-line"></div>
          </td>
        </tr>
        <tr>
          <td class="content-section">
            <div class="greeting">Dear <strong>${name}</strong>,</div>
            
            <div class="intro-text">
              Thank you for registering with OriginBI! We're excited to welcome you and inform you that an online assessment has been scheduled for you.
            </div>

            <div class="login-heading">Here are your login details:</div>

            <table class="credentials-table">
              <tr>
                <td class="cred-label">Assessment Title</td>
                <td class="cred-value">${assessmentTitle || 'Role Match Explorer'}</td>
              </tr>
              <tr>
                <td class="cred-label">Start Date and Time</td>
                <td class="cred-value">${startDateTime
        ? new Date(startDateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }</td>
              </tr>
              <tr>
                <td class="cred-label">Username</td>
                <td class="cred-value">${to}</td>
              </tr>
              <tr>
                <td class="cred-label">Password</td>
                <td class="cred-value">${pass}</td>
              </tr>
            </table>

            <div class="intro-text">
              Please log in at least 15 minutes before the scheduled time to ensure everything works smoothly. The assessment is timed, so manage your time effectively to complete all the questions.
            </div>

            <a href="${frontendUrl}/login" class="btn-primary">Start your assessment</a>

            <div class="footer-note">
              If you need any assistance, our team is here to help. Welcome aboard!
            </div>

            <div class="sign-off">
              Best regards,<br>
              <strong>Origin BI Team</strong>
            </div>
          </td>
        </tr>
        <tr>
          <td class="bottom-pattern">
             <div class="copyright">&copy; ${new Date().getFullYear()} Origin BI | All Rights Reserved</div>
             <div class="footer-links">
               <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a>
             </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
`;
