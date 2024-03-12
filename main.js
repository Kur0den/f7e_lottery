$(function () {
    $('#run-button').on('click', async function () {
        console.log('The button was clicked');

        // アカウント設定
        const instanceDomain = $('#instance-input').val();
        const accountName = $('#account-input').val();

        // 抽選設定
        const isFollow = $('#is-follow').prop('checked');
        const isReply = $('#is-reply').prop('checked');
        const isReaction = $('#is-reaction').prop('checked');
        const isRenote = $('#is-renote').prop('checked');

        // 入力チェック
        if (instanceDomain === '' && accountName === '') {
            $('#error-title').text('インスタンスとアカウントを入力してください');
            return;
        } else if (instanceDomain === '') {
            $('#error-title').text('インスタンスを入力してください');
            return;
        } else if (accountName === '') {
            $('#error-title').text('アカウントを入力してください');
            return;
        }

        // 抽選条件チェック
        if (!isFollow && !isReply && !isReaction && !isRenote) {
            $('#error-title').text('抽選条件を選択してください');
            return;
        }

        // インスタンスとアカウントが正しいかどうか確認
        // インスタンス
        try {
            data = await instanceCheck(instanceDomain);
        } catch (error) {
            console.log('instanceCheck error.');
            $('#error-title').text('インスタンスが正しいか確認してください');
            return;
        }
        console.log(data);
        // webfingerの問い合わせ用URLを生成
        const webFingerUrl = data.replace('{uri}', 'acct:' + accountName + '@' + instanceDomain);
        logOutput('webFingerUrl: ' + webFingerUrl);
        try {
            await accountCheck(webFingerUrl);
            // 実行ユーザーを変数に格納
            const executeUser = { accountName, instanceDomain };
        } catch (error) {
            console.log('accountCheck error.');
            $('#error-title').text('アカウントが正しいか確認してください');
            return;
        }
    });

    $('#copy-button').on('click', function () {
        console.log('The button was clicked');
    });
});

// インスタンスが正しいかどうか.wellknown.jsonがあるかどうかで確認
function instanceCheck(instanceDomain) {
    console.log('instanceCheck');

    var dfd = $.Deferred();

    $.ajax({
        url: 'https://' + instanceDomain + '/.well-known/host-meta.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            logOutput('/.wellknown/host-meta.json is found.');
            logOutput('webFingerTemplate: ' + data['links'][0]['template']);
            dfd.resolve(data['links'][0]['template']);
        },
        error: function (data) {
            logOutput('/.wellknown/host-meta.json is not found.');
            console.log(data);
            dfd.reject();
        },
    });

    return dfd.promise();
}

// 入力されたアカウントが正しいかどうか確認
function accountCheck(webFingerUrl) {
    console.log('accountCheck');

    var dfd = $.Deferred();

    $.ajax({
        url: webFingerUrl,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            logOutput('Account is found.');
            console.log(data);
            logOutput('AccountUrl: ' + data['links'][1]['href']);
            dfd.resolve();
        },
        error: function (data) {
            logOutput('Account is not found.');
            console.log(data);
            dfd.reject();
        },
    });

    return dfd.promise();
}

// それっぽいログへの出力
function logOutput(content) {
    $('#log').append(`<p>${content}</p>`);
    // スクロールを一番下にする
    $('#log').scrollTop($('#log')[0].scrollHeight);
}
