// Clean frontend - no secrets visible!
async function loadData() {
    const btn = document.getElementById('refresh-btn');
    btn.textContent = 'loading...';
    btn.disabled = true;
    
    try {
        // Send visitor data to your backend
        const response = await fetch('/api/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userAgent: navigator.userAgent,
                screen: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
                referrer: document.referrer
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Update display with data from backend
            document.getElementById('ip').textContent = result.data.ip;
            document.getElementById('location').textContent = result.data.location;
            document.getElementById('isp').textContent = result.data.isp;
            document.getElementById('country').textContent = result.data.country;
            document.getElementById('timezone').textContent = result.data.timezone;
            document.getElementById('coords').textContent = result.data.coords;
            document.getElementById('asn').textContent = result.data.asn;
            document.getElementById('useragent').textContent = navigator.userAgent;
            document.getElementById('screen').textContent = `${window.screen.width}x${window.screen.height}`;
            document.getElementById('lang').textContent = navigator.language;
            
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            document.getElementById('connection').textContent = connection ? `${connection.effectiveType || 'unknown'}` : 'unavailable';
        }
        
    } catch (error) {
        console.error('Failed to load data:', error);
        document.getElementById('ip').textContent = 'error';
    }
    
    btn.textContent = 'refresh data';
    btn.disabled = false;
}

function refresh() {
    loadData();
}

document.addEventListener('DOMContentLoaded', loadData);
