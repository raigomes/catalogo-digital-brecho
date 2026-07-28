import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, "../public")
const srcPath = path.join(publicDir, "sacola.png")

const sizes = [192, 512]

async function generateIcons() {
  for (const size of sizes) {
    await sharp(srcPath)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `icon-${size}.png`))

    console.log(`✅ icon-${size}.png generated from sacola.png`)
  }
}

generateIcons().catch(console.error)
