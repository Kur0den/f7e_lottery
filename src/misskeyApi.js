import { logOutput } from './outputUtil.js';

export function noteGet(noteId, instanceDomain) {
    console.log('noteGet');

    var dfd = $.Deferred();

    $.ajax({
        url: `https://${instanceDomain}/api/notes/show`,
        type: 'POST',
        data: JSON.stringify({ noteId: noteId }),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            logOutput('Note is found.');
            console.log(data);
            dfd.resolve(data);
        },
        error: function (data) {
            logOutput('Note is not found.');
            logOutput('status:' + data.status);
            if (data.status[0] === 5) {
                logOutput('Server is alive?');
            }
            console.log(data);
            dfd.reject();
        },
    });

    return dfd.promise();
}
