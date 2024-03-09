$(function () {
    $('#run-button').on('click', function () {
        console.log('The button was clicked');

        const instanceDomain = $('#instance-input').val();
        const accountName = $('#account-input').val();

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

function instanceCheck(instanceDomain) {
    console.log('instanceCheck');

    var dfd = $.Deferred();

    $.ajax({
        url: 'https://' + instanceDomain + '/.well-known/host-meta.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('success');
            console.log(data);
            dfd.resolve(data['links'][0]['template']);
        },
        error: function (data) {
            console.log('error');
            console.log(data);
            dfd.reject();
        },
    });

    return dfd.promise();
}

// 入力されたインスタンス、アカウントが正しいかどうか確認
function accountCheck(instanceDomain, accountName) {}
