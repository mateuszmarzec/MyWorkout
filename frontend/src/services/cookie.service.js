
import cookie from 'js-cookie';
import Cookies from 'cookies'

export const setCookie = (key, value, req, res) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/'
    });
  }
  else {
    const cookies = new Cookies(req, res)
    console.log(cookies.get(key))
    cookies.set(key, value, {httpOnly: false, overwrite: true})
    console.log(cookies.get(key))
  }
};

export const removeCookie = (key, req, res) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
  else {
    const cookies = new Cookies(req, res)
    cookies.set(key)
  }
};

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const cookies = new Cookies(req, req)
  return cookies.get(key)
};
