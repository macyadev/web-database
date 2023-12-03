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
        // フォーム送信時のイベントを監視
        form.addEventListener('submit', APP.createData);
        // ダブルクリックで編集するイベントを監視
        tbody.addEventListener('dblclick', APP.editData);
    },
    // 新しいデータを作るイベント
    createData(e) {
        // エンターキーでの実行をキャンセル
        e.preventDefault();
        // フォームの入力値を取得
        const formData = new FormData(form);
        // データを保存する
        APP.data.push(Array.from(formData.values()));

        // テーブルに行を追加する（タグを用意する）
        const tr = document.createElement('tr');
        tr.innerHTML = "";
        // 何行目かを認識するために属性を追加する
        tr.setAttribute('data-row', tbody.querySelectorAll('tr').length);

        // テーブルに行を追加する（内容を入れる）
        let col = 0;
        for (let entry of formData.entries()) {
            tr.innerHTML += `<td data-col="${col}" data-name="${entry[0]}">${entry[1]}</td>`;
            col++;
        }

        // テーブルに行を追加する（テーブルに追加する）
        tbody.appendChild(tr);

        // フォームをクリアにする
        form.reset();

        // フォーカスを名前の入力欄に移動する
        form.name.focus();
    },
    // データを編集するイベント
    editData(e) {
        // 修正したセルを認識する
        let cell = e.target.closest("td");
        if (cell) {
            // 行番号の取得（tdの親であるtrを確認する）
            let row = cell.parentElement.getAttribute("data-row");
            // 列番号の取得
            let col = cell.getAttribute("data-col");
            // 編集可能にする
            cell.contentEditable = true;
            cell.focus();
            // データの更新
            editBtn.addEventListener('click', () => {
                // 配列データの中身を画面入力値にする
                APP.data[row][col] = cell.textContent;
            });
        }
    },
};

// DOMの読み込みが完了したらAPP.initを実行
document.addEventListener("DOMContentLoaded", APP.init);