//
//  ServiceAuthenticate.h
//  FungusApp
//
//  Created by Vasin Charoensuk on 11/19/55 BE.
//  Copyright (c) 2555 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ConnectionProcess.h"
#import "ServiceKeyExchange.h"
#import "ServiceOrderId.h"
#import "ResponseStatus.h"
#import "Service.h"

@protocol DelegateServiceAuthenticate <NSObject>

-(void)callbackServiceAuthenSuccess;
-(void)callbackServiceAuthenError:(ResponseStatus *)status;

@end

@interface ServiceAuthenticate : Service <DelegateServiceKeyExchange, DelegateServiceOrderId>


@property (nonatomic, strong) id<DelegateServiceAuthenticate> delegateServiceAuthenticate;

-(void)fungusRequest;

@end
