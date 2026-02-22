# gmail-drive-receipt-script
Google AppScript for automatic transfer of receipts in gmail to google drive
📥 Gmail to Drive Receipt Automator
A Google Apps Script that automatically extracts email receipts, converts them to PDFs, saves any attachments, logs the data into a Google Sheet, and cleans up your inbox.

✨ Features
Automatic Filing: Scans for a specific Gmail label (Receipts to Save).

Dual-Capture: Saves both the actual email attachments (PDFs, Images) and a PDF snapshot of the email body (perfect for receipts sent as text or share links).

Smart Logging: Automatically creates and updates a Receipt Log spreadsheet with dates, senders, and direct links to the saved files.

Auto-Cleanup: Moves processed emails to the Trash to keep your inbox clutter-free.

Organized Naming: Prepends files with the date (YYYY-MM-DD) for easy sorting.

🚀 Setup Instructions
1. Gmail Preparation
Create a label in Gmail named Receipts to Save.

Set up a Gmail Filter for your recurring receipts (e.g., from Uber, Amazon, etc.) and have the filter apply the Receipts to Save label automatically.

2. Google Drive Preparation
Create a folder in Google Drive where you want your receipts to live.

Copy the Folder ID from the URL bar (the long string of characters after /folders/).

3. Script Installation
Go to script.google.com.

Click New Project.

Copy the code from Code.gs in this repo and paste it into the editor.

Replace YOUR_FOLDER_ID_HERE at the top of the script with your actual Folder ID.

Click the Save icon and name the project (e.g., "Receipt Automator").

4. Authorize & Test
Click the Run button in the editor.

Google will prompt you for permissions. Click Review Permissions > Advanced > Go to [Project Name] (unsafe) > Allow.

Verify that a test email with the label was moved to your Drive folder and logged in the spreadsheet.

5. Automation (The Trigger)
In the Apps Script sidebar, click the Triggers (alarm clock icon).

Click + Add Trigger.

Set the function to saveReceiptsWithLog.

Set the event source to Time-driven.

Set the type to Day timer and pick a time (e.g., 4am to 5am).

🛠️ Technology Stack
Language: Google Apps Script (JavaScript)

APIs: GmailApp, DriveApp, SpreadsheetApp

📝 License
MIT License - Feel free to use and modify for your own needs.
