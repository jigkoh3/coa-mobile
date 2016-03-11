//
//  ServiceUserAuthenticate.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 2/28/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ConnectionProcess.h"
#import "ResponseStatus.h"

@protocol ServiceUserAuthenticateDelegate<NSObject>

-(void)callbackServiceUserAuthenSuccess;
-(void)callbackServiceUserAuthenError:(ResponseStatus *)status;

@end
@interface ServiceUserAuthenticate : NSObject <ConnectProcessDelegate>
{
    ConnectionProcess *connection;
}

@property (nonatomic, assign) id<ServiceUserAuthenticateDelegate> delegate;

- (void)requestUserAuthenwithOTP:(NSString *)OTP;
- (void)requestUserAuthenWithUsername:(NSString *)username password:(NSString *)password;

@end
