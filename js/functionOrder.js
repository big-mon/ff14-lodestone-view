// ページ読み込み後の実行処理を制御
$(document).ready(function() {
  // 機能有効化設定を取得
  chrome.storage.sync.get(["activeList"], function(result) {
    var activeList =
      result.activeList != null
        ? result.activeList
        : { list: true, detail: true };
    console.log(activeList);

    var url = location.href;

    // 個別ページの場合
    if (activeList.detail && url.indexOf("lodestone/character") != -1) {
      $(".ldst__bg").addClass("active-run");

      DETAIL_FUNCTION.imgConvert();

      // ブロックリストを取得
      chrome.storage.sync.get(["blocklist"], function(result) {
        // 未定義の場合はからの配列を代入
        BLOCK_FUNCTION.blockUserList =
          result.blocklist != null ? result.blocklist : [];

        // ブロックボタンの追加判定
        BLOCK_FUNCTION.chara_id = url.match(/^.+character\/([0-9]+)\//)[1];
        BLOCK_FUNCTION.insertButton();
      });
    }
    // 一覧ページの場合
    else if (activeList.list && url.indexOf("lodestone/blog") != -1) {
      $(".ldst__bg").addClass("active-run");

      LIST_FUNCTION.editTitle();
      LIST_FUNCTION.editPopular();
      LIST_FUNCTION.editRecent();

      // ブロックリストを取得
      chrome.storage.sync.get(["blocklist"], function(result) {
        BLOCK_FUNCTION.blockUserList = result.blocklist;
        BLOCK_FUNCTION.hiddenBlock();
      });
    }
  });
});

// ブロック追加ボタン押下
$(document).on("click", "#custom_blocklist span", function() {
  var msg =
    "このユーザーの日記をブロックしますか？\nブロックを解除する場合は拡張機能の設定画面から操作してください" +
    "\n\n" +
    "Block this user?\nTo unblock, operate from the extension settings.";

  // 確認メッセージ
  if (confirm(msg)) {
    // キャラクター情報を取得
    var item = $(".ldst__window .frame__chara__box");
    BLOCK_FUNCTION.blockUserList.push({
      id: BLOCK_FUNCTION.chara_id,
      name: $(item)
        .find(".frame__chara__name")
        .text(),
      world: $(item)
        .find(".frame__chara__world")
        .text()
    });

    // 連想配列から重複を削除
    BLOCK_FUNCTION.cleaningList();

    // 更新
    chrome.storage.sync.set(
      { blocklist: BLOCK_FUNCTION.blockUserList },
      function() {
        console.log("saved");
      }
    );
  }
});
