import passport from "passport";
import { Request } from "express";
import appConfig from "./app.config";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { NotFoundException } from "../utils/appError";
import { ProviderEnum } from "../enums/account-provider.enum";
import { loginOrCreateAccountService } from "../services/auth.service";

passport.use(
  new GoogleStrategy(
    {
      clientID: appConfig.GOOGLE_CLIENT_ID,
      clientSecret: appConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: appConfig.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (req: Request, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub: googleId, picture } = profile._json;

        console.log("Google Profile:", profile);
        console.log("Google ID:", googleId);

        if (!googleId) {
          throw new NotFoundException("Google ID (sub) not found in profile");
        }

        const { user } = await loginOrCreateAccountService({
          provider: ProviderEnum.GOOGLE,
          displayName: profile.displayName,
          providerId: googleId,
          picture,
          email,
        });

        done(null, user);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user));

passport.deserializeUser((user: any, done) => done(null, user));
