import { logOutput } from './outputUtil.js';
import { noteGet } from './misskeyApi.js';

// インスタンスが正しいかどうか.wellknown.jsonがあるかどうかで確認
export function instanceCheck(instanceDomain) {
    logOutput('instanceCheck');

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
    logOutput('accountCheck');

    var dfd = $.Deferred();

    $.ajax({
        url: webFingerUrl,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            logOutput('Account found.');
            console.log(data);
            logOutput('AccountUrl: ' + data['links'][1]['href']);
            dfd.resolve();
        },
        error: function (data) {
            logOutput('Account not found.');
            console.log(data);
            dfd.reject();
        },
    });

    return dfd.promise();
}

// ノートに関する抽選条件が指定されていた場合にURLが入力されているかどうか確認
export async function noteCheck(noteUrl, instanceDomain) {
    logOutput('noteUrlCheck');

    var dfd = $.Deferred();

    // URLが入力されているかどうか確認
    if (noteUrl === '') {
        dfd.reject('noInput');
    }
    const noteId = noteUrl.slice(noteUrl.lastIndexOf('/') + 1);
    logOutput('noteId: ' + noteId);

    // ノートが正しいかどうか確認
    let noteData;
    try {
        noteData = await noteGet(noteId, instanceDomain);
    } catch (error) {
        dfd.reject('noNote');
    }
    dfd.resolve(noteData);

    return dfd.promise();
}
