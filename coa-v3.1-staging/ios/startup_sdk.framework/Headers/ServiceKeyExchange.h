//
//  ServiceKeyExchange.h
//  FungusLibrary
//
//  Created by Vasin Charoensuk on 11/28/55 BE.
//  Copyright (c) 2555 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ConnectionProcess.h"
#import "tommath.h"
#import "ResponseStatus.h"
#import "Service.h"

@protocol DelegateServiceKeyExchange <NSObject>

- (void) callbackServiceKeyExchangeSuccessed;
- (void) callbackServiceKeyExchangeError:(ResponseStatus *)status;

@end

@interface ServiceKeyExchange : Service


@property (nonatomic, assign) id<DelegateServiceKeyExchange> delegateServiceKeyExchange;

-(void)sendRequest;

@end
