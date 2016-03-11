//
//  SubscribePlugin.m
//  module410PushNotificationsPushApplicationIphone
//
//  Created by Pluem Limrattanakan on 5/14/56 BE.
//
//

#import "PluginFungusPushNotification.h"
#import <startup_sdk/ServicePushNotification.h>

@interface PluginFungusPushNotification() <ServicePushNotificationDelegate>

{
   NSString *responseString;
}
@property (nonatomic, strong)NSString *callbackId;
@end

@implementation PluginFungusPushNotification
@synthesize callbackId;

// Subscribe

- (void)subscribePlugin:(CDVInvokedUrlCommand *)command
{
    self.callbackId = command.callbackId;
    
    NSString *username = [command.arguments objectAtIndex:0];
    ServicePushNotification *servicePush = [[ServicePushNotification alloc] init];
    [servicePush setDelegate:self];
    [servicePush setParameterWithUsername:username];
    [servicePush subscribe];
}

- (void)callbackWLSubscribeSuccess:(NSString *)message
{
    responseString = @"WL SubscribeSuccess";
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
}

- (void)callbackWLSubscribeError:(NSString *)message
{
    responseString = [NSString stringWithFormat:@"WL SubscribeError : %@",message];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:responseString];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
}

// Unsubscribe

- (void)unsubscribePlugin:(CDVInvokedUrlCommand *)command
{
    self.callbackId = command.callbackId;
    NSString *username = [command.arguments objectAtIndex:0];
    ServicePushNotification *servicePush = [[ServicePushNotification alloc] init];
    [servicePush setParameterWithUsername:username];
    [servicePush setDelegate:self];
    [servicePush unsubscribe];
}

- (void)callbackWLUnsubscribeSuccess:(NSString *)message
{
    responseString = @"WL UnsubscribeSuccess";
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];

}

- (void)callbackWLUnsubscribeError:(NSString *)message
{
    responseString = @"WL UnsubscribeError";
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:responseString];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];

}

@end

