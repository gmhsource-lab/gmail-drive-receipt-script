/**
 * GMAIL TO DRIVE RECEIPT AUTOMATOR
 * * Instructions:
 * 1. Create a Gmail label named "Receipts to Save".
 * 2. Create a folder in Google Drive and copy its ID below.
 * 3. Set a Time-Driven Trigger to run this function automatically.
 */

const FOLDER_ID = 'YOUR_FOLDER_ID_HERE'; // <--- PASTE YOUR FOLDER ID HERE
const GMAIL_LABEL = 'Receipts to Save';

function saveReceiptsWithLog() {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const threads = GmailApp.search('label:"' + GMAIL_LABEL + '"');

    if (threads.length === 0) {
      console.log("No emails found with label: " + GMAIL_LABEL);
      return;
    }

    // --- 1. SPREADSHEET LOGGING SETUP ---
    let logSheet;
    const logFileName = "Receipt Log";
    const files = folder.getFilesByName(logFileName);

    if (files.hasNext()) {
      logSheet = SpreadsheetApp.open(files.next()).getSheets()[0];
    } else {
      // Create new log if it doesn't exist and move it to the correct folder
      const ss = SpreadsheetApp.create(logFileName);
      const ssFile = DriveApp.getFileById(ss.getId());
      folder.addFile(ssFile);
      DriveApp.getRootFolder().removeFile(ssFile); 
      logSheet = ss.getSheets()[0];
      logSheet.appendRow(["Date Processed", "Email Date", "Sender", "Subject", "File Link"]);
      logSheet.getRange("A1:E1").setFontWeight("bold").setBackground("#f3f3f3");
      logSheet.setFrozenRows(1);
    }

    // --- 2. PROCESS EMAILS ---
    threads.forEach(thread => {
      const messages = thread.getMessages();
      
      messages.forEach(message => {
        const emailDate = Utilities.formatDate(message.getDate(), Session.getScriptTimeZone(), "yyyy-MM-dd");
        const processedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
        const sender = message.getFrom();
        const subject = message.getSubject();
        
        // A. Save actual attachments (PDFs, Images, etc.)
        const attachments = message.getAttachments();
        attachments.forEach(attachment => {
          const file = folder.createFile(attachment).setName(emailDate + "_" + attachment.getName());
          logSheet.appendRow([processedDate, emailDate, sender, subject, file.getUrl()]);
        });

        // B. Save Email Body as PDF (Captures text-based receipts and share links)
        const pdfBlob = Utilities.newBlob(message.getBody(), 'text/html', subject).getAs('application/pdf');
        const pdfFile = folder.createFile(pdfBlob).setName(emailDate + "_" + subject + "_Email_Record.pdf");
        logSheet.appendRow([processedDate, emailDate, sender, subject, pdfFile.getUrl()]);
        
        console.log("Successfully processed: " + subject);
      });
      
      // --- 3. ARCHIVE ---
      // Move the thread to trash after processing all messages within it
      thread.moveToTrash();
    });

  } catch (e) {
    console.log("Error encountered: " + e.toString());
  }
}
