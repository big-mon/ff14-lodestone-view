import "../scss/detail.scss";

/** 画像タグを調整 */
export const imgConvert = () => {
  // 画像要素のリストを加工(リッチ版)
  hrefConvert($(".blog__area .img_box"));

  // 画像要素のリストを加工(シンプル版)
  hrefConvert($(".blog__area--simple .thumb_list .mb10"));
  $(".blog__area--simple .thumb_list").each(function (index, item) {
    $(item).removeClass("thumb_list");
  });
};

/** hrefを入れ替える関数 */
const hrefConvert = (list) => {
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
};
