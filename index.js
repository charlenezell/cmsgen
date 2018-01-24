// import fetch from "isomorphic-fetch";
import fetch from "node-fetch";
const { URL } = require("url");

// let token = "JSESSIONID=0A2E19D57D355FA73D096FB70C424743";
let token = "";
let cmsRoot = "http://e0d41ab0.ngrok.io/";
// let cmsRoot = 'http://cmsservice.100bt.com/';

import setCookie from "set-cookie-parser";
import { URLSearchParams } from "url";

async function login(userName, password) {
  let url = `${cmsRoot}sysmanager/login.html`;
  return await fetch(url, {
    method: "POST", // or 'PUT'
    body: {
      userName,
      password
    },
    headers: {
      "Referer":"http://e0d41ab0.ngrok.io/sysmanager/login.html"
    }
  });
}

async function queryCategoryById(categoryId) {
  let url = new URL(`${cmsRoot}queryCategoryById.action`);
  url.searchParams.append("categoryId", categoryId);
  return await fetch(url.toString(), {
    method: "GET",
    headers: {
      Cookie: token
    }
  }).then(v => v.json());
}

export default async function main() {
  //   let c = await login("dev", "222222");

  //   console.log(c);
  //   console.log(setCookie(c.headers));
  //   console.log(setCookie(c.headers.get("set-cookie")));
  // return false;
  if (!token) {
    try {
      let c = await login("dev", "222222");
      let w = setCookie(c.headers.get("set-cookie"))[0];
      console.log(c.headers.get("set-cookie"));
      console.log(w);
      token = [w.name, w.value].join("=");
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  }

  try {
    let c = await queryCategoryById(20870);
    console.log(c);
  } catch (e) {
    console.log(e);
  }
}
