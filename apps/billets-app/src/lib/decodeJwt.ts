// Import the jwt-decode library
import {jwtDecode} from 'jwt-decode';

// Define the structure of the decoded JWT payload (optional)
interface JwtPayload {
  sub: string; // Subject (user identifier)
  name: string; // Name of the user
  email: string; // Email of the user
  exp: number; // Expiration time
  [key: string]: any; // Any other properties
}

// Function to parse JWT token
const decodeJwt = (token: string): JwtPayload | null => {
  try {
    // Decode the token
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export default decodeJwt;
