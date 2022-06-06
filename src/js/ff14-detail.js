import "../scss/detail.scss";

/** 疑似名前空間-detail */
let DETAIL_FUNCTION = {
  // 画像タグを調整
  imgConvert: function () {
    // 画像要素のリストを加工(リッチ版)
    DETAIL_FUNCTION.hrefConvert($(".blog__area .img_box"));

    // 画像要素のリストを加工(シンプル版)
    DETAIL_FUNCTION.hrefConvert($(".blog__area--simple .thumb_list .mb10"));
    $(".blog__area--simple .thumb_list").each(function (index, item) {
      $(item).removeClass("thumb_list");
    });
  },

  // hrefを入れ替える関数
  hrefConvert: function (list) {
    $(list).each(function (index, item) {
      // 規定タグを変更
      $(item).addClass("custom_img").removeClass("img_box");

      // 画像リンクを取得
      let href = $(item).find("img").attr("data-origin_src");

      // 規定要素を変更
      $(item)
        .find("img")
        .removeAttr("width")
        .removeAttr("height")
        .removeAttr("style")
        .attr("src", href)
        .attr("loading", "lazy");
    });
  },
};

export default DETAIL_FUNCTION;
