import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import fastifyJWT from '@fastify/jwt';
import dotenv from 'dotenv';
import fp from 'fastify-plugin';

dotenv.config();

const jwtSecret = process.env.BILLETS_SERVER_JWT_SECRET ?? '';

// Creating a reusable plugin
export const jwtPlugin = fp(async (fastify) => {
  fastify.register(fastifyJWT, {
    secret: jwtSecret, // Replace with a strong secret key
  });

  // Add a custom decorator for authentication
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify(); // Verifies the JWT token
    } catch (err) {
      console.error(err);
      return reply
        .status(401)
        .send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' } as ErrorResponseDTO);
    }
  });
});
