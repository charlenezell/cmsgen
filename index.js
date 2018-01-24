import fetch from 'isomorphic-fetch';

let cmsRoot = 'http://cmsservice.100bt.com/';

import setCookie from "set-cookie-parser";

async function login(userName, password) {

    let url = `${cmsRoot}sysmanager/login.html`
    return await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            userName,
            password
        }),
        credentials: 'same-origin'
        // headers: new Headers({
        //   'Content-Type': 'application/json'
        // })
    });
}


async function queryCategoryById(categoryId) {
    let url = `${cmsRoot}queryCategoryById.action`
    return await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            categoryId
        })
        // headers: new Headers({
        //   'Content-Type': 'application/json'
        // })
    }).then(res => res.json())
}


export default async function main() {
    let c=await login("dev", '222222');
    console.log(c);
    // console.log(setCookie(c.headers));
    // console.log(c.headers.get("set-cookie"));
    // try {
    //     try {
    //         await login("dev", '222222');
    //     } catch (e) { }
    //     let c = await queryCategoryById(20870);
    //     console.log(c);
    // } catch (e) {
    //     console.log(e);
    // }
}