"use strict";

const twilio = require("twilio");
const accountSid = "AC5beb281960316b4faf34e9a961b9b318";
const authToken = "cffee6ce1687645b5c48039f649229b5";
// @ts-ignore
const client = new twilio(accountSid, authToken);

module.exports = {
  async sendOTP(ctx) {
    const { phoneNumber } = ctx.request.body;
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 6-digit OTP
    try {
      await client.messages.create({
        body: `Your OTP for registration is: ${otp}`,
        to: phoneNumber,
        from: +15308533930,
      });

      // Store OTP in your database or session
      const entry = await strapi.entityService.create("api::code.code", {
        data: { phoneNumber, code: otp },
      });

      setTimeout(() => { 
        strapi.entityService.delete("api::code.code", entry.id);
      }, 60000);

      // const phoneNumberExists = await strapi.entityService.findMany('plugin::users-permissions.user', {
      //   filters: { phoneNumber: phoneNumber }
      // });
       
      // if(phoneNumberExists.length > 0) {
      //   ctx.throw(400, "Phone number already exists");
      // }

      ctx.send({ otp });
    } catch (error) {
      console.log(error)
      ctx.throw(500,error, "Error sending OTP");
    }
  },

  async ValidateOTP(ctx) {
    const { enteredOTP, phoneNumber } = ctx.request.body;
  
    try {
      // Fetch the stored OTP from the database based on phone number
      const codeEntry = await strapi.entityService.findMany('api::code.code', {
        filters: { phoneNumber: phoneNumber },
        limit: 1,
      });
  
      if (!codeEntry || codeEntry.length === 0) {
        ctx.throw(400, "Invalid Phone Number");
      }
  
      const { code: storedOTP } = codeEntry[0];
  
      // Delete the OTP entry after fetching it
      await strapi.entityService.delete("api::code.code", codeEntry[0].id);
  
      if (enteredOTP == storedOTP) {
        const users = await strapi.entityService.findMany("plugin::users-permissions.user", {
          filters: { phoneNumber: phoneNumber },
          limit: 1,
          populate:["face","detail","id_card","role"]
        });
  
        if (users.length > 0) {
          // Remove the password field manually
          const user = users[0];
          delete user.password;
  
          ctx.send({ user });
        } else {
          ctx.send({ message: "OTP is valid, but no user found" });
        }
      } else {
        ctx.throw(400, "Invalid OTP");
      }
    } catch (error) {
      ctx.throw(500, "Internal Server Error");
    }
  }
  
  };
  

