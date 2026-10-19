# Suite AI 🚀

An AI-assisted workspace for independent professionals and teams. ScopeSnap turns client briefs into structured project scopes and USD estimates; FeedbackDigest organizes customer comments into reviewable product insights. AI output is guidance and should be checked by a person.

## 🛠️ Included Tools

### 1. ScopeSnap 📊
Transforms vague, messy client briefs or call notes into solid, structured commercial proposals.
- **Scope Extraction:** Automatically extracts core deliverables, logical assumptions, and explicit exclusions.
- **Financial Analytics:** Computes total estimated development hours with an automatic safety contingency margin, multiplied by the developer's hourly rate to output a structured budget in USD.
- **Risk Mitigation:** Detects early contract risks and generates prioritized clarifying questions to send to the client.

### 2. FeedbackDigest 📈
Processes bulk text, reviews, or unstructured raw user feedback to streamline data-driven product decisions.
- **Sentiment Distribution:** Accurately classifies and displays user satisfaction percentages (Positive, Neutral, Negative) using strict server-side arithmetic adjustments.
- **Pain Point Extraction:** Autonomously identifies the top 3 critical user complaints, complete with verified literal quotes from the source text.
- **Automated Roadmap:** Suggests three action-oriented tasks categorized as Priority or Improvement.

## 🧰 Tech Stack

- **Framework:** Next.js (App Router) & React 19
- **Styling:** Tailwind CSS v4 with a responsive glassmorphism interface and reduced-motion support
- **Icons:** Lucide React
- **Artificial Intelligence:** Google Gen AI SDK (`@google/genai`) integrating production-ready Gemini Flash models.
- **Data Integrity:** Strict JSON Schema (Structured Outputs) enforcement to guarantee seamless backend-to-frontend rendering without UI breaking changes.

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine.

### Installation & Local Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/jcuero24/SuiteAI.git
   ```
2. Navigate into the project directory:
   ```bash
   cd suite-ai
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file in the root directory and add your Google AI Studio credentials:
   ```env
   GEMINI_API_KEY=your_google_ai_studio_api_key_here
   GEMINI_MODELS=gemini-2.5-flash
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📄 License
This project is open-source and available under the MIT License.


## Production configuration

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: the confirmed public HTTPS URL. It is required to populate canonical metadata, sitemap, and robots references; leave it blank until the production domain is known.
- `GEMINI_API_KEY`: server-only key. Do not add the `NEXT_PUBLIC_` prefix.
- `GEMINI_MODELS`: models available to your Gemini project.
- `NEXT_PUBLIC_GA_ID`: optional. If set, Google Analytics loads only after the visitor accepts analytics and can be disabled from cookie settings.

Before commercial launch, complete the operator’s legal identification and notice address in `/terms` and `/privacy`. The consent card displays a timestamp and truncated IP for demonstration; it does not save durable proof of consent. Review the legal documents and the AI provider’s retention settings before processing real data.

## Build and run

```bash
npm ci
npm run dev
npm run build
npm run start
```

The development and build scripts use Next.js Webpack mode with Tailwind’s PostCSS integration. Project estimates are displayed in USD; this preview does not collect payments.
