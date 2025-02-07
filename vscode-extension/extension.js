// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


function initHover(context) {
    vscode.languages.registerHoverProvider('python', {
        provideHover(document, position, token) {
            let md = new vscode.MarkdownString(`
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
            `);
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
