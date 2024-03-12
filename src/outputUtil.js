// エラーメッセージを出力
export function errorOutput(content) {
    $('#error-title').text(content);
}

// それっぽいログへの出力
export function logOutput(content) {
    $('#log').append(`<p>${content}</p>`);
    // スクロールを一番下にする
    $('#log').scrollTop($('#log')[0].scrollHeight);
}
