export function alertAutoClose(msg, title, width, height, timeout) {
  var myWindow = window.open(
    "",
    "",
    `width=${width},height=${height},left=${
      window.outerWidth / 2 - width / 2
    },top=0`
  ); //open a new popup at the top height and middle width of the current window
  myWindow.document.write(`<center id="msg">` + msg + `</center>`); //write the message you want to display
  myWindow.document.title = title; //write the title of the alert box
  return new Promise((res, rej) => {
    myWindow.onbeforeunload = () => res()
    setTimeout(() => {
      myWindow.close();
      res()
    }, timeout || 3000); //in 3 secondes (3000 milliseconds)
  });
}
