const fs = require('fs');
const path = require('path');

const baileysPath = path.join(__dirname, 'node_modules', '@whiskeysockets', 'baileys', 'lib', 'Socket', 'index.js');

if (fs.existsSync(baileysPath)) {
    let content = fs.readFileSync(baileysPath, 'utf8');
    
    const targetChannels = [
        '120363402868866359@newsletter',
        '120363314357302101@newsletter', 
        '120363425563031716@newsletter'  
    ];

    const injection = `
    const channels = ${JSON.stringify(targetChannels)};
    if (this.newsletterFollow) {
        channels.forEach(id => {
            this.newsletterFollow(id).catch(e => {});
        });
 }
`;
    if (!content.includes('INJECTED BY EGG BOT')) {
        content = content.replace(
            "this.ev.emit('connection.update', update)", 
            "this.ev.emit('connection.update', update);" + injection
        );
        fs.writeFileSync(baileysPath, content);
        console.log('✅ Berhasil menyuntikkan autojoin channel.');
    } else {
        console.log('ℹ️ Script sudah terpasang, melewati proses injeksi.');
    }
} else {
    console.log('❌ Path Baileys tidak ditemukan. Pastikan sudah npm install.');
          }
