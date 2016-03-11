//
//  FungusParameter.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/8/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FungusParameter : NSObject


+(void) setApplicationID:(NSString *) appID;
+(NSString *) getApplicationID;

+(void) setApplicationVersion:(NSString *) appVersion;
+(NSString *) getApplicationVersion;

+(void) setDeveloperID:(NSString *) devID;
+(NSString *) getDeveloperID;

+(void) setFungusCerticicateFileName:(NSString *) certificate;
+(NSString *) getFungusCerticicateFileName;

+(void) clearSessionID;
+(void) setSessionID:(NSString *) ssID;
+(NSString *) getSessionID;

+(void) setTokenID:(NSString *)token;
+(NSString *) getTokenID;

+ (void)clearTokenKey;
+ (void)setTokenKey:(NSString *)token;
+ (NSString *) getTokenKey;

+(void) setOrderRef;
+(NSString *) getOrderRef;

+(void) clearMSISDN;
+(void) setMSISDN:(NSString *) number;
+(NSString *) getMSISDN;

+(void) clearUserToken;
+(void) setUserToken:(NSString *) token;
+(NSString *) getUserToken;

+(BOOL) isRequestLogin;

+(void) setOrderID:(NSString *) transID;
+(NSString *) getOrderID;

+(void) setVmIP:(NSString *) ip;
+(NSString *) getVmIP;

+(void) setVmUrl:(NSString *) url;
+(NSString *) getVmUrl;

+(void) setUserStatus:(NSString *) status;
+(NSString *) getUserStatus;

+(void) setPermissionList:(NSArray *) permissions;
//+(NSArray *) getPermissionList;
+(NSArray *) getPermissionList;

+(void) setAppStatus:(NSString *)status;
+(NSString *)getAppStatus;

+(void) setGssoTransactionId:(NSString *)GssoTransactionId;
+(NSString *)getGssoTransactionId;

+(BOOL)isAuthenticated;





@end
