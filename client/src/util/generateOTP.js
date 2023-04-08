//export const Otp = Math.floor(Math.random() * 9000) + 1000 || null ;

export function generateOTP() {
    // Generate a random 4-digit number between 1000 and 9999
    const otp = Math.floor(Math.random() * 9000) + 1000;
    return otp;
  }