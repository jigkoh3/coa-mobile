//
//  ConnectRequest.h
//  FungusLibrary
//
//  Created by Vasin Charoensuk on 11/20/55 BE.
//  Copyright (c) 2555 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ConnectRequest : NSObject
{
    //  @private
    NSURL *serviceURL;
    NSString *serviceName;
    NSDate *timeStamp;
    NSDictionary *params;
    NSString *xmlString;
}

@property (nonatomic, retain) NSURL *serviceURL;
@property (nonatomic, retain) NSString *serviceName;
@property (nonatomic, retain) NSDate *timeStamp;
@property (nonatomic, retain) NSDictionary *params;
@property (nonatomic, retain) NSString *xmlString;

@end
