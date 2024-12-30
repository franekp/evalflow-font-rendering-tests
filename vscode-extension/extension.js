// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


function initHover(context) {
    vscode.languages.registerHoverProvider('python', {
        provideHover(document, position, token) {
            let md = new vscode.MarkdownString(`
<span style="color:#90dcfe;">shop.get().inventory</span> &nbsp; = &nbsp; <a href="#"><span style="color:#e2bd6d;">I͟͟͟n͟͟͟v͟͟͟e͟͟͟n͟͟͟t͟͟͟o͟͟͟r͟͟͟y͟͟͟₃</span></a> &nbsp;&nbsp; <span style="color:#585858;">assigned at </span> <a href="#"><span style="color:#585858;"> i͟͟͟n͟͟͟v͟͟͟e͟͟͟n͟͟͟t͟͟͟o͟͟͟r͟͟͟y͟͟͟.͟͟͟p͟͟͟y͟͟͟:͟͟͟3͟͟͟8͟͟͟ ͟ </span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#dcdcaa;">＿class＿:</span> &nbsp;&nbsp; <a href="#"><span style="color:#4bbea7;">⟨c͟͟͟l͟͟͟a͟͟͟s͟͟͟s͟͟͟ 'I͟͟͟n͟͟͟v͟͟͟e͟͟͟n͟͟͟t͟͟͟o͟͟͟r͟͟͟y͟͟͟'⟩</span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#dcdcaa;">products:</span> &nbsp;&nbsp; <a href="#"><span style="color:#4bbea7;"> ͟{.͟.͟}₀</span></a> &nbsp;&nbsp; <span style="color:#585858;">assigned at </span> <a href="#"><span style="color:#585858;"> i͟͟͟n͟͟͟v͟͟͟e͟͟͟n͟͟͟t͟͟͟o͟͟͟r͟͟͟y͟͟͟.͟͟͟p͟͟͟y͟͟͟:͟͟͟3͟͟͟8͟͟͟ ͟ </span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ce9178;">"egg"</span>: &nbsp;&nbsp; <a href="#"><span style="color:#e2bd6d;">P͟͟͟r͟͟͟o͟͟͟d͟͟͟u͟͟͟c͟͟͟t͟͟͟₀</span></a> &nbsp;&nbsp; <span style="color:#585858;">assigned at </span> <a href="#"><span style="color:#585858;"> i͟͟͟n͟͟͟v͟͟͟e͟͟͟n͟͟͟t͟͟͟o͟͟͟r͟͟͟y͟͟͟.͟͟͟p͟͟͟y͟͟͟:͟͟͟3͟͟͟8͟͟͟ ͟ </span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ce9178;">"ham"</span>: &nbsp;&nbsp; <a href="#"><span style="color:#e2bd6d;">P͟͟͟r͟͟͟o͟͟͟d͟͟͟u͟͟͟c͟͟͟t͟͟͟₁</span></a> &nbsp;&nbsp; <span style="color:#585858;">assigned at </span> <a href="#"><span style="color:#585858;"> i͟͟͟n͟͟͟v͟͟͟e͟͟͟n͟͟͟t͟͟͟o͟͟͟r͟͟͟y͟͟͟.͟͟͟p͟͟͟y͟͟͟:͟͟͟3͟͟͟8͟͟͟ ͟ </span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ce9178;">"milk"</span>: &nbsp;&nbsp; <a href="#"><span style="color:#e2bd6d;">P͟͟͟r͟͟͟o͟͟͟d͟͟͟u͟͟͟c͟͟͟t͟͟͟₂</span></a> &nbsp;&nbsp; <span style="color:#585858;">assigned at </span> <a href="#"><span style="color:#585858;"> i͟͟͟n͟͟͟v͟͟͟e͟͟͟n͟͟͟t͟͟͟o͟͟͟r͟͟͟y͟͟͟.͟͟͟p͟͟͟y͟͟͟:͟͟͟3͟͟͟8͟͟͟ ͟ </span></a><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#dcdcaa;">metadata:</span> &nbsp;&nbsp; <a href="#"><span style="color:#4f9ed6;">⟨𝘳𝘦𝘲𝘶𝘦𝘴𝘵𝘴.𝘨𝘦𝘵(‥)‥['𝘮𝘦𝘵𝘢𝘥𝘢𝘵𝘢']: 𝘢𝘯𝘺⟩</span></a> &nbsp;&nbsp; <span style="color:#585858;">assigned at </span> <a href="#"><span style="color:#585858;"> i͟͟͟n͟͟͟v͟͟͟e͟͟͟n͟͟͟t͟͟͟o͟͟͟r͟͟͟y͟͟͟.͟͟͟p͟͟͟y͟͟͟:͟͟͟3͟͟͟8͟͟͟ ͟ </span></a><br />
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
