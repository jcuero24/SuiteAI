export type Nivel = "High" | "Medium" | "Low";

export interface Entregable {
  nombre: string;
  descripcion: string;
  horas: number;
}

// Lo que devuelve el modelo
export interface ScopeModelOutput {
  alcance: string;
  entregables: Entregable[];
  supuestos: string[];
  exclusiones: string[];
  riesgos: { nivel: Nivel; descripcion: string }[];
  preguntas_cliente: string[];
  estimacion: { margen_pct: number };
}

// Lo que recibe el frontend (las horas las calcula el servidor)
export interface ScopeResult extends Omit<ScopeModelOutput, "estimacion"> {
  estimacion: {
    horas_base: number;
    margen_pct: number;
    horas_totales: number;
    semanas: number;
  };
}

// JSON Schema que obliga a Gemini a devolver exactamente esta estructura
export const scopeJsonSchema = {
  type: "object",
  properties: {
    alcance: {
      type: "string",
      description: "Summarize the project scope in 2 to 4 sentences.",
    },
    entregables: {
      type: "array",
      items: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          descripcion: { type: "string" },
          horas: { type: "number", description: "Estimated work hours." },
        },
        required: ["nombre", "descripcion", "horas"],
      },
    },
    supuestos: { type: "array", items: { type: "string" } },
    exclusiones: { type: "array", items: { type: "string" } },
    riesgos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          nivel: { type: "string", enum: ["High", "Medium", "Low"] },
          descripcion: { type: "string" },
        },
        required: ["nivel", "descripcion"],
      },
    },
    preguntas_cliente: {
      type: "array",
      description: "Clarifying questions, ordered from most to least important.",
      items: { type: "string" },
    },
    estimacion: {
      type: "object",
      properties: {
        margen_pct: {
          type: "number",
          description: "Recommended contingency margin, between 10 and 30 percent.",
        },
      },
      required: ["margen_pct"],
    },
  },
  required: [
    "alcance",
    "entregables",
    "supuestos",
    "exclusiones",
    "riesgos",
    "preguntas_cliente",
    "estimacion",
  ],
} as const;
