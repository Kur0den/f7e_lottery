import { logOutput, errorOutput } from './outputUtil.js';
import { instanceCheck, accountCheck } from './valueCheck.js';

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
        try {
            data = await instanceCheck(instanceDomain);
        } catch (error) {
            console.log('instanceCheck error.');
            errorOutput('インスタンスが正しいか確認してください');
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
            errorOutput('アカウントが正しいか確認してください');
            return;
        }
    });

    // 抽選条件チェック
    if (!isFollow && !isReply && !isReaction && !isRenote) {
        errorOutput('抽選条件を選択してください');
        return;
    }

    $('#copy-button').on('click', function () {
        console.log('The button was clicked');
    });
});
