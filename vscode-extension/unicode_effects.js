function renderUnderlineMacOS(text) {
    const lowline = '\u0332';
    const lowline2 = '\u0332\u0332';
    const lowline3 = '\u0332\u0332';
    const macron = '\u035F';
    const lowMacron = '\u02CD';
    const singleMacron = '\u0331';
    const singleMacron3 = '\u0331\u0331\u0331';
    const zero = '\u200C';  // U+200C ZERO WIDTH NON-JOINER
    const macron3 = '\u035F\u035F\u035F';

    const len = text.split('').length;

    const decide = (char, i) => {
        if (i + 1 >= len) {
            if ('⟨‥⟩'.includes(char) || char == '‥') {
                return char + zero + lowline2;
            }
            return char + lowline2;
        }
        if ('⟨‥⟩'.includes(char) || char == '‥') {
            return char + zero + macron3;
        }
        return char + macron3;
    }

    return zero + macron + text.split('').map(decide).join('');
}

function renderUnderlineWindows(text) {
    const zero = '\u200C';  // U+200C ZERO WIDTH NON-JOINER

    const lowline1 = '\u0332';
    const macron1 = '\u035F';
    const lowline2 = '\u0332\u0332';
    const macron2 = '\u035F\u035F';
    const lowline3 = '\u0332\u0332\u0332';
    const macron3 = '\u035F\u035F\u035F';
    const lowline4 = '\u0332\u0332\u0332\u0332';
    const macron4 = '\u035F\u035F\u035F\u035F';
    const macron5 = '\u035F\u035F\u035F\u035F\u035F';

    const arr = text.split('')

    const decide = (char, i) => {
        if (i + 1 >= arr.length) {
            if (char.match(/[a-z]/i) && char != 'g' && char != 'j') {
                return char + lowline1;
            }
            return char;
        }
        if ('₀₁₂₃₄₅₆₇₈₉'.includes(char)) {
            return char;
        }
        if ('₀₁₂₃₄₅₆₇₈₉'.includes(arr[i + 1])) {
            if ('jg'.includes(char)) {
                return char;
            }
            if (char.match(/[a-z]/i)) {
                return char + zero + lowline1;
            } else {
                return char;
            }
        }
        if (char == '‥') {
            return zero + macron5 + char + macron1;
        }
        if (char.match(/[A-Zwm]/) || char == '‥') {
            return char + zero + lowline1 + macron5;
        }
        return char + zero + macron3;
    }

    return zero + lowline1 + text.split('').map(decide).join('');
    return zero + macron3 + text.split('').map((char, i) => i + 1 < len ? char + zero + macron3 : char).join('');
}

function renderUnderlineLinux(text) {
    const zero = '\u200C';  // U+200C ZERO WIDTH NON-JOINER
    const macron3 = '\u035F\u035F\u035F';
    const len = text.split('').length;
    return zero + macron3 + text.split('').map((char, i) => i + 1 < len ? char + zero + macron3 : char).join('');
}

function renderUnderlineLinuxAlternative(text) {
    // We keep it as a backup, because it works quite well and doesn't rely
    // on inserting zero-width characters. Although, version that inserts
    // "U+200C ZERO WIDTH NON-JOINER" is visibly better.
    const lowline1 = '\u0332';
    const macron1 = '\u035F';
    const lowline2 = '\u0332\u0332';
    const macron2 = '\u035F\u035F';
    const lowline3 = '\u0332\u0332\u0332';
    const macron3 = '\u035F\u035F\u035F';
    const lowline4 = '\u0332\u0332\u0332\u0332';
    const macron4 = '\u035F\u035F\u035F\u035F';

    const transform = char => {
        if ('₀₁₂₃₄₅₆₇₈₉'.includes(char)) {
            return char;
        }
        if (char == '‥') {
            return char + macron1
        }
        if ('jgqy⟨‥⟩'.includes(char)) {
            return char
        }
        return char + lowline3
    };

    const as = [''].concat(text.split(''));
    const bs = text.split('').concat(['']);

    const decide = (a, b) => {
        if (a == '') {
            if (b == '⟨') return '';
            if ('0123456789'.includes(b)) return lowline1;
        }
        if (b == '') {
            if ('₀₁₂₃₄₅₆₇₈₉'.includes(a)) return '';
            if ('jgqQpy⟨‥⟩'.includes(a)) return '';
        }

        if ('jgqQpy⟨‥⟩'.includes(a) && 'jgqQpy⟨‥⟩'.includes(b)) {
            return '';
        }
        if ('jgqQpy⟨‥⟩'.includes(b)) {
            return lowline1 + macron3;
        }
        if ('jgqQpy⟨‥⟩'.includes(a)) {
            return '';
        }

        if (a == '⟨') return macron1;
        if ('₀₁₂₃₄₅₆₇₈₉'.includes(a)) return '';

        if (a == '') return '';
        if (b == '') return lowline1;

        return lowline1 + macron1;
    };

    const separators = as.map((a, i) => decide(a, bs[i]));
    const chunks = as.map((a, i) => a + separators[i]);
    return chunks.join('');
}

const { platform } = require('node:process');

function renderUnderline(text) {
    const renderers = {
        'darwin': renderUnderlineMacOS,
        'win32': renderUnderlineWindows,
        'linux': renderUnderlineLinux,
    };
    return renderers[platform](text);
}

function renderItalic(text) {
    const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const italicLowercase = ['𝘢', '𝘣', '𝘤', '𝘥', '𝘦', '𝘧', '𝘨', '𝘩', '𝘪', '𝘫', '𝘬', '𝘭', '𝘮', '𝘯', '𝘰', '𝘱', '𝘲', '𝘳', '𝘴', '𝘵', '𝘶', '𝘷', '𝘸', '𝘹', '𝘺', '𝘻'];
    const italicUppercase = ['𝘈', '𝘉', '𝘊', '𝘋', '𝘌', '𝘍', '𝘎', '𝘏', '𝘐', '𝘑', '𝘒', '𝘓', '𝘔', '𝘕', '𝘖', '𝘗', '𝘘', '𝘙', '𝘚', '𝘛', '𝘜', '𝘝', '𝘞', '𝘟', '𝘠', '𝘡'];

    return text.split('').map(char => {
        let index = lowercase.indexOf(char);
        if (index !== -1) return italicLowercase[index];

        index = uppercase.indexOf(char);
        if (index !== -1) return italicUppercase[index];

        return char;
    }).join('');
}

module.exports = { renderUnderline, renderItalic }
