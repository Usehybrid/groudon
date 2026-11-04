// Builds dist/ from src/ with Lightning CSS: bundles the @imports, minifies, and writes a typed
// list of every zap-* class so consumers get autocomplete and can lint for names that don't exist.
import {mkdirSync, rmSync, writeFileSync} from 'node:fs'
import {bundle} from 'lightningcss'

const targets = {
  // baseline 2023: everything here is plain custom properties + calc, nothing to lower
  chrome: 111 << 16,
  firefox: 128 << 16,
  safari: (16 << 16) | (4 << 8),
}

rmSync('dist', {recursive: true, force: true})
mkdirSync('dist')

const entries = {
  'groudon.css': 'src/index.css',
  'tokens.css': 'src/tokens.css',
  'utilities.css': 'src/utilities.css',
}

const classes = new Set()
for (const [out, filename] of Object.entries(entries)) {
  const {code} = bundle({
    filename,
    minify: true,
    targets,
    visitor: {
      Selector(selector) {
        for (const c of selector) if (c.type === 'class' && c.name.startsWith('zap-')) classes.add(c.name)
      },
    },
  })
  writeFileSync(`dist/${out}`, code)
  console.log(`dist/${out}  ${code.length} B`)
}

if (classes.size === 0) throw new Error('no zap-* classes found — utilities.css did not build')

const sorted = [...classes].sort()
writeFileSync(
  'dist/classes.js',
  `export const zapTextClasses = Object.freeze(${JSON.stringify(sorted, null, 2)})\n`,
)
writeFileSync(
  'dist/classes.d.ts',
  `export type ZapTextClass =\n${sorted.map(c => `  | '${c}'`).join('\n')}\n\n` +
    'export declare const zapTextClasses: readonly ZapTextClass[]\n',
)
console.log(`dist/classes.js  ${sorted.length} classes`)
