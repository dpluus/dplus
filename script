import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

    /* --- 1. ULTRA SECURITY SYSTEM (ANTI-LEAK) --- */
    (function() {
        // Obfuscate Console
        const noop = () => {};
        ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace'].forEach(k => {
            console[k] = noop;
        });

        // Trigger Protection
        function triggerSecurity() {
            document.body.innerHTML = "";
            document.getElementById('security-blocker').style.display = 'flex';
            // Break script execution
            throw new Error("Security Violation");
        }

        // Detect DevTools (Resize & Keyboard)
        window.addEventListener('resize', () => {
            if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
                triggerSecurity();
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                triggerSecurity();
                return false;
            }
        });

        // Advanced Debugger Trap (Runs continuously to prevent network inspection)
        setInterval(() => {
            const start = performance.now();
            debugger;
            if (performance.now() - start > 100) {
                triggerSecurity();
            }
        }, 500);
    })();

    /* --- 2. FIREBASE CONFIG --- */
    const firebaseConfig = { 
        apiKey: "AIzaSyDc1nKTG49ZUkD6j20RFIs1ooPb50PAaCg", 
        authDomain: "funabox-bb8c1.firebaseapp.com", 
        projectId: "funabox-bb8c1", 
        storageBucket: "funabox-bb8c1.firebasestorage.app", 
        messagingSenderId: "1001020133611", 
        appId: "1:1001020133611:web:ce7cf1e0d16aae40436eae" 
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let masterList = [];
    let art = null;

    /* --- 3. ULTRA PERFORMANCE PLAYER ENGINE --- */
    window.startStream = (encodedUrl, name) => {
        // Basic security check before decoding
        if(window.outerWidth - window.innerWidth > 160) return; 

        const url = atob(encodedUrl);
        document.getElementById('playing-title').innerHTML = `${name} <span class="live-badge">LIVE</span>`;
        window.scrollTo({top: 0, behavior: 'smooth'});

        if (art) art.destroy(true);

        // Artplayer with ALL controls enabled & Performance Tuned
        art = new Artplayer({
            container: '#player',
            url: url,
            isLive: true,
            autoplay: true,
            muted: false,
            volume: 1,
            fullscreen: true,
            pip: true,
            setting: true,
            flip: true,            // NEW
            playbackRate: true,    // NEW
            aspectRatio: true,     // NEW
            screenshot: true,      // NEW
            hotkey: true,          // NEW
            lock: true,            // NEW
            miniProgressBar: true, // NEW
            theme: '#e50914',
            autoOrientation: true,
            
            // Optimization for mobile
            moreVideoAttr: {
                'playsinline': true,
                'webkit-playsinline': true,
                'x5-video-player-type': 'h5',
            },

            customType: {
                m3u8: function (video, url) {
                    if (Hls.isSupported()) {
                        const hls = new Hls({
                            debug: false,
                            enableWorker: true,      // Multi-threading for performance
                            lowLatencyMode: true,    // Low Latency
                            backBufferLength: 90,    // Stable buffer
                            fragLoadingTimeOut: 20000,
                        });
                        hls.loadSource(url);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            if(hls.levels.length > 1) {
                                art.setting.add({
                                    name: 'Quality',
                                    type: 'selector',
                                    html: 'Auto',
                                    selector: hls.levels.map((l, i) => ({ html: `${l.height}p`, level: i })),
                                    onSelect: (item) => { hls.currentLevel = item.level; return item.html; }
                                });
                            }
                        });
                        
                        // Error Recovery
                        hls.on(Hls.Events.ERROR, function (event, data) {
                            if (data.fatal) {
                                switch (data.type) {
                                    case Hls.ErrorTypes.NETWORK_ERROR:
                                        hls.startLoad();
                                        break;
                                    case Hls.ErrorTypes.MEDIA_ERROR:
                                        hls.recoverMediaError();
                                        break;
                                    default:
                                        hls.destroy();
                                        break;
                                }
                            }
                        });
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = url;
                    }
                }
            }
        });
    };

    window.playExternalPrompt = () => {
        const url = prompt("Paste Stream URL (M3U8/MPD):");
        if(url) window.startStream(btoa(url), "External Link");
    };

    /* --- 4. DATA ENGINE --- */
    window.switchCategory = async (cat, btn) => {
        if(btn) { document.querySelectorAll('.pill').forEach(el => el.classList.remove('active')); btn.classList.add('active'); }
        
        const grid = document.getElementById('channel-grid');
        document.getElementById('finder').value = "";
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:50px; color:#555"><i class="fas fa-circle-notch fa-spin fa-2x"></i></div>';
        
        masterList = [];

        try {
            if(cat === 'jazz') {
                const snapshot = await getDocs(query(collection(db, "jazz_tv_v2"), orderBy("position", "asc")));
                snapshot.forEach(doc => masterList.push({ name: doc.data().channelName, url: doc.data().channelUrl, logo: doc.data().logoUrl }));
            }
            else if(cat === 'sports') {
                const res = await fetch("https://raw.githubusercontent.com/dpluus/dplus/refs/heads/main/m4u");
                parseM3U(await res.text(), masterList);
            }
            else {
                
                const pktTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Karachi"});
                const hour = new Date(pktTime).getHours();
                const isPrimeTime = (hour >= 18 && hour < 23);

                let m3uChannels = [];
                let jsonChannels = [];

                // 1. M3U (All)
                const whiteList = ['star sports','ptv','sony ten','cricket',];
                try {
                    const m3uRes = await fetch("https://biostar-tv-world.vercel.app/biostar.m3u");
                    if(m3uRes.ok) parseM3U(await m3uRes.text(), m3uChannels, whiteList);
                } catch(e){}

                // 2. JSON (All)
              
                try {
                    const jsonRes = await fetch(" ");
                    const data = await jsonRes.json();
                    (data.record.channels || data.record).forEach(c => 
                        jsonChannels.push({ name: c.name || c.title, url: c.link || c.url, logo: c.logo || "https://via.placeholder.com/150" })
                    );
                } catch(e){}

                // 3. Merge based on Time
                if(isPrimeTime) masterList = [...m3uChannels, ...jsonChannels];
                else masterList = [...jsonChannels, ...m3uChannels];

                // 4. Abu Dhabi Sports 1 Priority
                masterList.sort((a, b) => {
                    if(a.name.toLowerCase().includes("Abu Dhabi Sports 1")) return -1;
                    if(b.name.toLowerCase().includes("Abu Dhabi Sports 1")) return 1;
                    return 0;
                });
            }
            renderGrid(masterList);
            if(masterList.length > 0) window.startStream(btoa(masterList[0].url), masterList[0].name);

        } catch (err) { grid.innerHTML = `<div style="grid-column:1/-1; text-align:center">Failed to load. Check internet.</div>`; }
    };

    function parseM3U(text, targetList, filter = null) {
        const lines = text.split('\n');
        for(let i=0; i<lines.length; i++) {
            if(lines[i].startsWith('#EXTINF')) {
                const name = lines[i].substring(lines[i].lastIndexOf(',') + 1).trim();
                const url = (lines[i+1] || "").trim();
                const logoMatch = lines[i].match(/tvg-logo="([^"]+)"/);
                
                if(url && !url.startsWith('#')) {
                    const obj = { name, url, logo: logoMatch ? logoMatch[1] : "https://via.placeholder.com/150" };
                    if(filter) {
                        if(filter.some(k => name.toLowerCase().includes(k))) targetList.push(obj);
                    } else targetList.push(obj);
                }
            }
        }
    }

    function renderGrid(list) {
        const grid = document.getElementById('channel-grid');
        grid.innerHTML = "";
        if(list.length === 0) { grid.innerHTML = "No channels found"; return; }
        list.forEach(item => {
            const card = document.createElement('div'); card.className = 'channel-card';
            card.onclick = () => window.startStream(btoa(item.url), item.name);
            card.innerHTML = `<img src="${item.logo}" loading="lazy" onerror="this.src='https://via.placeholder.com/150'"><div class="name">${item.name}</div>`;
            grid.appendChild(card);
        });
    }

    window.filterChannels = () => {
        const term = document.getElementById('finder').value.toLowerCase();
        renderGrid(masterList.filter(c => c.name.toLowerCase().includes(term)));
    };

    /* --- 5. INITIALIZATION --- */
    window.onload = async () => {
        if(navigator.connection) setInterval(() => document.getElementById('net-speed').innerText = navigator.connection.downlink + " Mbps", 3000);
        
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        try {
            const snap = await getDoc(doc(db, "vidmax_site_config", "main"));
            if(snap.exists()){
                const d = snap.data();
                if(d.arm7) { document.getElementById('h-ediafire').href = d.arm7; document.getElementById('p-mediafire').href = d.arm7; }
                if(d.arm8) { document.getElementById('h-direct').href = d.arm8; document.getElementById('p-direct').href = d.arm8; }

                if(d.version) {
                    const vText = ` v${d.version}`;
                    document.getElementById('top-promo').innerHTML = `Download M TV App <b>${vText}</b> for smooth playback!`;
                    document.getElementById('modal-title').innerHTML = `Smart Update! <span style="color:var(--primary)">${vText}</span>`;
                    
                    if(isMobile) setTimeout(() => document.getElementById('update-modal').style.display = 'flex', 3000);
                }
            }
        } catch(e){}
        
        switchCategory('sports2');
    };