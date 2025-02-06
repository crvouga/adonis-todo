import fs from 'node:fs'
import path from 'node:path'

const sdkGenPath = path.join(process.cwd(), 'shared', 'open_api_client', 'sdk.gen.ts')
const indexPath = path.join(process.cwd(), 'shared', 'open_api_client', 'index.ts')

// Fix sdk.gen.ts
let sdkContent = fs.readFileSync(sdkGenPath, 'utf8')
sdkContent = sdkContent.replace(/\(options\?\.client \?\? client\)/g, 'client')
fs.writeFileSync(sdkGenPath, sdkContent)

// Fix index.ts imports
let indexContent = fs.readFileSync(indexPath, 'utf8')
indexContent = indexContent.replace(/from '\.\/sdk\.gen'/g, "from './sdk.gen.ts'")
indexContent = indexContent.replace(/from '\.\/types\.gen'/g, "from './types.gen.ts'")
fs.writeFileSync(indexPath, indexContent)
