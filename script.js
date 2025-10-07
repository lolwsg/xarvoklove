let animationDelay = 0;

function animateText(element, newText, delay = 0) {
    setTimeout(() => {
        element.classList.add('hide');
        
        setTimeout(() => {
            element.textContent = newText;
            element.classList.remove('hide');
            element.classList.add('show');
        }, 400);
    }, delay);
}

async function loadData() {
    const btn = document.getElementById('refresh-btn');
    btn.textContent = 'loading...';
    btn.disabled = true;
    
    animationDelay = 0;
    
    // Reset all animations
    document.querySelectorAll('.scroll-text').forEach(el => {
        el.classList.remove('show', 'hide');
    });
    
    try {
        // Get comprehensive IP info
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Animate each piece of data
        animateText(document.getElementById('ip'), data.ip || 'unable to fetch', animationDelay += 200);
        
        animateText(document.getElementById('location'), 
            `${data.city || 'unknown'}, ${data.region || 'unknown'}, ${data.country_name || 'unknown'}`, 
            animationDelay += 200);
        
        animateText(document.getElementById('isp'), data.org || 'unknown provider', animationDelay += 200);
        
        animateText(document.getElementById('country'), 
            `${data.country_code || 'unknown'} (${data.country_calling_code || 'n/a'})`, 
            animationDelay += 200);
        
        animateText(document.getElementById('timezone'), data.timezone || 'unknown timezone', animationDelay += 200);
        
        animateText(document.getElementById('coords'), 
            `${data.latitude || 'unknown'}, ${data.longitude || 'unknown'}`, 
            animationDelay += 200);
        
        animateText(document.getElementById('asn'), 
            `AS${data.asn || 'unknown'} - ${data.network || 'unknown network'}`, 
            animationDelay += 200);
        
    } catch (error) {
        console.error('failed to fetch ip data:', error);
        animateText(document.getElementById('ip'), 'error fetching data', animationDelay += 200);
        animateText(document.getElementById('location'), 'error', animationDelay += 200);
        animateText(document.getElementById('isp'), 'error', animationDelay += 200);
        animateText(document.getElementById('country'), 'error', animationDelay += 200);
        animateText(document.getElementById('timezone'), 'error', animationDelay += 200);
        animateText(document.getElementById('coords'), 'error', animationDelay += 200);
        animateText(document.getElementById('asn'), 'error', animationDelay += 200);
    }
    
    // Browser/system info
    animateText(document.getElementById('useragent'), navigator.userAgent, animationDelay += 200);
    
    animateText(document.getElementById('screen'), 
        `${screen.width}x${screen.height} (${screen.colorDepth}bit)`, 
        animationDelay += 200);
    
    animateText(document.getElementById('lang'), 
        `${navigator.language || 'unknown'} (${navigator.languages?.join(', ') || 'n/a'})`, 
        animationDelay += 200);
    
    // Connection info
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    animateText(document.getElementById('connection'), 
        connection ? `${connection.effectiveType || 'unknown'} - ${connection.downlink || 'unknown'}mbps` : 'connection info unavailable', 
        animationDelay += 200);
    
    // DNS info (simplified)
    animateText(document.getElementById('dns'), 
        'dns info requires additional permissions', 
        animationDelay += 200);
    
    setTimeout(() => {
        btn.textContent = 'refresh data';
        btn.disabled = false;
    }, animationDelay + 500);
}

function refresh() {
    loadData();
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadData);
