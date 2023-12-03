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

        // テーブルに行を追加する（タグを用意する）
        const tr = document.createElement('tr');
        // テーブルに行を追加する（内容を入れる）
        tr.innerHTML += `
            <td>${formData.get('name')}</td>
            <td>${formData.get('address')}</td>
            <td>${formData.get('age')}</td>
            <td>${formData.get('tel')}</td>
        `;
        // テーブルに行を追加する（テーブルに追加する）
        tbody.appendChild(tr);

        // フォームをクリアにする
        form.reset();

        // フォーカスを名前の入力欄に移動する
        form.name.focus();
    },
};

// DOMの読み込みが完了したらAPP.initを実行
document.addEventListener("DOMContentLoaded", APP.init);