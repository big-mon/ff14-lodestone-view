import { imgConvert } from "./ff14-detail";
import { editTitle, editPopular, editRecent } from "./ff14-list";
import {
  blockUserList,
  chara_id,
  hiddenBlock,
  insertButton,
  cleaningList,
} from "./ff14-blocklist";

/** ページ毎の処理を設定 */
const setPageFunction = function () {
  const url = location.href;

  // 個別ページの場合
  if (url.indexOf("lodestone/character") != -1) {
    imgConvert();

    // ブロックリストを取得
    chrome.storage.sync.get(["blocklist"], function (result) {
      // 未定義の場合はからの配列を代入
      blockUserList = result.blocklist != null ? result.blocklist : [];

      // ブロックボタンの追加判定
      chara_id = url.match(/^.+character\/([0-9]+)\//)[1];
      insertButton();

      // ブロック追加ボタンのクリックイベントを定義
      document
        .querySelector("#custom_blocklist span")
        .addEventListener("click", blockAction, false);
    });
  }
  // 一覧ページの場合
  else if (url.indexOf("lodestone/blog") != -1) {
    editTitle();
    editPopular();
    editRecent();

    // ブロックリストを取得
    chrome.storage.sync.get(["blocklist"], function (result) {
      blockUserList = result.blocklist;

      hiddenBlock();
    });
  }
};

/** ブロック追加ボタン押下処理 */
const blockAction = function () {
  const msg =
    "このユーザーの日記をブロックしますか？\nブロックを解除する場合は拡張機能の設定画面から操作してください" +
    "\n\n" +
    "Block this user?\nTo unblock, operate from the extension settings.";

  // 確認メッセージ
  if (!confirm(msg)) return;

  // キャラクター情報を取得
  const item = $(".ldst__window .frame__chara__box");
  blockUserList.push({
    id: chara_id,
    name: $(item).find(".frame__chara__name").text(),
    world: $(item).find(".frame__chara__world").text(),
  });

  // 連想配列から重複を削除
  cleaningList();

  // 更新
  chrome.storage.sync.set({ blocklist: blockUserList }, function () {
    console.log("saved");
  });
};

// ページ読み込み後の実行処理を制御
window.addEventListener("load", setPageFunction, false);
