import "../scss/popup.scss";

let BLOCK_FUNCTION = {
  // ブロックリスト
  list: [],

  // ブロックリストを更新(対象を全件投入)
  updateList: function (list) {
    chrome.storage.sync.set({ blocklist: list }, function () {
      console.log("saved");
    });
  },

  // ブロックリストを取得
  getList: function () {
    chrome.storage.sync.get(["blocklist"], function (result) {
      let tmp = result.blocklist != null ? result.blocklist : [];

      BLOCK_FUNCTION.list = tmp
        // chromeから取得したリストをソートして格納(world, name)
        .sort(function (a, b) {
          a1 = a.world.toString().toLowerCase();
          b1 = b.world.toString().toLowerCase();
          if (a1 < b1) return -1;
          else if (a1 > b1) return 1;
          else {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
          }
        })
        // 重複を除外(id)
        .filter(function (v1, i1, a1) {
          return (
            a1.findIndex(function (v2) {
              return v1.id === v2.id;
            }) === i1
          );
        });

      // 画面に反映
      BLOCK_FUNCTION.redrawList();
    });
  },

  // ブロックリストを画面に反映
  redrawList: function () {
    // ブロックリストのHTMLを生成
    let html = [];
    $(BLOCK_FUNCTION.list).each(function (index, item) {
      let tmp =
        '<tr data-id="' +
        item.id +
        '" data-name="' +
        item.name +
        '" data-world="' +
        item.world +
        '"><td><a href="https://jp.finalfantasyxiv.com/lodestone/character/' +
        item.id +
        '/" target="_blank" rel="noopener">' +
        item.name +
        "</a></td><td>" +
        item.world +
        '</td><td><span class="remove">解除</span></td></tr>';
      html.push(tmp);
    });

    // ブロックリストのHTMLを更新
    $("#blocklist-list tbody").html(html);
  },

  // 設定画面からブロックリストを取得
  readyUpdate: function () {
    let tmp = [];
    $("#blocklist-list tbody tr").each(function (index, item) {
      tmp.push({
        id: $(item).data("id"),
        name: $(item).data("name"),
        world: $(item).data("world"),
      });
    });
    BLOCK_FUNCTION.list = tmp;
  },
};

// ページ読み込み完了時に実行
window.onload = function () {
  BLOCK_FUNCTION.getList();
};

// 解除ボタン押下
$(document).on("click", ".remove", function () {
  $(this).closest("tr").remove();
});

// 保存ボタン押下
$(document).on("click", "#save", function () {
  // 残るブロックリストを取得
  BLOCK_FUNCTION.readyUpdate();

  // ブロックリストを更新
  BLOCK_FUNCTION.updateList(BLOCK_FUNCTION.list);
});

// キャンセルボタン押下
$(document).on("click", "#cancel", function () {
  window.close();
});
