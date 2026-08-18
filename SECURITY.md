# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Measures

- **JWT Authentication**: User endpoints are protected via signed JSON Web Tokens with 7-day expiration.
- **Password Protection**: Passwords are encrypted with salt rounds using `bcryptjs` before storage in MongoDB.
- **Password Leak Prevention**: Password hashes are stripped before serialization in all API responses.
- **Sanitized Media Uploads**: Image payloads are uploaded to Cloudinary CDN with authenticated access tokens.

## Reporting a Vulnerability

If you discover a security vulnerability within **Akash-Varta**, please do not open a public issue. Instead, report it directly to the repository maintainer via GitHub issues with private details or email `akashdasdhibar1@gmail.com`.

