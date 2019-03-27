var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/c2MpWM5Aves:APA91bGYIZN6SI0AiXhomSCtc5tEBf3WkkpBzY_us-ct8zZQIw9bT-N2qLL0XbJPZ10SYE9B4VbD05T9V5j1tNEyr4J1znN--OLrjOL0A6rncSB_Vvc7mFIIPFSZldWDB3T2bYajCaiN",
    "keys": {
        "p256dh": "BCXkqdnZdDSwWEf9Xr45uukXYb/WU9n8vWVxgIf0ATsgcYppgqwFmwegMVQTyW9+uNnp9iiNXqU45v5S8nztiKY=", 
        "auth": "I3XxYsNiFDjWrZ8s+B6whw=="
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
