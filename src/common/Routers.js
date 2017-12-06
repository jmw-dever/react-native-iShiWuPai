/**
 * Created by ljunb on 2017/6/2.
 */
const router = {
    'Root': require("../../iShiWuPai"),

    'Splash': require('../pages/Splash'),

    'Login': require('../pages/Login'),

    'TabBarView': require('../pages/TabBarView'),

    'Scanner': require('../components/Scanner'),

    'JpushDetail': require('../pages/JpushDetail'),

    'Messages': require("../pages/Message"),

    'MessageDetail': require('../pages/MessageDetail'),

    'JoeWebView': require("../components/JoeWebView"),

    // home
    'Foods': require('../pages/home/Foods'),

    // feed
    'FeedDetail': require('../pages/feed/FeedDetail'),

    // profile
}

export default router