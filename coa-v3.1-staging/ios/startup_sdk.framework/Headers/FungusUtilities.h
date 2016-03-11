//
//  FungusUtilities.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/8/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@interface FungusUtilities : NSObject



+(NSString *) getRandomText:(int) len;

+(NSString *) getCertificate;
+(NSString *) getFingerPrint;

+(NSString *) getFungusTimeFormat:(double) time;

+(void) displayDialog:(NSString *) message;

+(BOOL) checkInternetConnection;

+(NSString*)base64forData:(NSData*)theData;
+(NSString *)bytesToHex:(const unsigned char *)bytes length:(size_t)len;
+(NSData*)mergeNSData:(NSData*)first mergeWith:(NSData*)second;
+(NSData*)divideData:(NSData*) fullPiece;

+ (NSString *)getCurrentDeviceLanguage;

+ (NSString *)getUserAgent;

// Loading
+ (void)showLoading;
+ (void)hideLoading;




@end
