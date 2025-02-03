"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleEnum = exports.FoodOrderStatusEnum = void 0;
var FoodOrderStatusEnum;
(function (FoodOrderStatusEnum) {
    FoodOrderStatusEnum["PENDING"] = "PENDING";
    FoodOrderStatusEnum["CANCELED"] = "CANCELED";
    FoodOrderStatusEnum["DELIVERED"] = "DELIVERED";
})(FoodOrderStatusEnum || (exports.FoodOrderStatusEnum = FoodOrderStatusEnum = {}));
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["USER"] = "USER";
    UserRoleEnum["ADMIN"] = "ADMIN";
})(UserRoleEnum || (exports.UserRoleEnum = UserRoleEnum = {}));
