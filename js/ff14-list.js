// 一覧ページの場合、JSを実行
$(document).ready(function() {
  var url = location.href;
  if (url.indexOf("lodestone/blog") != -1) {
    custom_titleLabel();
    custom_recent();
  }
});

// タイトルバーの修正
function custom_titleLabel() {
  // リスト全体へのラッパー追加
  $(".ldst__contents").wrap(function(index) {
    return '<div id="list-bg" />';
  });

  // h2内容の変更
  $(".heading--pickup h2").text("Popular");
  $("h2.heading--lg").text("Recent");
}

// 最新の日記部分の改変
function custom_recent() {
  var array = [];

  // タグや属性を整理しつつ記事情報を収集
  $(".entry__block__wrapper")
    .attr("style", "height: auto!important")
    .children(".entry__blog_block")
    .removeAttr("style")
    .each(function(index, item) {
      var entry = {
        title: $(item)
          .find(".entry__blog_block__title")
          .text(),
        img: $(item)
          .find(".entry__blog_block__img img")
          .attr("src"),
        date: $(item)
          .find(".datetime_dynamic_ymdhm")
          .text(),
        comment: $(item)
          .find(".entry__blog_block__header__comment")
          .html(),
        like: $(item)
          .find(".entry__blog_block__header__like")
          .html(),
        world: $(item)
          .find(".entry__blog_block__search__chara__world")
          .text(),
        tags: $(item)
          .find(".entry__blog_block__tag")
          .text(),
        url: $(item)
          .find(".entry__blog_block__title")
          .attr("href")
      };
      array.push(entry);
    })
    .each(function(index, item) {
      console.log(item);
      // 個別記事カード内のタグを再構成
      var img = "";
      if (array[index].img !== void 0)
        img = '<img src="' + array[index].img + '" />';

      var html =
        "<figure>" +
        img +
        "<figcaption><h5>" +
        array[index].title +
        '</h5><div class="info"><time>' +
        array[index].date +
        "</time>" +
        array[index].comment +
        array[index].like +
        '<p class="world">' +
        array[index].world +
        "</div></figcaption></figure>";

      item.innerHTML = html;
    });
}
