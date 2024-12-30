#!/usr/bin/env python3
import os
import time

from appium import webdriver
from appium.options.common import AppiumOptions
from appium.webdriver.webdriver import ExtensionBase


# define an extension class
class OCRCommand(ExtensionBase):
    def method_name(self):
        return 'ocr_command'

    def ocr_command(self, argument):
        return self.execute(argument)['value']

    def add_command(self):
        return ('post', '/session/$sessionId/appium/ocr')


# Set up the desired capabilities for Mac2Driver
caps = {
    "platformName": "mac",
    "appium:automationName": "Mac2",
    "appium:bundleId": "com.microsoft.VSCode",  # this is required, otherwise it won't launch the apps
    "appium:appPath": "/Applications/Visual Studio Code.app",
    "appium:arguments": ["--disable-workspace-trust", f"{os.getcwd()}"]
}

# Connect to the Appium server
driver = webdriver.Remote("http://127.0.0.1:4723", options=AppiumOptions().load_capabilities(caps), extensions=[OCRCommand])

# driver.activate_app("com.microsoft.VSCode")

# Allow some time for the app to launch
time.sleep(5)

XCUIKeyModifierNone       = 0
XCUIKeyModifierCapsLock   = (1 << 0)
XCUIKeyModifierShift      = (1 << 1)
XCUIKeyModifierControl    = (1 << 2)
XCUIKeyModifierOption     = (1 << 3)
XCUIKeyModifierCommand    = (1 << 4)
XCUIKeyModifierFunction   = (1 << 5)
XCUIKeyModifierAlphaShift = XCUIKeyModifierCapsLock
XCUIKeyModifierAlternate  = XCUIKeyModifierOption

def send_keys(keys):
    for key in keys:
        driver.execute_script('macos: keys', {
            'keys': [key],
        })
        time.sleep(0.01)

send_keys([{'key': 'XCUIKeyboardKeyF5', 'modifierFlags': XCUIKeyModifierCommand}])
time.sleep(5)  # wait for the extension host to start, comparable to what launching vscode takes

send_keys([{'key': 'p', 'modifierFlags': XCUIKeyModifierCommand}] + list('example.py') + ['XCUIKeyboardKeyEnter'])
time.sleep(2)

# Take a screenshot of the VS Code window
screenshot_path = "./vscode_screenshot.png"
driver.save_screenshot(screenshot_path)
print(f"Screenshot saved at: {screenshot_path}")

# Quit the session
driver.quit()
