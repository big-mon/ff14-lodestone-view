// ページ読み込み後の実行処理を制御
$(document).ready(function() {
  var url = location.href;

  // 個別ページの場合
  if (url.indexOf("lodestone/character") != -1) {
    DETAIL_FUNCTION.imgConvert();
  } // 一覧ページの場合
  else if (url.indexOf("lodestone/blog") != -1) {
    LIST_FUNCTION.editTitle();
    LIST_FUNCTION.editPopular();
    LIST_FUNCTION.editRecent();
  }
});
