import 'dotenv/config';

/// @dev Validate required environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error(
    'Please make sure you have a MONGO_URI and JWT_SECRET in your .env file'
  );
}

export const config = {
  /**
   * @notice Database configuration
   */
  MONGO_URI: process.env.MONGO_URI!,

  /**
   * @notice Server configuration
   * @dev This is the port that the server will be running on
   */
  PORT: process.env.PORT,

  /**
   * @notice JWT configuration
   * @dev This is the secret key that will be used to sign the JWT
   */
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXPIRES_IN: 3600000 * 24 * 7, // 7 days
};
