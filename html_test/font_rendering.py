#!/usr/bin/env python3

import random
import string
import json

random.seed(5325423)

ch = random.choice

random_word = lambda *args: ''.join([random.choice(string.ascii_lowercase) for _ in range(random.choice(args or (4, 5, 6)))])

random_class_name = lambda: random_word(2, 3, 4).capitalize() + random_word(2, 3, 4).capitalize()
random_file_name = lambda: random_word(2, 3, 4) + random.choice(['_', '-', '/']) + random_word(2, 3, 4) + '.' + random_word(2)

subscripts = '₀₁₂₃₄₅₆₇₈₉'
to_subscript = lambda s: ''.join(subscripts[ord(c) - ord('0')] for c in s)
random_subscript = lambda: to_subscript(str(ch(range(100))))

random_obj_repr = lambda: random_class_name() + random_subscript()
random_builtin_1 = lambda: "⟨" + ch(['builtin function', 'class', 'bound method']) + " '" + random_word(2, 3) + '_' + random_word(2, 3) + "'⟩"
random_builtin_2 = lambda: ch(["{‥}", "(‥)", '[‥]', '⟨‥⟩'] + 3 * [
    '"' + random_string(5,8,12) + '‥"', "'" + random_string(5,8,12) + "‥'", str(ch(range(100)))]) + random_subscript()

random_value_repr = lambda: ch([random_obj_repr] * 5 + [random_builtin_1, random_builtin_2] + [random_file_name] * 3)()

random_char = lambda: ch([ch(string.ascii_letters), ch(string.digits), ch(string.punctuation)])
random_string = lambda *args: ''.join([random_char() for _ in range(random.choice(args or (4, 5, 6)))])

RAW_BRACKETS = [
    '〈', '〉', '⁅', '⁆', '⎡', '⎤', '⎣', '⎦', '⎨', '⎬', '⎧', '⎫', '⎩', '⎭', '❨', '❩', '❪', '❫', '❬', '❭', '❮', '❯', '❰', '❱',
    '❲', '❳', '❴', '❵', '⟅', '⟆', '⟦', '⟧', '⟨', '⟩', '⟪', '⟫', '⟬', '⟭', '⟮', '⟯', '⦃', '⦄', '⦅', '⦆', '⦇', '⦈', '⦉', '⦊', '⦋', '⦌',
    '⦍', '⦎', '⦏', '⦐', '⦑', '⦒', '⦓', '⦔', '⦕', '⦖', '⦗', '⦘', '⧘', '⧙', '⧚', '⧛', '⧼', '⧽', '⸦', '⸧', '⸨', '⸩', '〈', '〉', '《', '》',
    '【', '】', '〔', '〕', '〖', '〗', '〘', '〙', '〚', '〛', '﹙', '﹚', '﹛', '﹜', '﹝', '﹞', '（', '）', '［', '］', '｛', '｝', '｟', '｠', '｢', '｣',
]
ICONS = '⸦⸧ ⟅⟆ ⦓⦔ ⦕⦖'
BRACKETS = [RAW_BRACKETS[2*i] + '‥' + RAW_BRACKETS[2*i+1] for i in range(int(len(RAW_BRACKETS) / 2))]

use_random_bracket = lambda inner: (lambda i: RAW_BRACKETS[2*i] + inner + RAW_BRACKETS[2*i+1])(ch(range(int(len(RAW_BRACKETS) / 2))))
random_bracket = lambda: ch([''] * 5 + ['$', '%', '#', '@']) + use_random_bracket(
        ch([random_class_name, random_word, random_file_name, random_value_repr, random_string])()
    ) + ch([''] * 2 + [random_subscript()])

data = {}
data['values'] = [random_value_repr() for _ in range(600)]
data['strings'] = [random_string(5, 6, 7, 8, 9, 10, 11, 12) for _ in range(600)]
data['brackets'] = [random_bracket() for _ in range(200)]

data_str = 'window.renderingTests = ' + json.dumps(data) + ';'
with open('font_rendering.js', 'w') as f:
    f.write(data_str)
