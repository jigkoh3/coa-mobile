//
//  RequestService.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 9/2/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ResponseStatus.h"
#import "ConnectionProcess.h"
#import "ServiceOrderId.h"
#import "FungusParameter.h"
#import "FungusConfiguration.h"
#import "FungusService.h"
#import "FungusSecurity.h"
#import "FungusDebugger.h"
#import "FungusError.h"



//RequestService
#define SERVICE_AUTHENTICATE @"Authenticate"
#define SERVICE_REQUEST_ORDERID @"RequestOrderID"


@interface RequestService : NSObject <ConnectProcessDelegate, DelegateServiceOrderId>
{
    NSString *serviceName, *requestService;
    ConnectionProcess *connection;
    ServiceOrderId *serviceOrderId;
}

@property (nonatomic, strong)NSString *orderID;
@property (nonatomic, strong)NSString *orderRef;

- (void)callbackServiceSuccessed;
- (void)callbackServiceError:(ResponseStatus *)status;
- (void)requestAuthentication;
- (void)requestOrderID;


@end
