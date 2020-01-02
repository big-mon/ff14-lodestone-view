var BLOCK_FUNCTION = {
  // ブロックリスト
  blockUserList: [],

  // 現在表示している日記のキャラクターID
  chara_id: "",

  // 連想配列から重複を削除
  cleaningList: function() {
    BLOCK_FUNCTION.blockUserList.filter(function(v1, i1, a1) {
      return (
        a1.findIndex(function(v2) {
          return v1.id === v2.id;
        }) === i1
      );
    });
  },

  // 個別ページ用 - ブロックリスト入りボタンを追加
  insertButton: function() {
    // ブロック済みかを判定
    var isAlreadyBlocked = false;
    $(BLOCK_FUNCTION.blockUserList).each(function(index, item) {
      if (item.id === chara_id) isAlreadyBlocked = true;
    });

    // キャラクター情報取得成功かつ未ブロックの場合、ボタンを表示
    if (isAlreadyBlocked) {
      var html =
        '<div id="custom_blocklist">⛔ This user is listed in your blocklist.</div>';
      $(".btn__nav").before(html);
    } else if ($(".ldst__window .frame__chara__box").length) {
      var html =
        '<div id="custom_blocklist"><span>⛔ Add Blocklist</span></div>';
      $(".btn__nav").before(html);
    }
  },

  // 一覧ページ用 - ブロックユーザーの記事を非表示
  hiddenBlock: function() {
    $(".entry__block__wrapper a").each(function(index, item) {
      BLOCK_FUNCTION.blockUserList.filter(function(itm, idx) {
        if (itm.id == $(item).attr("data-character")) {
          console.log("Blocked:" + itm.name + "(" + itm.id + ")");
          $(item)
            .closest(".entry__blog_block")
            .attr("style", "display: none");
        }
      });
    });
  }
};
