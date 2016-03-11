//
//  PoiItem.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/11/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PrivilegeData.h"

@interface PoiItem : NSObject
{
    NSString *poiId;
    NSString *latitude;
    NSString *longitude;
    NSString *bizName;
    NSString *branch;
    NSString *address;
    NSString *buildingName;
    NSString *flr;
    NSString *soi;
    NSString *street;
    NSString *subdistrictName;
    NSString *districtName;
    NSString *provinceName;
    NSString *region;
    NSString *postCode;
    NSString *url;
    NSString *country;
    NSString *telephone;
    PrivilegeData *privilege;
}

-(NSString *)getId;
-(NSString *)getLatitude;
-(NSString *)getLongitude;
-(NSString *)getBizName;
-(NSString *)getBranch;
-(NSString *)getAddress;
-(NSString *)getBuildingName;
-(NSString *)getFloor;
-(NSString *)getSoi;
-(NSString *)getStreet;
-(NSString *)getSubdistrictName;
-(NSString *)getDistrictName;
-(NSString *)getProvinceName;
-(NSString *)getRegion;
-(NSString *)getPostCode;
-(NSString *)getUrl;
-(NSString *)getCountry;
-(NSString *)getTelephone;
-(PrivilegeData *)getPrivilege;

-(void) setPoiItem:(NSDictionary *)dict;
@end
