# Suite IA Comercial 🚀

An AI-powered commercial micro-SaaS suite built to optimize workflows for freelancers, digital agencies, and startups. This project integrates two high-value tools that solve critical challenges in software development operations: automated client project pricing and user feedback analytics.

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
- **Automated Roadmap:** Generates 3 action-oriented technical tasks categorized by priority (High Priority vs. Enhancement) for the engineering team.

## 🧰 Tech Stack

- **Framework:** Next.js (App Router) & React 19
- **Styling:** Tailwind CSS (Premium minimalist dark-mode interface)
- **Icons:** Lucide React
- **Artificial Intelligence:** Google Gen AI SDK (`@google/genai`) integrating production-ready Gemini Flash models.
- **Data Integrity:** Strict JSON Schema (Structured Outputs) enforcement to guarantee seamless backend-to-frontend rendering without UI breaking changes.

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine.

### Installation & Local Setup

1. Clone this repository:
   ```bash
   git clone https://github.com
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


## Configuración de producción

Copia las variables de `.env.example` a `.env.local` y completa:

- `NEXT_PUBLIC_SITE_URL`: URL HTTPS pública, obligatoria para las URLs canónicas, el sitemap y robots. Déjala vacía hasta confirmar el dominio.
- `GEMINI_API_KEY`: clave privada del servidor; no uses el prefijo `NEXT_PUBLIC_`.
- `GEMINI_MODELS`: modelos disponibles en tu proyecto de Gemini.
- `NEXT_PUBLIC_GA_ID`: opcional. Si se configura, Google Analytics se carga solo después de aceptar analítica y puede retirarse desde el control de cookies.

Antes de ofrecer el servicio, completa la identificación legal y domicilio del responsable en los documentos de `/terms` y `/privacy`. La tarjeta de consentimiento muestra una fecha y una IP truncada con fines demostrativos; no almacena una prueba duradera. Revisa los documentos con asesoría jurídica y la configuración de retención del proveedor de IA antes de procesar datos reales.
