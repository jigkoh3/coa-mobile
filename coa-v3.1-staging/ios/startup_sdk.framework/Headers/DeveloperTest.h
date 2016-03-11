//
//  DeveloperTest.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/21/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DeveloperTest : NSObject

+(void)setSimulateError:(BOOL)simulate;
+(BOOL)isSimulateError;

+(void)setErrorList:(NSString *)errorFile;
+(void)setErrorCode:(NSString *)code;

+(NSString *)getErrorCode;
+(NSString *)getErrorDescription;
+(NSArray *)getErrorList;

+(void)logErrorList;

@end
