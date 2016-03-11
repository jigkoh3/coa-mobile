//
//  TestWorklight.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 5/10/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RequestService.h"

@protocol ServicePushNotificationDelegate <NSObject>
- (void)callbackWLSubscribeSuccess:(NSString *)message;
- (void)callbackWLSubscribeError:(NSString *)message;
- (void)callbackWLUnsubscribeSuccess:(NSString *)message;
- (void)callbackWLUnsubscribeError:(NSString *)message;
@end

@interface ServicePushNotification : RequestService

@property (strong, nonatomic)id<ServicePushNotificationDelegate> delegate;



- (BOOL)isPushSupported;
- (void)unsubscribe;
- (void)subscribe;
- (void)setParameterWithUsername:(NSString *)username;

@end
