import "./index.less";
let div: any = null;

export const show = (text = "", mtime?: number, fn?: any) => {
  const _time = mtime ? mtime : 3000;
  if (!div) {
    div = document.createElement("div");
    document.body.appendChild(div);
    setTimeout(() => {
      document.body.removeChild(div);
      div = null;
      if (fn) {
        fn();
      }
    }, _time);
  }
  div.innerHTML = text;
  div.className = "toast";
};

export const hide = () => {
  if (div) {
    document.body.removeChild(div);
    div = null;
  }
};

export default {
  show,
  hide,
};
