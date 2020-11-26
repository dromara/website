/* eslint-disable import/prefer-default-export */
export const throttle = (fn, delay) => {
  let timer = null;
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export const getScrollTop = () => {
  let scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
};

export const getWindowHeight = () => {
  　　var windowHeight = 0;
  　　if(document.compatMode == "CSS1Compat"){
  　　　　windowHeight = document.documentElement.clientHeight;
  　　}else{
  　　　　windowHeight = document.body.clientHeight;
  　　}
  　　return windowHeight;
  }

export const getLink = link => {
  if (`${link}`.length > 1 && /^\/[^/]/.test(`${link}`)) {
    return `${window.rootPath}${link}`;
  }
  return link;
};
