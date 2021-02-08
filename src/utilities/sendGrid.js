import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let hostURL = "https://know-africa.herokuapp.com";
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  hostURL = `http://localhost:${process.env.PORT || 3000}`;
}

const msg = {
  from: `Green Lamp <${process.env.SENDGRID_EMAIL}>`,
  mail_settings: {
    sandbox_mode: {
      enable: false
    }
  }
};

/**

 */
export default class {
  // eslint-disable-next-line valid-jsdoc
  /**
   *
   */
  static sandboxMode() {
    msg.mail_settings.sandbox_mode.enable = true;
  }

  /**
   * @param {string} email - The user's email
   * @param {string} User - The User's username
   * @param {string} fillroute - Specifies route for verification
   * @returns {object} Verification message
   */
  static async sendVerificationEmail(email, User, fillroute) {
    const link1 = `${hostURL}/api/v1/${fillroute}/verify/${email}`;
    msg.to = email;
    msg.subject = "Welcome to Green Lamp! Confirm Your Email";
    msg.html = `<div style ="background-color: rgb(227, 223, 222); width:100%">
    <div style= "display: flex; padding-top: 50px; ">
      <div style= "line-height: 1.6; margin: auto; text-align: left; width: 50%; padding-top: 50px; background-color: white; margin-bottom:20px;">
      <div><p style ="text-align: center; font-size: 40px; margin: auto; width: 70%; padding-bottom:50px">Welcome to Greenlamp!</p></div>
      <p style="margin: 10px">Dear <strong>${User}</strong>,</p> 
      <div style="margin: 10px">
          <p>Thank you for joining Green Lamp. We look forward to sharing the many beauties with you! <br> Please click the button below to confirm you own this email address</p>
        </div>
            <a href="${link1}" style ="text-decoration:none; padding:5px 15px;color:white;background-color:rgb(75,203,250);font-weight:bold; border-radius:30px;
            margin: 18px; width:40%;">Verify Me</a>
            <p style = "font-variant: small-caps; opacity: 0.5; margin: 10px;">Regards, Green Lamp Team!</p>
          </div>
      </div>
  </div>`;
    try {
      await sgMail.send(msg);
    } catch (err) {
      return err;
    }
  }
  /**
   *
   * @typedef {(number|string)} uuid
   */

  /**
   * @param {string} email - The user email
   * @param {uuid} id - The user ID
   * @param {object} res - The reset response object
   * @returns {object} Success message
   */
  static async sendResetPasswordEmail(email, id, res) {
    const link = `${hostURL}/api/v1/users/reset/${id}`;
    msg.to = email;
    msg.subject = "Password change request email";
    msg.html = `<strong>Please click the following link to reset your password: </strong> <a href="${link}" style ="text-decoration: none; padding: 5px 7px; color: black; background-color: rgb(103, 238, 114); border-radius: 3px; font-weight: bold;">RESET PASSWORD</a>`;
    try {
      await sgMail.send(msg);
    } catch (err) {
      return err.message;
    }
  }
}
