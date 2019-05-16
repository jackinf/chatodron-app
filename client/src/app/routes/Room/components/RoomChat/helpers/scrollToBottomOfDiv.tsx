export default function scrollToBottomOfDiv(div: string) {
  setTimeout(() => {
    const objDiv = document.getElementById(div);
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  });
}