// 一覧ページの場合、JSを実行
$(document).ready(function() {
  var url = location.href;
  if (url.indexOf("lodestone/blog") != -1) {
    custom_titleLabel();
    custom_pickups();
  }
});

// tmp
function custom_titleLabel() {
  $(".ldst__contents").wrap(function(index) {
    return '<div id="list-bg" />';
  });
}

// 注目の日記部分の改変
function custom_pickups() {
  // ピックアップされた日記の情報を取得
  var array = [];
  $(".entry__pickup .entry__blog_block").each(function(index, item) {
    if (index == 20) return false;

    var entry = {
      date: $(item)
        .find("time")
        .text(),
      comment: $(item)
        .find(".entry__blog_block__header__comment span")
        .text(),
      like: $(item)
        .find(".entry__blog_block__header__like span")
        .text(),
      href: $(item)
        .find(".entry__blog_block__box a")
        .attr("href"),
      title: $(item)
        .find(".entry__blog_block__box a")
        .text(),
      author: $(item)
        .find(".entry__blog_block__search__chara__name")
        .text(),
      world: $(item)
        .find(".entry__blog_block__search__chara__world")
        .text()
    };
    array.push(entry);
  });
}
