export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/login/index",
    "pages/me/index",
    "pages/order-detail/index",
    "pages/order-form/index",
    "pages/product-detail/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#353535",
    selectedColor: "#EB4F1E",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/images/tab-bar/home.png",
        selectedIconPath: "assets/images/tab-bar/home-active.png",
      },
      {
        pagePath: "pages/me/index",
        text: "我的",
        iconPath: "assets/images/tab-bar/me.png",
        selectedIconPath: "assets/images/tab-bar/me-active.png",
      },
    ],
  },
});
