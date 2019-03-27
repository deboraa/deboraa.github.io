var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/cqHijiwqjVQ:APA91bFfjt4aMXEwrk4r-8gokTli_iKgPYvhl76usO19TeCXNL8C2EknCmcDlAckF91YP1t8fh_RE4rlv7cuQKYO38YhAeePd_GSTh5hUh7LNQcfCj3GstB4DuWhtwYH23DyTuvaoUmX",
    "keys": {
        "p256dh": "BPpq61aZLaJsa+dgorbRp98vZYz/iNYSvv5AzNMxsALF1bakpV3JRQvGJOgLS3U32jkyAeM5xWaG3f5fZQ9fD8s=", 
        "auth": "GsYnvmPVlNKyxLSPc05odQ=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AAAAOin8kqE:APA91bGncZcWFrCC6MRSo7MOfBpqr7UjxKM95XcVW4AZQXzrPH2PhKuF-zA2PvSVOm4mGUSRu1XUqo7MQZBjkurhfYAsSmPhdqt5tIuSwd175E0yCegKPChGm763HsqlS_jLZseQ5ST8',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
