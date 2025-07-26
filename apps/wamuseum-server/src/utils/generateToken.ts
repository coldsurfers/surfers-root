import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import type { FstvlLifeJwtPayload } from '../types';

dotenv.config();

const { WAMUSEUM_SERVER_JWT_SECRET: secret } = process.env;

export function generateToken(payload: FstvlLifeJwtPayload) {
  if (!secret) {
    throw new Error('no secret');
  }
  return jwt.sign(payload, secret);
}
