# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-19

### Added
- Initial project setup with Express.js
- Basic webhook endpoint structure
- Discord webhook integration capability
- EspoCRM webhook receiver
- Security middleware (helmet, cors)
- Logging system with Winston
- Environment variable configuration
- Error handling middleware

### Dependencies
- express: ^4.18.2
- cors: ^2.8.5
- dotenv: ^16.3.1
- helmet: ^7.1.0
- morgan: ^1.10.0
- axios: ^1.6.2
- body-parser: ^1.20.2
- winston: ^3.11.0
- nodemon: ^3.0.2 (dev dependency) 