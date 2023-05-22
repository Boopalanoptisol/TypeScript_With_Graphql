import bcrypt from 'bcrypt';

import twilio from 'twilio';

interface User {
  id: string;
  mobileNumber: string;
  otp: string | null;
}

interface LoginArgs {
  mobileNumber: string;
  otp: string;
}

interface SignupArgs {
  mobileNumber: string;
}

const twilioClient = twilio('YOUR_TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;



class AuthService {
  public users: User[];

  constructor() {
    this.users = [
      {
        id: '1',
        mobileNumber: '+917904010308',
        otp: null,
      },
    ];
  }

  private generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  private verifyOTP(otp: string, storedOTP: string): boolean {
    return otp === storedOTP;
  }

  public login({ mobileNumber, otp }: LoginArgs): string {
    const user = this.users.find((user) => user.mobileNumber === mobileNumber);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.otp) {
      throw new Error('OTP not generated');
    }

    const isOtpValid = this.verifyOTP(otp, user.otp);

    if (!isOtpValid) {
      throw new Error('Invalid OTP');
    }

    // Generate and return a token for authenticated user
    return 'TOKEN';
  }

  public signup({ mobileNumber }: SignupArgs): boolean {
    const userExists = this.users.some((user) => user.mobileNumber === mobileNumber);

    if (userExists) {
      throw new Error('User already exists');
    }

    const otp = this.generateOTP();
    const hashedOtp = bcrypt.hashSync(otp, 10);

    this.users.push({
      id: String(this.users.length + 1),
      mobileNumber,
      otp: hashedOtp,
    });

    // Send OTP via SMS
    twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioPhoneNumber,
      to: mobileNumber,
    });

    return true;
  }
}

export const authService = new AuthService();
