# espocrm-discord
A simple Express-based webhook service that receives EspoCRM events and forwards them to Discord.

## Features
- Modular webhook endpoints for all EspoCRM entities (Lead, Opportunity, Account, Call, Campaign, Case, Contact, Document, Meeting, Target List, Task, User)
- Sends formatted Discord embeds for create, update, and delete events
- Entity-specific Discord webhook support
- Flexible validation and robust error handling
- Test script and sample payloads for easy verification

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd espocrm-discord
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` and fill in your Discord webhook URLs:
```bash
cp .env.example .env
```
Edit `.env` and set the webhook URLs for each entity. You can also set `TEST_DISCORD_WEBHOOK_URL` to override all webhooks for testing.

### 4. Run the server
```bash
npm start
```
The server will start on the port specified in your `.env` (default: 3000).

### 5. Testing webhooks
A test script is provided to send sample EspoCRM webhook payloads to your local server and verify Discord notifications:
```bash
node src/test/sendSamples.js
```
This script uses the `TEST_DISCORD_WEBHOOK_URL` if set, so all test notifications go to a single Discord channel.

#### How to Test Using Test Files
- **Test Script**: The `src/test/sendSamples.js` script sends sample payloads for all entities and event types (create, update, delete) to your local server.
- **Sample Payloads**: The sample payloads are defined in `src/test/webhookSamples.js`. You can modify these payloads to test different scenarios.
- **Verification**: After running the test script, check your Discord channel for the formatted embeds. If `TEST_DISCORD_WEBHOOK_URL` is set, all notifications will be sent to that channel.

## Project Structure
- `src/handlers/` - Entity-specific webhook handlers
- `src/routes/` - Express routes for each entity
- `src/utils/` - Validation, logging, and utility functions
- `src/test/` - Test script and sample webhook payloads

## License
MIT
