import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, "../public")
const logoPath = path.join(publicDir, "logo.png")

const sizes = [192, 512]

async function generateIcons() {
  for (const size of sizes) {
    await sharp(logoPath)
      .resize(size, size, { fit: "contain", background: { r: 26, g: 26, b: 26, alpha: 1 } })
      .png()
      .toFile(path.join(publicDir, `icon-${size}.png`))

    console.log(`✅ icon-${size}.png generated from logo.png`)
  }
}

generateIcons().catch(console.error)
