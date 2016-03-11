//
//  Utility.h
//  SusanooLib
//
//  Created by Narongdet Intharasit on 11/8/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "FungusConfiguration.h"

@interface Utility : NSObject {
    
}

+(NSString *) platform;
+(NSString *) platformString;
+(NSString *) getDeviceUDID;
+(NSString *) getUserAgent;
+(BOOL) isPad;
+(NSString *) getOSVersion;
+(NSString *) getDeviceModel;
+(NSString *) getIMEI;
+(NSString *) getMacAdress;
+(NSString *) getMSISDN;
+ (float)getSystemVersion;

@end
