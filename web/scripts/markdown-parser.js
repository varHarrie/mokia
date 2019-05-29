const StringStream = require('./string-stream')

function handleHeader(stream, stack, indent) {
  const match = stream.match(/^(#+)\s*(.*)/, true)

  const level = match[1].length
  const content = match[2].trim()

  while (stack.length > 1 && (stack[0].level >= level || stack[0].type !== 'HEADER')) {
    stack.shift()
  }

  const node = {
    type: 'HEADER',
    level,
    indent,
    content,
    children: []
  }

  stack[0].children.push(node)
  stack.unshift(node)
}

function handleList(stream, stack, indent) {
  const match = stream.match(/^-\s*(.*)/, true)

  const level = indent
  const content = match[1].trim()

  const node = {
    type: 'LIST',
    level,
    indent,
    content,
    children: []
  }

  while (stack.length > 1 && stack[0].type === 'LIST' && stack[0].indent >= indent) {
    stack.shift()
  }

  stack[0].children.push(node)
  stack.unshift(node)
}

function handleCodeHeader(stream, stack, indent) {
  const match = stream.match(/^```(.*)/, true)

  const level = indent
  const content = match[1].trim()

  const node = {
    type: 'CODE',
    level,
    indent,
    content,
    children: []
  }

  while (stack.length > 1 && stack[0].indent >= indent) {
    stack.shift()
  }

  stack[0].children.push(node)
  stack.unshift(node)
}

function handleCodeContent(stream, stack, indent) {
  const content = stream.skipToEnd()

  if (content.startsWith('```')) {
    stack.shift()
    return
  }

  stack[0].children.push({
    type: 'TEXT',
    indent,
    content
  })
}

function handleOthers(stream, stack, indent) {
  const level = indent
  const content = stream.skipToEnd()

  if (content) {
    while (stack.length > 1 && stack[0].level >= level) {
      stack.shift()
    }

    stack[0].children.push({
      type: 'TEXT',
      indent,
      content
    })
  }
}

function execute(stream, stack) {
  stream.eatWhile(/\s/)
  const indent = Math.floor(stream.current().length / 2)

  if (stack[0].type === 'CODE') {
    handleCodeContent(stream, stack, indent)
  } else if (stream.match(/```/)) {
    handleCodeHeader(stream, stack, indent)
  } else if (stream.peek() === '#') {
    handleHeader(stream, stack, indent)
  } else if (stream.peek() === '-') {
    handleList(stream, stack, indent)
  } else {
    handleOthers(stream, stack, indent)
  }
}

function parse(source) {
  const root = {
    type: 'ROOT',
    level: 0,
    indent: 0,
    content: '',
    children: []
  }

  const lines = source.split(/\r\n/)
  const stack = [root]

  for (let i = 0; i < lines.length; i++) {
    const stream = new StringStream(lines[i])

    while (!stream.eol()) {
      execute(stream, stack)
      stream.goAhead()
    }
  }

  return root
}

module.exports = parse
