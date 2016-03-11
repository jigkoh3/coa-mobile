//
//  LoginBase.h
//  TestFungus2
//
//  Created by Pluem Limrattanakan on 3/11/56 BE.
//  Copyright (c) 2556 Pluem Limrattanakan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LoginFactory.h"
#import "ResponseStatus.h"

@protocol LoginDelegate <NSObject>

-(void)requestLoginSuccess;
-(void)requestLoginError:(ResponseStatus *)status;

@end

@interface LoginBase : NSObject

{
    
}
@property (nonatomic, assign)id<LoginDelegate> delegate;
- (void)login;

- (id)getLoginBaseWithAPI:(NSString *)APIName;
//- (BOOL)checkApiAllowWithApiName:(NSString *)apiName;


+ (void)setCurrentAPILevel:(NSString *)currentAPILevel;
+ (void)setCurrentSecureLevel:(NSString *)currentSecureLevel;
+ (NSString *)getNewAPILevel;
+ (NSString *)getNewSecureLevel;

@end
