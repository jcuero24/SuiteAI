export type Nivel = "Alto" | "Medio" | "Bajo";

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
      description: "Resumen del alcance del proyecto en 2 a 4 frases.",
    },
    entregables: {
      type: "array",
      items: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          descripcion: { type: "string" },
          horas: { type: "number", description: "Horas de trabajo estimadas." },
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
          nivel: { type: "string", enum: ["Alto", "Medio", "Bajo"] },
          descripcion: { type: "string" },
        },
        required: ["nivel", "descripcion"],
      },
    },
    preguntas_cliente: {
      type: "array",
      description: "Preguntas aclaratorias, de la más a la menos importante.",
      items: { type: "string" },
    },
    estimacion: {
      type: "object",
      properties: {
        margen_pct: {
          type: "number",
          description: "Margen de contingencia recomendado, entre 10 y 30.",
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