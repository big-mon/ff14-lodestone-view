// ブロックリスト
var list;

// ページ読み込み完了時に実行
window.onload = function() {
  getBlocklist();
};

// ブロックリストを更新(対象を全件投入)
function setBlocklist(list) {
  chrome.storage.sync.set({ blocklist: list }, function() {
    console.log("saved");
  });
}

// ブロックリストを取得
function getBlocklist() {
  chrome.storage.sync.get(["blocklist"], function(result) {
    // chromeから取得したリストをソートして格納(world, name)
    list = result.blocklist.sort(function(a, b) {
      a1 = a.world.toString().toLowerCase();
      b1 = b.world.toString().toLowerCase();
      if (a1 < b1) return -1;
      else if (a1 > b1) return 1;
      else {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      }
    });

    // 画面に反映
    refreshList();
  });
}

// 設定画面からブロックリストを取得
function getBlocklistFromTable() {
  var tmp = [];
  $("#blocklist-list tbody tr").each(function(index, item) {
    tmp.push({
      id: $(item).data("id"),
      name: $(item).data("name"),
      world: $(item).data("world")
    });
  });
  list = tmp;
}

// ブロックリストを画面に反映
function refreshList() {
  // ブロックリストのHTMLを生成
  var html = [];
  $(list).each(function(index, item) {
    var tmp =
      '<tr data-id="' +
      item.id +
      '" data-name="' +
      item.name +
      '" data-world="' +
      item.world +
      '"><td><a href="https://jp.finalfantasyxiv.com/lodestone/character/' +
      item.id +
      '/" target="_blank">' +
      item.name +
      "</a></td><td>" +
      item.world +
      '</td><td><span class="remove">解除</span></td></tr>';
    html.push(tmp);
  });

  // ブロックリストのHTMLを更新
  $("#blocklist-list tbody").html(html);
}

// 解除ボタン押下
$(document).on("click", ".remove", function() {
  $(this)
    .closest("tr")
    .remove();
});

// 保存ボタン押下
$(document).on("click", "#save", function() {
  // 残るブロックリストを取得
  getBlocklistFromTable();

  // ブロックリストを更新
  setBlocklist(list);
});

// キャンセルボタン押下
$(document).on("click", "#cansel", function() {
  window.close();
});
