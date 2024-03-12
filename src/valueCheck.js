// インスタンスが正しいかどうか.wellknown.jsonがあるかどうかで確認
export function instanceCheck(instanceDomain) {
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
export function accountCheck(webFingerUrl) {
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

// ノートに関する抽選条件が指定されていた場合にURLが入力されているかどうか確認
export function noteCheck() {
    console.log('noteCheck');
    // URLが入力されているかどうか確認
    if (noteUrl === '') {
        return false;
    }
}
