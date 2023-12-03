// 要素の取得
const form = document.querySelector('.form');
const exportBtn = document.querySelector('.exportBtn');
const editBtn = document.querySelector('.editBtn');
const tbody = document.querySelector('.tbody');

const APP = {
    // 入力した内容を一次保存する配列
    data: [],
    init() {
        APP.addListeners();
    },
    addListeners() {
        // フォームの送信イベントを監視
        form.addEventListener('submit', APP.createData);
    },
    createData(e) {
        // エンターキーでの実行をキャンセル
        e.preventDefault();
        // フォームの入力値を取得
        const formData = new FormData(form);
        // データを保存する
        APP.data.push(Array.from(formData.values()));

        // テーブルに行を追加する

        // フォームをクリアにする
    },
};

// DOMの読み込みが完了したらAPP.initを実行
document.addEventListener("DOMContentLoaded", APP.init);