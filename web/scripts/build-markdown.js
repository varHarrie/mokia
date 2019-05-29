const fs = require('fs')
const path = require('path')
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')

loadLanguages(['typescript'])

const parse = require('./markdown-parser')

const source = fs.readFileSync(path.resolve(__dirname, '../src/docs.md'), 'utf8')
const json = parse(source)

const sections = json.children.map((header) => ({
  title: header.content,
  examples: header.children.map((item) => {
    const s = item.children
    const c = s.pop()

    return {
      title: item.content,
      signatures: Prism.highlight(s.map((t) => t.content).join('\n'), Prism.languages.typescript, 'typescript'),
      code: c ? Prism.highlight(c.children.map((t) => t.content).join('\n'), Prism.languages.typescript, 'typescript') : ''
    }
  })
}))

const result = `module.exports = ${JSON.stringify(sections)}`

fs.writeFileSync(path.resolve(__dirname, '../src/docs.js'), result, 'utf8')
