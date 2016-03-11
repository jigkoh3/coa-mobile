//
//  ServiceClickAd.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 11/4/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RequestService.h"



@protocol ServiceClickAdsDelegate <NSObject>

- (void)serviceClickAdSuccess;
- (void)serviceClickAdError:(ResponseStatus *)status;

@end


@interface ServiceClickAds : RequestService


@property (assign)id<ServiceClickAdsDelegate> delegate;
@property (nonatomic, strong)NSString *clickURL;
- (void)fungusRequest;


@end
