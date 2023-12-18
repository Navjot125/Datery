import HTTP from "./http";

class APIList {
    constructor() {}

    createAccount(params) {
        return HTTP.POST("create_account", params);
    }
    createTrainerAccount(params) {
        return HTTP.POST3("create_account", params);
    }
    mobileVerify(params) {
        return HTTP.POST("mobile_vatification", params);
    }
    setMobileNumber(params) {
        return HTTP.POST("set_mobile_number", params);
    }
    login(params) {
        return HTTP.POST("login", params);
    }
    getUser(params) {
        return HTTP.POST("get_user", params);
    }
    getUserDetails(params) {
        return HTTP.POST("user_profile", params);
    }
    logout(params) {
        return HTTP.POST("logout", params);
    }
    resendOtp(params) {
        return HTTP.POST("set_mobile_number", params);
    }
    forgotPassword(params) {
        return HTTP.POST("forgot_password", params);
    }
    forgotPasswordOTPVerify(params) {
        return HTTP.POST("forgot_otp_verification", params);
    }
    resendForgotPasswordOTP(params) {
        return HTTP.POST("resendForgotPasswordOTP", params);
    }
    setNewPassword(params) {
        return HTTP.POST("setNewPassword", params);
    }

    subscriptionList(params) {
        return HTTP.POST2("subscription_list", params);
    }
    subscriptionPackages(params) {
        return HTTP.POST2("subscription_packages", params);
    }
    createUserSubscription(params) {
        return HTTP.POST("create_subscription", params);
    }
    userSubscription(params) {
        return HTTP.POST("user_subscriptions", params);
    }
    currentSubscription(params) {
        return HTTP.POST("current_subscription", params);
    }

    trainerList(params) {
        return HTTP.POST("trainer_list", params);
    }
    contactUs(params) {
        return HTTP.POST("user_contact_us", params);
    }

    userHome(params) {
        return HTTP.POST("user_home", params);
    }
    sports(params) {
        return HTTP.POST("sports", params);
    }

    userFollow(params) {
        return HTTP.POST("user_follow", params);
    }

    getNotificationSettings() {
        return HTTP.GET("get_notification_setting");
    }
    updateNotificationSettings(params) {
        return HTTP.POST("update_notification_setting", params);
    }

    getTrainerProfile(params) {
        return HTTP.POST("trainer_profile", params);
    }

    getSetting(params) {
        return HTTP.POST("settings", params);
    }

    getFollowersList(params) {
        return HTTP.POST("followers_list", params);
    }
    getFollowingsList(params) {
        return HTTP.POST("following_list", params);
    }

    updateProfileImage(params) {
        return HTTP.POST("update_profile_image", params);
    }
    updateProfile(params) {
        return HTTP.POST("updateProfile", params);
    }

    setSuitableTime(params) {
        return HTTP.POST("set_suitable_time", params);
    }
    findTrainer(params) {
        return HTTP.POST("find_trainer", params);
    }
    trainerPrograms(params) {
        return HTTP.POST("trainer_programs", params);
    }
    bookTrainer(params) {
        return HTTP.POST("book_trainer", params);
    }

    getBooking(params) {
        return HTTP.POST("get_booking", params);
    }
    approveBooking(params) {
        return HTTP.POST("approve_booking", params);
    }
    cancelBooking(params) {
        return HTTP.POST("cancel_booking", params);
    }
    trainerHome(params) {
        return HTTP.POST("trainer_home", params);
    }
    cancelSubscription(params) {
        return HTTP.POST("cancel_subscription", params);
    }
    discountCouponList(params) {
        return HTTP.POST("coupons", params);
    }
    discountCouponCheck(params) {
        return HTTP.POST("check_coupon", params);
    }
    lessonCompleted(params) {
        return HTTP.POST("lesson_completed", params);
    }
    transactionHistory(params) {
        return HTTP.POST("transaction_history", params);
    }
    getBankDetail(params) {
        return HTTP.POST("get_bank_detail", params);
    }
    withdrawRequest(params) {
        return HTTP.POST("withdraw_request", params);
    }
    addBankDetail(params) {
        return HTTP.POST("add_bank_detail", params);
    }
}

export default new APIList();
