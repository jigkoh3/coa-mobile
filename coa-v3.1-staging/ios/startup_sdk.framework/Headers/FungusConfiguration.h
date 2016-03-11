//
//  FungusConfiguration.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/21/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>


#define TAG_FUNGUS @"Fungus SDK"

//Control Version
#define FUNGUS_VERSION @"iOS_FG_v1.1.1.0"
#define FUNGUS_FINGER_PRINT_FILE @"startup_sdk.framework/startup_sdk"

//Resource
#define FUNGUS_RESOURCE_PATH @"" //@"Resource/"

//Shared Preferences
#define FUNGUS_PREFERENCES @"fungus_preference"
#define PREF_FISRT_START @"first_start"
#define PREF_PHONE_NUMBER @"phone_number"
#define PREF_SERIAL_NUMBER @"serial_number"

//User-Agent
#define USER_AGENT @"iphone"

//Encode
#define FUNGUS_ENCODE @"UTF-8"

//Date Format
#define FUNGUS_FORMAT_DATE_LOG @"yyyyMMddhhmmss"

//Message
#define FUNGUS_NOTIFICATION @"Hello Fungus !!"

@interface FungusConfiguration : NSObject

+(NSString *)getURL;

+(NSString *)getURL2;

@end