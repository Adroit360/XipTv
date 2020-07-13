const urls = {
    local:"http://localhost:5000/api",
    online:"https://xiptv-api.azurewebsites.net/api"
}
export const settings = {
    tvLinks: [
        {
            "category": "GERMAN TV",
            "name": "Sky Sport News HD",
            "url": "https://dwstream6-lh.akamaihd.net/i/dwstream6_live@123962/index_1_av-p.m3u8",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Deutsche_Welle_symbol_2012.svg/1200px-Deutsche_Welle_symbol_2012.svg.png"
        },
        {
            "category": "USA;MYTVTOGO",
            "name": "Blush TV",
            "url": "https://nimble.dashstreams.net/onestudio/blushtv/playlist.m3u8",
            "logo": "https://i.imgur.com/RgYEjYE.png"
        },
        {
            "category": "USA;MYTVTOGO",
            "name": "Cartoons 4U",
            "url": "https://edge1.dashmedia.tv/onestudio/cartoons_4u/playlist.m3u8",
            "logo": "https://i.imgur.com/AjnHVZw.png"
        },
        {
            "category": "AUSTRALIEN",
            "name": "Australian News Channel",
            "url": "https://austchannel-live.akamaized.net/hls/live/2002729/austchannel-news/master.m3u8",
            "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Australian_News_Channel_logo.png/330px-Australian_News_Channel_logo.png"
        },
        {
            "category": "USA",
            "name": "Filmrise Family",
            "url": "https://dai2.xumo.com/amagi_hls_data_xumo1212A-filmrisefamily/CDN/648x432_5000000/index.m3u8",
            "logo": "https://images-na.ssl-images-amazon.com/images/I/81VZaxj6a1L._SY355_.png"
        },
        {
            "category": "RAI 5",
            "name": "RAI 5",
            "url": "https://b2everyrai-lh.akamaihd.net/i/rai5_1@182695/master.m3u8",
            "logo": ""
        },
        {
            "category": "ITALY",
            "name": "RAI Movie",
            "url": "https://b2everyrai-lh.akamaihd.net/i/raimovie_1@67348/master.m3u8",
            "logo": ""
        },
        {
            "category": "USA;MYTVTOGO",
            "name": "Cartoons 4U",
            "url": "https://edge1.dashmedia.tv/onestudio/cartoons_4u/playlist.m3u8",
            "logo": "https://i.imgur.com/AjnHVZw.png"
        },
        {
            "category": "UK",
            "name": "Fashion TV",
            "url": "http://entertainment.ashttp9.visionip.tv/live/visiontvuk-entertainment-edgytv-hsslive-25f-16x9-SD/chunklist.m3u8",
            "logo": "http://entertainment.ashttp9.visionip.tv/live/visiontvuk-entertainment-edgytv-hsslive-25f-16x9-SD/chunklist.m3u8"
        },
        {
            "category": "USA",
            "name": "The Outdoor Cooking Channel",
            "url": "http://edge1.tikilive.com:1935/unrestricted_tikilive/25947/amlst:NWKlw6jwyXpz/chunklist_w981409619_b1105254.m3u8",
            "logo": "http://www.outdoorcookingchannel.com/wp-content/uploads/2014/06/150-logo.png"
        },
        {
            "category": "UK",
            "name": "Fashion TV",
            "url": "http://entertainment.ashttp9.visionip.tv/live/visiontvuk-entertainment-edgytv-hsslive-25f-16x9-SD/chunklist.m3u8",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Fashion_TV_logo.svg/180px-Fashion_TV_logo.svg.png"
        },
        {
            "category": "ITALY",
            "name": "Canale 2",
            "url": "https://59d7d6f47d7fc.streamlock.net/canale2/canale2/playlist.m3u8",
            "logo": ""
        },
        {
            "category": "UKRAINE",
            "name": "GTV",
            "url": "http://cdn1.live-tv.od.ua:8081/a1od/gtvod-abr/a1od/gtvod-720p/playlist.m3u8",
            "logo": "https://i.imgur.com/Rc6UGkb.jpg"
        }],
    baseUri:urls.online,
    githubUrl:`https://iptv-org.github.io/iptv`
    
}
