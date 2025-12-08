const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'public', 'gallery');
const outputFile = path.join(__dirname, 'src', 'data', 'galleryData.js');

// Ensure output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function getImages(dir, relativePath = '') {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // Skip hidden files
        if (file.startsWith('.')) return;

        if (stat && stat.isDirectory()) {
            results = results.concat(getImages(filePath, path.join(relativePath, file)));
        } else {
            // Check extensions
            if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
                results.push({
                    src: '/gallery/' + (relativePath ? relativePath + '/' : '') + file,
                    category: relativePath || 'general',
                    alt: file.replace(/\.[^/.]+$/, "").replace(/-/g, " ")
                });
            }
        }
    });
    return results;
}

try {
    if (!fs.existsSync(galleryDir)) {
        console.log("Creating public/gallery folder...");
        fs.mkdirSync(galleryDir, { recursive: true });
    }

    const images = getImages(galleryDir);

    const fileContent = `export const galleryData = ${JSON.stringify(images, null, 4)};\n`;

    fs.writeFileSync(outputFile, fileContent);
    console.log(`Success! Found ${images.length} images.`);
    console.log(`Data written to ${outputFile}`);

} catch (err) {
    console.error('Error:', err);
}
