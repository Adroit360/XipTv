const urls = {
    local:"http://localhost:5000/api",
    online:"https://xiptv-api.azurewebsites.net/api",
    ngrok:"http://1af59ca460d7.ngrok.io/api",
    tellerTest:"https://test.theteller.net/checkout/checkout/",
    terllerLive:"https://prod.theteller.net/checkout/checkout/"
}
export const settings = {
    baseUri:urls.online,
    githubUrl:`https://iptv-org.github.io/iptv`,
    reddeCallbackUrlPrefix:"https://checkout.reddeonline.com?token=",

    tellerCallbackUrlPrefix:urls.tellerTest

}
