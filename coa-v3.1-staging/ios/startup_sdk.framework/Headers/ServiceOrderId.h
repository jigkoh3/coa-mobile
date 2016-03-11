//
//  ServiceOrderId.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/3/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Service.h"
#import "ResponseStatus.h"
#import "OrderIDResponseData.h"


@protocol DelegateServiceOrderId <NSObject>

- (void) callbackServiceOrderIdSuccessed:(OrderIDResponseData *)orderIDData;
- (void) callbackServiceOrderIdError:(ResponseStatus *)status;

@end

@interface ServiceOrderId : Service

@property (nonatomic, strong) id<DelegateServiceOrderId> delegateServiceOrderId;

-(void)sendRequest;

@end
