// 機能呼び出しはblocklist.jsに統合
var USE_FUNCTION = {
  // 設定情報を画面に反映
  getChecked: function() {
    chrome.storage.sync.get(["activeList"], function(result) {
      var tmp =
        result.activeList != null
          ? result.activeList
          : { list: true, detail: true };
      $("#use-list").prop("checked", tmp.list);
      $("#use-detail").prop("checked", tmp.detail);
    });
  },

  // アクティベートリストを更新
  updateActivate: function() {
    var u_l = $("#use-list").prop("checked");
    var u_d = $("#use-detail").prop("checked");
    var list = { list: u_l, detail: u_d };

    chrome.storage.sync.set({ activeList: list }, function() {
      console.log("saved-activate");
    });
  }
};
