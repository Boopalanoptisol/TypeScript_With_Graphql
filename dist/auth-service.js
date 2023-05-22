"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const twilio_1 = __importDefault(require("twilio"));
const twilioClient = (0, twilio_1.default)('ACce9c9b6c3f47dfffb275ba4a2798670e', '18698ece49a4fa5670e70a71db85b6e2');
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
class AuthService {
    constructor() {
        this.users = [
            {
                id: '1',
                mobileNumber: '+917904010308',
                otp: null,
            },
        ];
    }
    generateOTP() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    verifyOTP(otp, storedOTP) {
        return otp === storedOTP;
    }
    login({ mobileNumber, otp }) {
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
    signup({ mobileNumber }) {
        const userExists = this.users.some((user) => user.mobileNumber === mobileNumber);
        if (userExists) {
            throw new Error('User already exists');
        }
        const otp = this.generateOTP();
        const hashedOtp = bcrypt_1.default.hashSync(otp, 10);
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
exports.authService = new AuthService();
