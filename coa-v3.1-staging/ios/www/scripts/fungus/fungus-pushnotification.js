var PLUGIN_FUNGUS_PUSH = "PluginFungusPushNotification";

var PLUGIN_ACTION_SUBSCRIBE = "subscribePlugin";
var PLUGIN_ACTION_UNSUBSCRIBE = "unsubscribePlugin";

function subscribe()
{
	alert("Subscribe");
    cordova.exec(onSubscribeSuccessed, onSubscribeFailed, PLUGIN_FUNGUS_PUSH, PLUGIN_ACTION_SUBSCRIBE, ["userId"]);
}

function unsubscribe()
{
	alert("Unsubscribe");
    cordova.exec(onUnsubscribeSuccessed, onUnsubscribeFailed, PLUGIN_FUNGUS_PUSH, PLUGIN_ACTION_UNSUBSCRIBE, ["userId"]);
}

function onSubscribeSuccessed()
{
    alert("Subscribing successfully.");
}

function onSubscribeFailed(message)
{
    alert(message);
}

function onUnsubscribeSuccessed()
{
    alert("Unsubscribing successfully.");
}

function onUnsubscribeFailed(message)
{
    alert(message);
}

function callbackMessage(message)
{
    alert(message);
    
}

                                                                     
                                                                     
                                                                     