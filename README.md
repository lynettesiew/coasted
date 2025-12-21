# Coasted

**Stop losing credit score points to bad timing.**

Coasted is a credit utilization optimizer that tells you exactly how much to pay and when—so your score reflects your actual financial habits, not reporting quirks.

---

## The Problem

Most people lose credit score points not because they can't pay their bills, but because they don't understand *when* their balance gets reported.

Credit utilization (how much of your available credit you're using) makes up **30% of your credit score**—the second biggest factor. But here's what most people don't know:

- Your utilization is reported on your **statement closing date**, not your due date
- If you have a $10,000 limit and $4,700 balance when your statement closes, you're at 47% utilization—even if you pay it off the next day
- With multiple cards, each with different closing dates, optimizing this manually is a nightmare

**Coasted solves this.** We track your balances, know your statement dates, and tell you the exact amount to pay and when to pay it for optimal utilization.

---

## How It Works

1. **Connect your cards** — Via Plaid (auto-sync) or manual entry (free)
2. **See your utilization** — Dashboard shows current and projected utilization per card
3. **Get recommendations** — "Pay $1,200 on Chase by Dec 23 to drop from 47% to 20%"
4. **Set reminders** — Push, SMS, or email notifications at the right time
5. **Build streaks** — Gamification keeps you consistent

---

## Features

### Core (Free Tier)
- Manual card entry (up to 3 cards)
- Utilization dashboard with per-card breakdown
- Payment recommendations with specific amounts and dates
- Basic reminders (email)
- Streak tracking

### Pro ($8/month)
- Unlimited cards
- Plaid integration (auto-sync balances and statement dates)
- SMS and push notifications
- Historical utilization tracking
- Score impact projections
- Priority support

### Future Roadmap
- Spending insights and category breakdowns
- Peer benchmarking ("How do you compare to others your age?")
- Savings goal tracking
- Retirement projections
- AI-powered financial coaching

---

## Technical Architecture

### Data Sources

**Plaid API Endpoints:**

| Data | Endpoint | Field |
|------|----------|-------|
| Current balance | `/accounts/balance/get` | `balances.current` |
| Credit limit | `/accounts/balance/get` | `balances.limit` |
| Statement closing date | `/liabilities/get` | `last_statement_issue_date` |
| Payment due date | `/liabilities/get` | `next_payment_due_date` |

**Manual Entry:**
Users input card nickname, credit limit, current balance, statement closing day (1-31), and payment due day (1-31).

### Core Logic

```javascript
// Calculate utilization
const utilization = (currentBalance / creditLimit) * 100;

// Determine optimal payment
const targetUtilization = 0.20; // 20% is optimal
const targetBalance = creditLimit * targetUtilization;
const paymentNeeded = Math.max(0, currentBalance - targetBalance);

// Calculate next statement close from last statement date
const lastClose = new Date(card.last_statement_issue_date);
const nextClose = new Date(lastClose.setMonth(lastClose.getMonth() + 1));

// Reminder timing: 3 days before statement close
const reminderDate = new Date(nextClose.setDate(nextClose.getDate() - 3));
```

### Tech Stack

**Frontend:**
- React (or vanilla JS for MVP)
- Tailwind CSS
- Fraunces + DM Sans typography

**Backend:**
- Node.js / Express (or Python / FastAPI)
- PostgreSQL for user data
- Redis for session management

**Integrations:**
- Plaid for bank connections
- Twilio for SMS reminders
- SendGrid for email notifications
- Stripe for subscription billing

**Infrastructure:**
- Vercel or Railway for hosting
- Supabase as backend-as-a-service alternative

---

## User Journey

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  Landing    │────▶│  Onboarding     │────▶│  Dashboard       │
│  Page       │     │  (Add Cards)    │     │  (See Util.)     │
└─────────────┘     └─────────────────┘     └────────┬─────────┘
                                                     │
                           ┌─────────────────────────┘
                           ▼
┌─────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  Streak     │◀────│  App Confirms   │◀────│  User Pays       │
│  Continues  │     │  Payment Made   │     │  (At Bank)       │
└─────────────┘     └─────────────────┘     └──────────────────┘
                           ▲
                           │
                    ┌──────┴───────┐
                    │   Reminder   │
                    │   Fires      │
                    └──────────────┘
```

---

## Target User

**Primary persona:** Credit-conscious optimizers

- Manage 3-6 credit cards
- Pay their bills on time (no delinquency issues)
- Care about their credit score but don't fully understand utilization timing
- Likely pursuing credit card rewards/churning or preparing for a major purchase (mortgage, car loan)

**Not our user (yet):**
- People rebuilding credit from collections or delinquencies
- People with only 1 card and simple finances
- People who don't care about credit optimization

---

## Monetization

| Revenue Stream | Description | Timeline |
|----------------|-------------|----------|
| Freemium subscriptions | $8/month Pro tier | Launch |
| Credit card affiliates | Recommend cards based on spending patterns | Month 3+ |
| HYSA referrals | High-yield savings for payment float | Month 6+ |
| B2B licensing | White-label to credit unions/neobanks | Year 2+ |

---

## Competitive Landscape

| Product | What They Do | Our Differentiation |
|---------|--------------|---------------------|
| Credit Karma | Score monitoring, generic tips | We give *specific* payment amounts and dates |
| NerdWallet | Score + product recommendations | We're action-oriented, not content-oriented |
| Mint | Budgeting + score overview | We focus solely on utilization optimization |
| Self | Credit building | We're for optimizers, not builders |

**Our wedge:** No one else tells you "pay $1,247 by December 23rd." We do the math.

---

## Getting Started (Development)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Plaid developer account (for Pro features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/coasted.git
cd coasted

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Plaid keys, database URL, etc.

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

---

## Waitlist & Validation

**Waitlist signup question:** "How many credit cards do you currently manage?"

**Segmentation follow-up:** "What's most frustrating about keeping your utilization low?"
- I don't know when my balances get reported
- I pay everything off but my score doesn't reflect it
- Tracking multiple due dates and statement dates is exhausting
- I'm not sure how much to pay and when

This qualifies users who actually have the problem we solve.

---

## Milestones

- [ ] Landing page live with waitlist
- [ ] Manual card entry MVP
- [ ] Email reminder system
- [ ] Plaid integration (Pro tier)
- [ ] SMS notifications
- [ ] Streak/gamification system
- [ ] Historical tracking dashboard
- [ ] Mobile app (React Native)

---

## Contributing

This is currently a solo project.

---

---

**Built by Lynette Siew** — because credit scores shouldn't be a mystery.
