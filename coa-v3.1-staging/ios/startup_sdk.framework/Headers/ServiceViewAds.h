//
//  ServiceAdsRequest.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 11/4/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RequestService.h"


@protocol ServiceViewAdsDelegate <NSObject>

- (void)serviceViewAdsSuccess:(id)serviceAds;
- (void)serviceViewAdsError:(ResponseStatus *)status;

@end

@interface ServiceViewAds : RequestService

@property (assign)id<ServiceViewAdsDelegate> delegate;


@property (nonatomic, strong) NSString *uid; //A unique user identifier. Mandatory for Mediation requests.
@property (nonatomic, strong) NSString *kw;
@property (nonatomic, strong) NSString *nk;
@property (nonatomic, strong) NSString *ts;
@property (nonatomic, strong) NSString *acc;
@property (nonatomic, strong) NSString *adSpace;
@property (nonatomic) NSInteger *adw; //Width of the available space for the ad. (Need to send when size of Ad Request is not a standard)
@property (nonatomic) NSInteger *adh; //Height of the available space for the ad. (Need ￼to send when size of Ad Request is not a standard)

- (void)setParameterWithAdSpace:(NSString *)adSpace;

- (void)fungusRequest;
- (void)showAds:(UIView *)adsView;
@end
