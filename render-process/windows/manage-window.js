var BrowserWindow = require('electron').remote.BrowserWindow;
var path = require('path');

var manageWindowBtn = document.getElementById('manage-window');

manageWindowBtn.addEventListener('click', function (event) {
  var modalPath = 'file://' + path.join(process.cwd(), 'sections/windows/manage-modal.html');
  var win = new BrowserWindow({ width: 400, height: 225 });

  win.on('move', function () { win.center(); });
  // TODO alter this window's content?
  win.on('closed', function () { win = null; });
  win.loadURL(modalPath);
  win.show();
});
