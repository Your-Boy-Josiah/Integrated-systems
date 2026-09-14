# Integrated SellSwift API: Secure Relational Architecture

A production-grade backend microservice that fuses cryptographic identity verification (JWT) with NoSQL relational data modeling (Mongoose Population).

## Architectural Overview
- **Autonomous Resource Mapping:** The API strips trust from the client layer. Instead of accepting resource ownership claims via HTTP bodies, the backend autonomously extracts the user's `ObjectId` from their verified Bearer token and assigns it as a Foreign Key during document creation.
- **Stateless Authorization:** Employs dual-guard middleware to verify token signatures and hydrate the request lifecycle with secure, sanitized user profiles.
- **Relational Joins:** Utilizes Mongoose `.populate()` to dynamically merge parent `User` profiles into child `Product` queries, delivering optimized, single-request payloads to the frontend.

## Tech Stack
- **Database:** MongoDB, Mongoose
- **Backend:** Node.js, Express
- **Security:** bcryptjs, JSON Web Tokens (JWT)
