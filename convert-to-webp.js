const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const exts = ['.jpg', '.jpeg', '.png'];
const rootDirs = ['images', 'downloads'];

function getAllFiles(dir, files = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, files);
        } else {
            files.push(filePath);
        }
    });
    return files;
}

async function convertToWebp(file) {
    const ext = path.extname(file).toLowerCase();
    if (!exts.includes(ext)) return;
    const outFile = file.replace(ext, '.webp');
    if (fs.existsSync(outFile)) return; // не перезаписываем существующие webp
    try {
        await sharp(file)
            .webp({ quality: 85 })
            .toFile(outFile);
        console.log('✔', outFile);
    } catch (e) {
        console.error('Ошибка для', file, e.message);
    }
}

(async () => {
    for (const dir of rootDirs) {
        if (!fs.existsSync(dir)) continue;
        const files = getAllFiles(dir);
        for (const file of files) {
            await convertToWebp(file);
        }
    }
    console.log('Готово! Все изображения сконвертированы в webp.');
})(); 