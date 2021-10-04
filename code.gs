
function doPost(e) {

  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  const folderId = "1l93c7deOcqPLSPqM2CHgzWPrprCF2V_i";  // FolderID where the files are stored

  // Creates a blob for uploading the file
  const blob = Utilities.newBlob(JSON.parse(e.postData.contents), e.parameter.mimeType, e.parameter.filename);

  const file = DriveApp.getFolderById(folderId).createFile(blob);

  // Gets the nextrow for insertion
  var nextRow = sheet.getLastRow() + 1

  // Values fetched and appended into a arrray to insert
    var values = [
  [ e.parameter.name, e.parameter.email,e.parameter.phone ,file.getUrl(), e.parameter.severity, e.parameter.platform, e.parameter.report ] 
  ];

  // Gets the range of the next row in the sheets and set the values
   sheet.getRange(nextRow, 1, 1, 7).setValues(values);

  const responseObj = {filename: file.getName(), fileId: file.getId(), fileUrl: file.getUrl(), phone: e.parameter.phone, value: values};
  return ContentService.createTextOutput(JSON.stringify(responseObj)).setMimeType(ContentService.MimeType.JSON);

  }

   catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }

 

}