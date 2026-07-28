import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, "../public")

const sizes = [192, 512]

async function generateIcons() {
  for (const size of sizes) {
    const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
            font-family="Courier, monospace" font-size="${size * 0.6}"
            font-weight="bold" fill="#f4f1ea">B</text>
    </svg>`

    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `icon-${size}.png`))

    console.log(`✅ icon-${size}.png generated`)
  }
}

generateIcons().catch(console.error)
