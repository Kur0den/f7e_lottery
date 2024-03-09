$(function () {
    $('#run-button').on('click', function () {
        console.log('The button was clicked');

        // アカウント設定
        const instanceDomain = $('#instance-input').val();
        const accountName = $('#account-input').val();

        // 抽選設定
        const isFollow = $('#is-follow').prop('checked');
        const isReply = $('#is-reply').prop('checked');
        const isReaction = $('#is-reaction').prop('checked');
        const isRenote = $('#is-renote').prop('checked');

        instanceCheck(instanceDomain).then(function (data) {
            console.log(data);
            const webFingerData = data.replace('{uri}', 'acct:' + accountName + '@' + instanceDomain);
            console.log(webFingerData);
            accountCheck(webFingerData, accountName);
        });
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
            logOutput('success');
            console.log(data);
            dfd.resolve(data['links'][0]['template']);
        },
        error: function (data) {
            logOutput('error');
            logOutput(data);
            dfd.reject();
        },
    });

    return dfd.promise();
}

// 入力されたインスタンス、アカウントが正しいかどうか確認
function accountCheck(instanceDomain, accountName) {}

// それっぽいログへの出力
function logOutput(content) {
    $('#log').append(`<p>${content}</p>`);
}
