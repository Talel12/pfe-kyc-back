module.exports = {
  routes: [
    {
      method: "POST",
      path: "/send-sms",
      handler: "otp.sendOTP",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/verify-code",
      handler: "otp.ValidateOTP",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
