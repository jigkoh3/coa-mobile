//
//  ConnectResponse.h
//  FungusApp
//
//  Created by Vasin Charoensuk on 11/19/55 BE.
//  Copyright (c) 2555 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "ConnectRequest.h"

@interface ConnectResponse : NSObject
{
    ConnectRequest *request;
    NSDictionary *responseHeader;
    //NSString *responseData;
    NSMutableData *responseData;
    NSURLConnection *connection;
}

@property (nonatomic, retain) ConnectRequest *request;
@property (nonatomic, retain) NSDictionary *responseHeader;
//@property (nonatomic, retain) NSString *responseData;
@property (nonatomic, retain) NSMutableData *responseData;

@end
