import "../scss/list.scss";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel";

/** タイトルバーの修正 */
export const editTitle = () => {
  // h2内容の変更
  document.querySelector(".heading--pickup h2").textContent = "Popular";
  document.querySelector("h2.heading--lg").textContent = "Recent";
};

/** 注目の日記部分を更新 */
export const editPopular = () => {
  // 記事一覧を収集
  let array = Array.from(
    document.querySelectorAll(".entry__pickup .entry__blog_block")
  ).slice(0, 20);
  console.log(array);
  document.querySelector(".entry__pickup").remove();

  // 新規スライダーを作成
  let slider = document.createElement("div");
  slider.id = "custom-slider";
  slider.className = "owl-carousel owl-theme";

  // 新規スライダーを挿入
  const heading = document.querySelector(".heading--pickup");
  heading.parentNode.insertBefore(slider, heading.nextElementSibling);

  // 記事を挿入
  array.forEach((article) =>
    document.querySelector("#custom-slider").appendChild(article)
  );

  // スライダーを稼働
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4,
  });
};

/** 最新の日記部分の改変 */
export const editRecent = () => {
  // タグや属性を整理しつつ記事情報を収集
  $(".entry__block__wrapper")
    .children(".entry__blog_block")
    .each(function (index, item) {
      // オリジナルのソースから情報を抽出
      const info = extractArticleInformation(item);

      // 置換用のHTMLタグを生成
      const tags = createTags(info);

      // ◆個別記事カード内のタグを再構成
      const html = convertHtml(info, tags);

      $(item).html(html);
    })
    .removeAttr("style");
};

/** HTML要素から情報を抽出 */
const extractArticleInformation = (article) => {
  return {
    title: $(article).find(".entry__blog_block__title").text(),
    img: $(article).find(".entry__blog_block__img img").attr("src"),
    date: $(article).find(".datetime_dynamic_ymdhm").text(),
    comment: $(article).find(".entry__blog_block__header__comment").text(),
    like: $(article).find(".entry__blog_block__header__like").text(),
    world: $(article).find(".entry__blog_block__search__chara__world").text(),
    tags: $(article).find(".entry__blog_block__tag").text(),
    url: $(article).find(".entry__blog_block__title").attr("href"),
    author: $(article)
      .find(".entry__blog_block__search__chara__name")
      .attr("href")
      .match(/^.+character\/([0-9]+)\//)[1],
  };
};

/** 記事カード用のタグを生成 */
const createTags = (info) => {
  return {
    img:
      '<img src="' +
      (info.img !== void 0
        ? info.img
        : "data:image/svg+xml;charset=utf8,%3C!--%20Generator%3A%20Adobe%20Illustrator%2018.1.1%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200)%20--%3E%3Csvg%20version%3D%221.1%22%20id%3D%22_x32_%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20512%20512%22%20style%3D%22width%3A%20256px%3B%20height%3A%20256px%3B%20opacity%3A%201%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%20.st0%7Bfill%3A%234B4B4B%3B%7D%3C%2Fstyle%3E%3Cg%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M0%2C45.178v421.644h512V45.178H0z%20M471.841%2C426.662H40.159V85.329h431.682V426.662z%22%20style%3D%22fill%3A%20rgba(75%2C%2075%2C%2075%2C%200.5)%3B%22%3E%3C%2Fpath%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M326.128%2C207.728c-4.148-6.289-11.183-10.077-18.72-10.069c-7.544%2C0.007-14.57%2C3.803-18.71%2C10.1%20l-72.226%2C109.914l-39.862-45.178c-4.619-5.238-11.426-8.022-18.397-7.52c-6.971%2C0.486-13.308%2C4.211-17.142%2C10.053L74.17%2C376.96%20h363.659L326.128%2C207.728z%22%20style%3D%22fill%3A%20rgba(75%2C%2075%2C%2075%2C%200.5)%3B%22%3E%3C%2Fpath%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M174.972%2C230.713c25.102%2C0%2C45.453-20.35%2C45.453-45.461c0-25.102-20.35-45.452-45.453-45.452%20c-25.11%2C0-45.46%2C20.35-45.46%2C45.452C129.511%2C210.363%2C149.862%2C230.713%2C174.972%2C230.713z%22%20style%3D%22fill%3A%20rgba(75%2C%2075%2C%2075%2C%200.5)%3B%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E") +
      '" alt="' +
      info.title +
      '" width="218" height="110" loading="lazy" />',
    world: '<span class="world">' + info.world + "</span>",
    comment:
      "<span>💬 " + (info.comment !== void 0 ? info.comment : "0") + "</span>",
    like: "<span>❤️ " + (info.like.length !== 0 ? info.like : "0") + "</span>",
    time: '<span class="time"><time>' + info.date + "</time></span>",
    title: "<h5>" + info.title + "</h5>",
  };
};

/** 記事カードを生成 */
const convertHtml = (info, tags) =>
  '<a href="' +
  info.url +
  '" data-character="' +
  info.author +
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
