// 一覧ページの場合、JSを実行
$(document).ready(function() {
  var url = location.href;
  if (url.indexOf("lodestone/blog") != -1) {
    custom_titleLabel();
    custom_popular();
    custom_recent();
  }
});

// タイトルバーの修正
function custom_titleLabel() {
  // h2内容の変更
  $(".heading--pickup h2").text("Popular");
  $("h2.heading--lg").text("Recent");
}

// 注目の日記部分を更新
function custom_popular() {
  // 記事一覧を収集
  var array = [];
  $(".entry__pickup .entry__blog_block")
    .each(function(index, item) {
      array.push(item);
      if (index >= 19) return false;
    })
    .parents(".entry__pickup")
    .remove();

  // 新規スライダーを作成
  $(".heading--pickup").after(
    '<div id="custom-slider" class="owl-carousel owl-theme"></div>'
  );
  $("#custom-slider").append(array);

  // スライダーを稼働
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4
  });
}

// 最新の日記部分の改変
function custom_recent() {
  // タグや属性を整理しつつ記事情報を収集
  $(".entry__block__wrapper")
    .children(".entry__blog_block")
    .each(function(index, item) {
      // ◆オリジナルのソースから情報を抽出
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
          .text(),
        like: $(item)
          .find(".entry__blog_block__header__like")
          .text(),
        world: $(item)
          .find(".entry__blog_block__search__chara__world")
          .text(),
        tags: $(item)
          .find(".entry__blog_block__tag")
          .text(),
        url: $(item)
          .find(".entry__blog_block__title")
          .attr("href"),
        author: $(item)
          .find(".entry__blog_block__search__chara__name")
          .attr("href")
          .match(/^.+character\/([0-9]+)\//)[1]
      };

      // ◆置換用のHTMLタグを生成
      var tags = {
        img:
          '<img src="' +
          (entry.img !== void 0
            ? entry.img
            : "data:image/svg+xml;charset=utf8,%3C!--%20Generator%3A%20Adobe%20Illustrator%2018.1.1%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200)%20--%3E%3Csvg%20version%3D%221.1%22%20id%3D%22_x32_%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20512%20512%22%20style%3D%22width%3A%20256px%3B%20height%3A%20256px%3B%20opacity%3A%201%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%20.st0%7Bfill%3A%234B4B4B%3B%7D%3C%2Fstyle%3E%3Cg%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M0%2C45.178v421.644h512V45.178H0z%20M471.841%2C426.662H40.159V85.329h431.682V426.662z%22%20style%3D%22fill%3A%20rgba(75%2C%2075%2C%2075%2C%200.5)%3B%22%3E%3C%2Fpath%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M326.128%2C207.728c-4.148-6.289-11.183-10.077-18.72-10.069c-7.544%2C0.007-14.57%2C3.803-18.71%2C10.1%20l-72.226%2C109.914l-39.862-45.178c-4.619-5.238-11.426-8.022-18.397-7.52c-6.971%2C0.486-13.308%2C4.211-17.142%2C10.053L74.17%2C376.96%20h363.659L326.128%2C207.728z%22%20style%3D%22fill%3A%20rgba(75%2C%2075%2C%2075%2C%200.5)%3B%22%3E%3C%2Fpath%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M174.972%2C230.713c25.102%2C0%2C45.453-20.35%2C45.453-45.461c0-25.102-20.35-45.452-45.453-45.452%20c-25.11%2C0-45.46%2C20.35-45.46%2C45.452C129.511%2C210.363%2C149.862%2C230.713%2C174.972%2C230.713z%22%20style%3D%22fill%3A%20rgba(75%2C%2075%2C%2075%2C%200.5)%3B%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E") +
          '" alt="' +
          entry.title +
          '" width="300" height="200" loading="lazy" />',
        world: '<span class="world">' + entry.world + "</span>",
        comment:
          "<span>💬 " +
          (entry.comment !== void 0 ? entry.comment : "0") +
          "</span>",
        like:
          "<span>💗 " +
          (entry.like.length !== 0 ? entry.like : "0") +
          "</span>",
        time: '<span class="time"><time>' + entry.date + "</time></span>",
        title: "<h5>" + entry.title + "</h5>"
      };

      // ◆個別記事カード内のタグを再構成
      var html =
        '<a href="' +
        entry.url +
        '">' +
        '<figure class="eyecatch">' +
        tags.img +
        tags.world +
        "</figure>" +
        tags.title +
        '<div class="info">' +
        tags.time +
        tags.comment +
        tags.like +
        "</div>" +
        "</a>";
      $(item).html(html);
    })
    .attr("style", "height: auto!important")
    .removeAttr("style");
}
