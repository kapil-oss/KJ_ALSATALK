// Email Service for sending OTP verification emails
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create transporter for Gmail
// Note: You'll need to configure Gmail App Password in .env
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD // Use App Password, not regular password
    }
});

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate verification token
function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Send verification OTP email
async function sendVerificationEmail(email, fullName, otp) {
    const mailOptions = {
        from: `"AlsaTalk - Alsatronix Solutions" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Verify Your AlsaTalk Account',
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border-radius: 16px;
            border: 1px solid rgba(6, 182, 212, 0.2);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: white;
            font-size: 28px;
            font-weight: 700;
        }
        .content {
            padding: 40px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #cbd5e1;
        }
        .otp-container {
            background: rgba(6, 182, 212, 0.1);
            border: 2px solid #06b6d4;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-label {
            font-size: 14px;
            color: #94a3b8;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .otp-code {
            font-size: 42px;
            font-weight: 800;
            color: #06b6d4;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
        }
        .message {
            color: #cbd5e1;
            line-height: 1.8;
            font-size: 15px;
            margin: 20px 0;
        }
        .warning {
            background: rgba(239, 68, 68, 0.1);
            border-left: 4px solid #ef4444;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 14px;
            color: #fca5a5;
        }
        .footer {
            background: #0f172a;
            padding: 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-text {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6;
        }
        .company-info {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎤 AlsaTalk</h1>
        </div>

        <div class="content">
            <div class="greeting">
                Hello <strong>${fullName}</strong>,
            </div>

            <p class="message">
                Thank you for registering with AlsaTalk! Your account has been approved by our administrator.
            </p>

            <p class="message">
                Please use the verification code below to complete your email verification:
            </p>

            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
            </div>

            <p class="message">
                This code will expire in <strong>15 minutes</strong>. Enter it on the verification page to activate your account.
            </p>

            <div class="warning">
                ⚠️ <strong>Security Notice:</strong> Never share this code with anyone. AlsaTalk staff will never ask for your verification code.
            </div>
        </div>

        <div class="footer">
            <div class="footer-text">
                <strong>AlsaTalk</strong> - Next-generation AI voice technology
            </div>
            <div class="company-info">
                <div class="footer-text">
                    <strong>Alsatronix Solutions DMCC</strong><br>
                    2507 The Dome Tower, Cluster N<br>
                    Jumeirah Lake Towers, Dubai, UAE<br>
                    <a href="mailto:info@alsatalk.com" style="color: #06b6d4;">info@alsatalk.com</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Verification email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending verification email:', error);
        throw error;
    }
}

// Send approval notification to user
async function sendApprovalNotification(email, fullName) {
    const mailOptions = {
        from: `"AlsaTalk - Alsatronix Solutions" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Your AlsaTalk Account Has Been Approved!',
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border-radius: 16px;
            border: 1px solid rgba(6, 182, 212, 0.2);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: white;
            font-size: 28px;
            font-weight: 700;
        }
        .content {
            padding: 40px;
        }
        .message {
            color: #cbd5e1;
            line-height: 1.8;
            font-size: 15px;
            margin: 20px 0;
        }
        .success-icon {
            text-align: center;
            font-size: 64px;
            margin: 20px 0;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
            color: white;
            padding: 15px 40px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            background: #0f172a;
            padding: 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-text {
            color: #94a3b8;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Account Approved!</h1>
        </div>

        <div class="content">
            <div class="success-icon">✅</div>

            <p class="message">
                Hello <strong>${fullName}</strong>,
            </p>

            <p class="message">
                Great news! Your AlsaTalk account has been approved by our administrator.
            </p>

            <p class="message">
                You will receive a verification code in a separate email. Please use it to verify your email address and start using AlsaTalk's AI voice technology.
            </p>

            <div style="text-align: center;">
                <a href="${process.env.APP_URL || 'http://localhost:3000'}/login" class="cta-button">
                    Go to Login Page
                </a>
            </div>
        </div>

        <div class="footer">
            <div class="footer-text">
                <strong>AlsaTalk by Alsatronix Solutions DMCC</strong>
            </div>
        </div>
    </div>
</body>
</html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Approval notification sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending approval notification:', error);
        throw error;
    }
}

// Send account activation email (when admin activates account)
async function sendActivationEmail(email, fullName) {
    const mailOptions = {
        from: `"AlsaTalk - Alsatronix Solutions" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Your AlsaTalk Account is Now Active!',
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border-radius: 16px;
            border: 1px solid rgba(6, 182, 212, 0.2);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: white;
            font-size: 28px;
            font-weight: 700;
        }
        .content {
            padding: 40px;
        }
        .message {
            color: #cbd5e1;
            line-height: 1.8;
            font-size: 15px;
            margin: 20px 0;
        }
        .success-icon {
            text-align: center;
            font-size: 64px;
            margin: 20px 0;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
            color: white;
            padding: 15px 40px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            background: #0f172a;
            padding: 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-text {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6;
        }
        .company-info {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Account Activated!</h1>
        </div>

        <div class="content">
            <div class="success-icon">✅</div>

            <p class="message">
                Hello <strong>${fullName}</strong>,
            </p>

            <p class="message">
                Congratulations! Your <strong>AlsaTalk.com</strong> account has been successfully activated by our administrator.
            </p>

            <p class="message">
                You can now log in and start experiencing our next-generation AI voice technology with our intelligent AI personas.
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.APP_URL || 'http://localhost:3000'}/login" class="cta-button">
                    Login to AlsaTalk
                </a>
            </div>

            <p class="message">
                If you have any questions or need assistance, feel free to contact us at <a href="mailto:administrator@alsatronix.com" style="color: #06b6d4;">administrator@alsatronix.com</a>
            </p>
        </div>

        <div class="footer">
            <div class="footer-text">
                <strong>AlsaTalk</strong> - Next-generation AI voice technology
            </div>
            <div class="company-info">
                <div class="footer-text">
                    <strong>Alsatronix Solutions DMCC</strong><br>
                    2507 The Dome Tower, Cluster N<br>
                    Jumeirah Lake Towers, Dubai, UAE<br>
                    <a href="mailto:info@alsatalk.com" style="color: #06b6d4;">info@alsatalk.com</a> |
                    <a href="tel:+971-443-32348" style="color: #06b6d4;">+971-443-32348</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Activation email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending activation email:', error);
        throw error;
    }
}

module.exports = {
    generateOTP,
    generateToken,
    sendVerificationEmail,
    sendApprovalNotification,
    sendActivationEmail
};
