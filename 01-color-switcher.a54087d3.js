const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),bodyEl:document.querySelector("body")};let e=null;t.startBtn.addEventListener("click",(()=>{t.startBtn.setAttribute("disabled","true"),t.stopBtn.removeAttribute("disabled"),e=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.bodyEl.style.backgroundColor=e}),1e3)})),t.stopBtn.addEventListener("click",(()=>{t.stopBtn.setAttribute("disabled","true"),t.startBtn.removeAttribute("disabled"),clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.a54087d3.js.map
