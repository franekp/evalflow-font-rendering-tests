// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const effects = require('./unicode_effects.js');

const testData = require('./test_data.js');

class EvalflowContextCodeLensProvider {
    provideCodeLenses(document, cancellationToken) {
        let codeLenses = [];
        
        for (let i = 0; i < testData.codelenses.length && 5 * i < document.lineCount; i++) {
            const range = new vscode.Range(5 * i, 0, 5 * i, 0);
            const inputText = testData.codelenses[i] || "";
            const links = inputText.split('|');
            for (const [index, link] of links.entries()) {
                let spaces = '\u0020\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u205F\u202F\u2060\u3000';
                spaces = spaces + spaces + spaces;
                spaces = '\u3000\u2060';
                let spacesBefore = '\u2060\u3000';
                //spaces = spaces + spaces + spaces;
                const lens = new vscode.CodeLens(range, {
                    title: (index != 0 ? spacesBefore : '') + (index != 0 ? '' : '⇅ Change ↘ called from ✎ ❩✧❨ ✎ ❨•❩ ⸨̶●̶⸩̶ ') + link.trim() + spaces,
                    //title: (index != 0 ? '\u2800' : '') + link.trim() + '\u2800',
                    command: "evalflowfontrenderingtests.helloWorld",
                    tooltip: '<<<  ' + link.trim() + '  >>>',
                });
                codeLenses.push(lens);
            }
        }
        return codeLenses;
    }
}

function initCodeLens(context) {
    const selector = { scheme: 'file', language: 'python' };
    let provider = new EvalflowContextCodeLensProvider();
    let providerDisposable = vscode.languages.registerCodeLensProvider(selector, provider);

    context.subscriptions.push(providerDisposable);
}

const objectReprHovercard = `
<table><tr><td>
<span style="color:#90dcfe;">shop.get().inventory</span> &nbsp; = &nbsp; <a href="#"><span style="color:#e2bd6d;">I͟n͟v͟e͟n͟t͟o͟r͟y₃</span></a>
</td><td> &nbsp;&nbsp; <a href="#"><span style="color:#585858;"> i͟n͟v͟e͟n͟t͟o͟r͟y͟.͟p͟y͟:͟3͟8 </span></a></td></tr>
<tr><td>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#dcdcaa;">＿class＿:</span> &nbsp;&nbsp; <a href="#"><span style="color:#4bbea7;">⟨c͟l͟a͟s͟s͟ 'I͟n͟v͟e͟n͟t͟o͟r͟y'⟩</span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#dcdcaa;">products:</span> &nbsp;&nbsp; <a href="#"><span style="color:#4bbea7;"> {͟‥͟}₀</span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ce9178;">"egg"</span>: &nbsp;&nbsp; <a href="#"><span style="color:#e2bd6d;">P͟r͟o͟d͟u͟c͟t₀</span></a>
</td><td>
<br />
&nbsp;&nbsp; <a href="#"><span style="color:#585858;"> i͟n͟v͟e͟n͟t͟o͟r͟y͟.͟p͟y͟:͟3͟8 </span></a><br />
&nbsp;&nbsp; <a href="#"><span style="color:#585858;"> i͟n͟v͟e͟n͟t͟o͟r͟y͟.͟p͟y͟:͟3͟8 </span></a>
</td></tr><tr><td>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ce9178;">"ham"</span>: &nbsp;&nbsp; <a href="#"><span style="color:#e2bd6d;">P͟r͟o͟d͟u͟c͟t₁</span></a>
</td><td>
&nbsp;&nbsp; <a href="#"><span style="color:#585858;"> i͟n͟v͟e͟n͟t͟o͟r͟y͟.͟p͟y͟:͟3͟8 </span></a>
</td></tr><tr><td>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ce9178;">"milk"</span>: &nbsp;&nbsp; <a href="#"><span style="color:#e2bd6d;">P͟r͟o͟d͟u͟c͟t₂</span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#dcdcaa;">metadata:</span> &nbsp;&nbsp; <a href="#"><span style="color:#4f9ed6;">$\{𝘳𝘦𝘲𝘶𝘦𝘴𝘵𝘴.𝘨𝘦𝘵(‥)‥['𝘮𝘦𝘵𝘢𝘥𝘢𝘵𝘢']\}</span></a><br />
</td><td>
&nbsp;&nbsp; <a href="#"><span style="color:#585858;"> i͟n͟v͟e͟n͟t͟o͟r͟y͟.͟p͟y͟:͟3͟8 </span></a><br />
&nbsp;&nbsp; <a href="#"><span style="color:#585858;"> i͟n͟v͟e͟n͟t͟o͟r͟y͟.͟p͟y͟:͟3͟8 </span></a><br />
</td></tr></table>
`;

const hovers = [];

function chunkArray(array, chunkSize) {
    return Array.from(
        { length: Math.ceil(array.length / chunkSize) },
        (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
}

function initHover(context) {
    for (const k of Object.keys(testData)) {
        const escapeForMarkdown = (unsafe) => (
            unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
                .replace(/([\\`*_{}\[\]()#+-.!])/g, '\\$1')
        );
        if (k != 'codelenses') {
            const md = chunkArray(testData[k], 10).map(
                chunk => chunk.map(x =>
                    `&nbsp;&nbsp; <a href="#"><span style="color:#e2bd6d;"> ${ escapeForMarkdown(effects.renderUnderline(x)) } </span></a>`
                ).join('')
            ).join('<br />\n');
            hovers.push(md);
        }
    }
    vscode.languages.registerHoverProvider('python', {
        _count: 0,
        provideHover(document, position, token) {
            const md = new vscode.MarkdownString(hovers[this._count % hovers.length]);
            this._count++;
            md.supportHtml = true;
            md.isTrusted = true;
            return new vscode.Hover(md);
        },
    })
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    initCodeLens(context);
    initHover(context);
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "evalflowfontrenderingtests" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('evalflowfontrenderingtests.helloWorld', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from EvalflowFontRenderingTests!');
    });

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
