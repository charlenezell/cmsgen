import fetch from "node-fetch";
import { URL, URLSearchParams } from "url";
import proxyAgent from 'https-proxy-agent'
import setCookie from "set-cookie-parser";


const isDebug = true;

const debugOption = {
  agent: new proxyAgent("http://127.0.0.1:8123")
}

let cmsRoot = 'http://cmsservice.100bt.com/';

async function login(userName, password) {
  let url = `${cmsRoot}sysmanager/login.html`;
  let param = new URLSearchParams({
    userName,
    password
  })
  let arg = {
    method: "POST", // or 'PUT'
    body: param.toString(),
    headers: {
      Cookie: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  return await fetch(url, isDebug ? { ...debugOption, ...arg } : arg)
    .then(v => {
      return new Promise((res, rej) => {
        v.text().then(html => {
          res({
            html,
            headers: v.headers
          });
        })
      })
    });
}

async function queryCategoryById(categoryId) {
  let url = new URL(`${cmsRoot}queryCategoryById.action`);
  url.searchParams.append("categoryId", categoryId);
  let arg = {
    method: "GET",
    headers: {
      Cookie: token
    }
  }
  // console.log(url);
  return await fetch(url.toString(), isDebug ? { ...debugOption, ...arg } : arg).then(v => v.json());
}


let token = "";

export default async function main() {
  try {
    let c = await login("dev", "222222");
    let w = setCookie(c.headers.get("set-cookie"))[0];
    token = [w.name, w.value].join("=");

    if (c.html.search("请输入用户名和密码")==-1) {
      console.log(`登录成功：${token}`);
      try {
        let c = await queryCategoryById(20870);
        console.log(c);
      } catch (e) {
        console.log("信息获取失败");
      }
    }
  } catch (e) {
    console.log("登录失败!!", e);
  }
}
