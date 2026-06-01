import * as fs from 'fs'
import * as path from 'path'

// Define the source directory to scan for images
const ASSETS_DIR = 'assets'
// Define where to export the TypeScript file
const OUTPUT_FILE = 'src/image-assets.ts'

// Supported image file extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']

// Function to check if a file is an image based on its extension
function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase()
  return IMAGE_EXTENSIONS.includes(ext)
}

// Function to scan a directory recursively for image files
function scanDirectoryForImages(dir: string, baseDir: string = ''): string[] {
  const images: string[] = []
  const absolutePath = path.join(baseDir, dir)

  try {
    const files = fs.readdirSync(absolutePath)

    for (const file of files) {
      const filePath = path.join(absolutePath, file)
      const relativePath = path.join(dir, file)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        // Recursively scan subdirectories
        images.push(...scanDirectoryForImages(relativePath, baseDir))
      } else if (isImageFile(file)) {
        // Add image file to the list
        images.push(relativePath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${absolutePath}:`, error)
  }

  return images
}

// Generate a valid variable name from a file path
function generateVariableName(filePath: string): string {
  return filePath
    .replace(/^assets\//, '') // Remove the 'assets/' prefix
    .replace(/[^a-zA-Z0-9]/g, '_') // Replace non-alphanumeric characters with underscores
    .replace(/\.([^.]+)$/, '') // Remove file extension
}

// Main function to execute the script
function main() {
  console.log('Scanning for images in assets directory...')
  const imageFiles = scanDirectoryForImages(ASSETS_DIR, '.')

  if (imageFiles.length === 0) {
    console.log('No image files found in the assets directory.')
    return
  }

  console.log(`Found ${imageFiles.length} image files.`)

  // Generate TypeScript content
  let tsContent = `// This file is auto-generated. Do not edit manually.\n\n`

  // Add individual exports for each image
  for (const file of imageFiles) {
    const varName = generateVariableName(file)
    tsContent += `export const ${varName} = '${file}'\n`
  }

  // Add a default export with all images
  tsContent += `\n// Export all images as a single object\nexport default {\n`
  for (const file of imageFiles) {
    const varName = generateVariableName(file)
    tsContent += `  ${varName},\n`
  }
  tsContent += `}\n`

  // Create directories if needed
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, tsContent)
  console.log(`Successfully exported ${imageFiles.length} images to ${OUTPUT_FILE}`)
}

// Execute the script
main()
