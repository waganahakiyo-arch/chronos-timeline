import puppeteer from 'puppeteer'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const htmlPath = resolve(__dirname, 'presentation.html')
const pdfPath = resolve(__dirname, 'chronos-timeline-presentation.pdf')

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()

await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 })

// Wait for Google Fonts to load
await new Promise(r => setTimeout(r, 2000))

await page.pdf({
  path: pdfPath,
  width: '297mm',
  height: '210mm',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
})

await browser.close()
console.log('PDF generated:', pdfPath)
