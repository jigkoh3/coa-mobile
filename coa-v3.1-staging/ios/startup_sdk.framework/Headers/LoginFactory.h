//
//  LoginFactory.h
//  TestFungus2
//
//  Created by Pluem Limrattanakan on 3/11/56 BE.
//  Copyright (c) 2556 Pluem Limrattanakan. All rights reserved.
//

#import <Foundation/Foundation.h>



@interface LoginFactory : NSObject

+ (id)initWithType:(NSString *)loginType;
@end
