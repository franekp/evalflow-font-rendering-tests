#!/usr/bin/env python3

from appium import webdriver
from appium.options.common import AppiumOptions
import time

# Set up the desired capabilities for Mac2Driver
caps = {
    "platformName": "mac",
    "appium:automationName": "Mac2",
    "appium:bundleId": "com.microsoft.VSCode",
    "appium:appPath": "/Applications/Visual Studio Code.app"  # Path to VS Code
}

# Connect to the Appium server
driver = webdriver.Remote("http://127.0.0.1:4723", options=AppiumOptions().load_capabilities(caps))

# driver.activate_app("com.microsoft.VSCode")

# Allow some time for the app to launch
time.sleep(5)

# Take a screenshot of the VS Code window
screenshot_path = "./vscode_screenshot.png"
driver.save_screenshot(screenshot_path)
print(f"Screenshot saved at: {screenshot_path}")

# Quit the session
driver.quit()
