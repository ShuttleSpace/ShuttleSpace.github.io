const { cp, copyFile  } = require('fs/promises')
const path = require('path')

const workspace = path.resolve(__dirname)
const themeNextDir = path.join(workspace, '../node_modules/hexo-theme-next')
const themeNextJsDir = path.join(themeNextDir, 'source/js/')

const loveJs = path.join(workspace, 'love.js')
const schemeJss = path.join(workspace, 'schemes')

console.log('[copy] ', workspace)
async function main() {
  await copyFile(loveJs, path.join(themeNextJsDir, 'love.js'))
  await cp(schemeJss, themeNextJsDir, { recursive: true })
}
main()