//
//  ServicePrivilege.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/9/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import "RequestService.h"

#import <Foundation/Foundation.h>
#import "ConnectionProcess.h"
#import "PrivilegeResponseData.h"
#import "ServiceOrderId.h"
#import "ServiceAuthenticate.h"


//Service Type
#define SERVICE_ALL @"All"
#define SERVICE_AIS_PLUS @"AIS Plus"
//Language
#define LANGUAGE_TH @"TH"
#define LANGUAGE_EN @"EN"
//Sort by
#define SORT_BY_RADIUS @"radius"
#define SORT_BY_BUSINESS_NAME @"businessname"
#define SORT_BY_BRANCH @"branch"
#define SORT_BY_STREET_NAME @"streetname"
#define SORT_BY_BUILDING_NAME @"buildingname"
#define SORT_BY_DISTRICT @"district"
#define SORT_BY_SUBDISTRICT @"subdistrict"
#define SORT_BY_PROVINCE @"province"
#define SORT_BY_COUNTRY @"country"
#define SORT_BY_PRIVILEGE_NAME @"privilegename"
#define SORT_BY_PRIVILEGE_CATEGORY @"privilegecategory"
#define SORT_BY_PRIVILEGE_DESCRIPTION @"privilegedescription"
#define SORT_BY_PRIVILEGE_CODE @"privilegecode"
//Sort Type
#define SORT_ORDER_ASC = "ASC"
#define SORT_ORDER_DESC = "DESC"

@protocol DelegateServicePrivilege <NSObject>

- (void) callbackServicePrivilegeSuccessed:(PrivilegeResponseData *)response;
- (void) callbackServicePrivilegeError:(ResponseStatus *)status;

@end

@interface ServicePrivilege : RequestService
{
    ResponseStatus *responseStatus;
    
    //Request Mandatory
    NSString *_language;
    NSString *_serviceType;
    int _pageRequest;
    //Request Optional
    int _radius;
    double _currentLatitude;
    double _currentLongitude;
    int _resultPerPage;
    NSString *_sortBy;
    NSString *_sortOrder;
    NSString *_validationDateTime; //Format "YYYYMMDDHHMMSS"
    NSString *_businessName;
    NSString *_streetName;
    NSString *_buildingName;
    NSString *_district;
    NSString *_subdistrict;
    NSString *_province;
    NSString *_country;
}

@property (nonatomic, assign) id<DelegateServicePrivilege> delegateServicePrivilege;

-(void)fungusRequest;

-(void) setParameterWith:(NSString *)language serviceType:(NSString *)service andPageRequest:(int)pageRequest;
-(void) setRadius:(int)raduis;
-(void) setLatitude:(double)latitude andLongitude:(double)longitude;
-(void) setResultPerPage:(int) resultPerPage;
-(void) setSortBy:(NSString *)sortBy;
-(void) setSortBy:(NSString *)sortBy andSortOrder:(NSString *)sortOrder;
-(void) setValidationDateTime:(double) time;
-(void) setBusinessName:(NSString *)businessName;
-(void) setStreetName:(NSString *)streetName;
-(void) setBuildingName:(NSString *)buildingName;
-(void) setDistrict:(NSString *)district;
-(void) setSubdistrict:(NSString *)subdistrict;
-(void) setProvince:(NSString *)province;
-(void) setCountry:(NSString *)country;

@end