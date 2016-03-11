//
//  SubscribePlugin.h
//  module410PushNotificationsPushApplicationIphone
//
//  Created by Pluem Limrattanakan on 5/14/56 BE.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>


@interface PluginFungusPushNotification : CDVPlugin


- (void)subscribePlugin:(CDVInvokedUrlCommand *)command;
- (void)unsubscribePlugin:(CDVInvokedUrlCommand *)command;

@end
