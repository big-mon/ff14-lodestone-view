// 画像要素のリストを加工
var imgs = document.querySelectorAll('.blog__area .img_box');
hrefEdit(imgs);
imgs = document.querySelectorAll('.blog__area--simple .thumb_list .mb10');
hrefEdit(imgs);

// リストのクラスを削除
imgs = document.querySelectorAll('.blog__area--simple .thumb_list');
removeClass(imgs);

// hrefを入れ替える関数
function hrefEdit(list) {
  list.forEach(function (item, index, array) {
    // 指定タグを取得
    var a = item.querySelector('a');
    var img = item.querySelector('img');

    // 規定タグを変更
    item.classList.add('custom_img');
    item.classList.remove('img_box');
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.removeAttribute('style');

    // 属性を更新
    img.src = a.href;
  });
}

// 特定クラスを削除
function removeClass(list) {
  list.forEach(function (item, index, array) {
    item.classList.remove('thumb_list');
  });
}
