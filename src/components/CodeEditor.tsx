"use client";

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

export default function CodeEditor() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.js, 'js')}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 24,
        height: '100%',
        outline: 'none'
      }}
      textareaClassName="outline-none"
    />
  );
}