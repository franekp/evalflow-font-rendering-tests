const { platform } = require('node:process');

const codeLensesByPlatform = {
    linux: [
        'Start Evalflow (ctrl+alt+enter)',

        'Context: ⦓⦔ Symbolic exec root | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Context: ⦓⦔🖋 Custom exec root | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Context: ⦖⦕ AI-generated exec root | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Context: ⦖⦕🖋 Edited AI-generated exec root | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',

        'Exec root: ⦓⦔ Symbolic | Context: ⮯ called from file.py:35 | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Exec root: ⦓⦔🖋 Custom | Context: ⮯ called from file.py:35 | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Exec root: ⦖⦕ AI-generated | Context: ⮯ called from file.py:35 | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Exec root: ⦖⦕🖋 Edited AI-generated | Context: ⮯ called from file.py:35 | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
    ],
    darwin: [
        'Start Evalflow (cmd+opt+enter)',

        'Context: ❨•❩ Symbolic exec root | ⇅ Change ctx (cmd+opt+c) | ⸨̶●̶⸩̶ Inspect (cmd+opt+i) | ⛝ (cmd+esc)',
        'Context: ✎ ❨•❩ Custom exec root | ⇅ Change ctx (cmd+opt+c) | ⸨̶●̶⸩̶ Inspect (cmd+opt+i) | ⛝ (cmd+esc)',
        'Context: ❩✧❨ AI-generated exec root | ⇅ Change ctx (cmd+opt+c) | ⸨̶●̶⸩̶ Inspect (cmd+opt+i) | ⛝ (cmd+esc)',
        'Context: ✎ ❩✧❨ Edited AI-generated exec root | ⇅ Change ctx (cmd+opt+c) | ⸨̶●̶⸩̶ Inspect (cmd+opt+i) | ⛝ (cmd+esc)',

        'Exec root: ❨•❩ Symbolic | Context: ↘ called from file.py:35 | ⇅ Change ctx (cmd+opt+c) | ⸨̶●̶⸩̶ Inspect (cmd+opt+i) | ⛝ (cmd+esc)',
        'Exec root: ✎ ❨•❩ Custom | Context: ↘ called from file.py:35 | ⇅ Change ctx (cmd+opt+c) | ⸨̶●̶⸩̶ Inspect (cmd+opt+i) | ⛝ (cmd+esc)',
        'Exec root: ❩✧❨ AI-generated | Context: ↘ called from file.py:35 | ⇅ Change ctx (cmd+opt+c) | ⸨̶●̶⸩̶ Inspect (cmd+opt+i) | ⛝ (cmd+esc)',
        'Exec root: ✎ ❩✧❨ Edited AI-generated | Context: ↘ called from file.py:35 | ⇅ Change ctx (cmd+opt+c) | ⸨̶●̶⸩̶ Inspect (cmd+opt+i) | ⛝ (cmd+esc)',
    ],
    win32: [
        'Start Evalflow (ctrl+alt+enter)',

        'Context: ⦓⦔ Symbolic exec root | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Context: ⦓⦔🖋 Custom exec root | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Context: ⦖⦕ AI-generated exec root | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Context: ⦖⦕🖋 Edited AI-generated exec root | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',

        'Exec root: ⦓⦔ Symbolic | Context: ⮯ called from file.py:35 | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Exec root: ⦓⦔🖋 Custom | Context: ⮯ called from file.py:35 | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Exec root: ⦖⦕ AI-generated | Context: ⮯ called from file.py:35 | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
        'Exec root: ⦖⦕🖋 Edited AI-generated | Context: ⮯ called from file.py:35 | 🗘 Change ctx (ctrl+alt+c) | ⦕⦖ Inspect (ctrl+alt+i) | ⛝ (ctrl+esc)',
    ],
};
const spaceBeforeByPlatform = {linux: '\u2800', darwin: '\u2060\u3000', win32: '\u2800'};
const spaceAfterByPlatform = {linux: '\u2800', darwin: '\u3000\u2060', win32: '\u2800'};

const codeLenses = codeLensesByPlatform[platform];
const spaceBefore = spaceBeforeByPlatform[platform];
const spaceAfter = spaceAfterByPlatform[platform];

module.exports = {codeLenses, spaceBefore, spaceAfter};
