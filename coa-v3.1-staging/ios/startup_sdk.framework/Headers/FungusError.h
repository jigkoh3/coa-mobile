//
//  FungusStatus.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/18/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>


static const int ERROR_CODE_101 = 101;
static const int ERROR_CODE_102 = 102;
static const int ERROR_CODE_103 = 103;
static const int ERROR_CODE_104 = 104;
static const int ERROR_CODE_105 = 105;
static const int ERROR_CODE_107 = 107;
static const int ERROR_CODE_108 = 108;
static const int ERROR_CODE_199 = 199;

static const int ERROR_CODE_201 = 201;
static const int ERROR_CODE_202 = 202;
static const int ERROR_CODE_203 = 203;
static const int ERROR_CODE_204 = 204;
static const int ERROR_CODE_205 = 205;

static const int ERROR_CODE_301 = 301;
static const int ERROR_CODE_302 = 302;
static const int ERROR_CODE_304 = 304;

static const int ERROR_CODE_403 = 403;
static const int ERROR_CODE_406 = 406;
static const int ERROR_CODE_407 = 407;
static const int ERROR_CODE_408 = 408;
static const int ERROR_CODE_409 = 409;
static const int ERROR_CODE_455 = 455;
static const int ERROR_CODE_499 = 499;

static const int ERROR_CODE_501 = 501;
static const int ERROR_CODE_502 = 502;
static const int ERROR_CODE_503 = 503;
static const int ERROR_CODE_504 = 504;
static const int ERROR_CODE_505 = 505;
static const int ERROR_CODE_506 = 506;
static const int ERROR_CODE_599 = 599;

static const int ERROR_CODE_999 = 999;







@interface FungusError : NSObject

+(NSString *)getErrorMessage:(int)code;

@end
