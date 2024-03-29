import { logOutput, errorOutput } from './outputUtil.js';
import { instanceCheck, accountCheck, noteCheck } from './valueCheck.js';

$(function () {
    $('#run-button').on('click', async function () {
        console.log('The button was clicked');

        // アカウント設定
        const instanceDomain = $('#instance-input').val();
        const accountName = $('#account-input').val();

        // 抽選設定
        const isFollow = $('#is-follow').prop('checked');
        const noteUrl = $('#note-url').val();
        const isReply = $('#is-reply').prop('checked');
        const isReaction = $('#is-reaction').prop('checked');
        const isRenote = $('#is-renote').prop('checked');

        // 入力チェック
        if (instanceDomain === '' && accountName === '') {
            errorOutput('インスタンスとアカウントを入力してください');
            return;
        } else if (instanceDomain === '') {
            errorOutput('インスタンスを入力してください');
            return;
        } else if (accountName === '') {
            errorOutput('アカウントを入力してください');
            return;
        }

        // インスタンスとアカウントが正しいかどうか確認

        // インスタンス
        let urlData;
        try {
            urlData = await instanceCheck(instanceDomain);
        } catch (error) {
            console.log('instanceCheck error.');
            logOutput('instanceCheck failed.');
            errorOutput('インスタンスが正しいか確認してください');
            console.log(error);
            return;
        }
        logOutput('instanceCheck success.');
        console.log(urlData);
        // webfingerの問い合わせ用URLを生成
        const webFingerUrl = urlData.replace('{uri}', 'acct:' + accountName + '@' + instanceDomain);
        logOutput('webFingerUrl: ' + webFingerUrl);

        // アカウント
        let executeUser;
        try {
            await accountCheck(webFingerUrl);
            // 実行ユーザーを変数に格納
            executeUser = { accountName, instanceDomain };
        } catch (error) {
            console.log('accountCheck error.');
            logOutput('accountCheck failed.');
            errorOutput('アカウントが正しいか確認してください');
            console.log(error);
            return;
        }
        logOutput('accountCheck success.');

        // 抽選条件チェック
        if (!isFollow && !isReply && !isReaction && !isRenote) {
            logOutput('No lottery conditions selected.');
            errorOutput('抽選条件を選択してください');
            return;
        }
        logOutput('Lottery conditions selected.');
        logOutput('isFollow: ' + isFollow);
        logOutput('isReply: ' + isReply);
        logOutput('isReaction: ' + isReaction);
        logOutput('isRenote: ' + isRenote);

        // ノートに関する抽選条件が指定されていた場合にURLが入力されているかどうか確認
        if (isReaction || isRenote || isReply) {
            try {
                await noteCheck(noteUrl, instanceDomain);
            } catch (error) {
                console.log('noteCheck error.');
                logOutput('noteCheck failed.');
                if (error == 'noInput') {
                    errorOutput('ノートのURLを入力してください');
                } else if (error == 'noNote') {
                    errorOutput('正しいノートのURLを入力してください');
                } else {
                    errorOutput('正しいか確認してください');
                }
                console.log(error);
                return;
            }
            logOutput('noteCheck success.');
        } else {
            logOutput('noteCheck is not required.');
        }

        $('#copy-button').on('click', function () {
            console.log('The button was clicked');
        });
    });
});
