//
//  ConnectServer.h
//  FungusApp
//
//  Created by Vasin Charoensuk on 11/19/55 BE.
//  Copyright (c) 2555 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "FungusConfiguration.h"
#import "ConnectResponse.h"
#import "ConnectRequest.h"

//@class ConnectResponse;
@protocol ConnectServerDelegate <NSObject>

- (void) connectionDidStart : (ConnectRequest *) request;
- (void) connectionDidMakeProgress : (ConnectRequest *) request;
- (void) connectionDidFail : (ConnectResponse *) response;
- (void) connectionDidFinish : (ConnectResponse *) response;

@end

@interface ConnectServer : NSObject
{
    id delegate;
    ConnectRequest *connRequest;
    ConnectResponse *connResponse;
    NSURLConnection *requestConnection;
    NSMutableData *respondData;
}

@property (nonatomic, assign) id<ConnectServerDelegate> delegate;
@property (nonatomic, retain) ConnectRequest *connRequest;
@property (nonatomic, retain) ConnectResponse *connResponse;
@property (nonatomic, retain) NSURLConnection *currentConnection;

- (void) httpRequest:(NSString *) serviceName withXMLString:(NSData *) xmlString;
- (void) cancelRequest;

@end
