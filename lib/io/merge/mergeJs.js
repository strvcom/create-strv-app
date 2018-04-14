'use strict'

const fs = require('fs-extra')

const readSplitFile = file => {
  return fs.readFile(file, 'utf8').then(
    content =>
      content.split('\n').reduce(
        (acc, line) => {
          if (line.startsWith('import ')) {
            return {
              imports: [...acc.imports, line],
              content: acc.content,
            }
          }

          if (line.trim().length === 0) {
            if (content.length === 0) {
              return {
                imports: [...acc.imports, line],
                content: acc.content,
              }
            }

            return {
              imports: acc.imports,
              content: [...acc.content, line],
            }
          }

          return {
            imports: acc.imports,
            content: [...acc.content, line],
          }
        },
        { imports: [], content: [] }
      ),
    err => {
      if (err.code === 'ENOENT') {
        return { imports: '', content: '' }
      }
      return err
    }
  )
}

const mergeJs = async (source, destination) => {
  const sourceContent = await fs.readFile(source)
  const { imports, content } = await readSplitFile(destination)

  const output = `${imports.join('\n')}\n${sourceContent}\n${content.join(
    '\n'
  )}`

  await fs.writeFile(destination, output, 'utf8')
}

module.exports = mergeJs
