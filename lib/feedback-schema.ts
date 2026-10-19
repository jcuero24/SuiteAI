export type Categoria = "Prioritario" | "Mejora";

export interface PuntoDolor {
  titulo: string;
  descripcion: string;
  cita: string;
  menciones: number;
}

export interface TareaRoadmap {
  titulo: string;
  categoria: Categoria;
}

export interface FeedbackModelOutput {
  total_comentarios: number;
  conteo_positivo: number;
  conteo_neutro: number;
  conteo_negativo: number;
  porc_positivo: number;
  porc_neutro: number;
  porc_negativo: number;
  puntos_dolor: PuntoDolor[];
  tareas_roadmap: TareaRoadmap[];
}

export interface FeedbackResult extends Omit<FeedbackModelOutput, "puntos_dolor"> {
  puntos_dolor: {
    titulo: string;
    descripcion: string;
    cita: string;
    menciones: number;
    porcentaje: number;
    cita_verificada: boolean;
  }[];
}

export const feedbackJsonSchema = {
  type: "object",
  properties: {
    total_comentarios: { type: "integer" },
    conteo_positivo: { type: "integer" },
    conteo_neutro: { type: "integer" },
    conteo_negativo: { type: "integer" },
    porc_positivo: { type: "number" },
    porc_neutro: { type: "number" },
    porc_negativo: { type: "number" },
    puntos_dolor: {
      type: "array",
      items: {
        type: "object",
        properties: {
          titulo: { type: "string" },
          descripcion: { type: "string" },
          cita: { type: "string" },
          menciones: { type: "integer" }
        },
        required: ["titulo", "descripcion", "cita", "menciones"]
      }
    },
    tareas_roadmap: {
      type: "array",
      items: {
        type: "object",
        properties: {
          titulo: { type: "string" },
          categoria: { type: "string", enum: ["Prioritario", "Mejora"] }
        },
        required: ["titulo", "categoria"]
      }
    }
  },
  required: [
    "total_comentarios",
    "conteo_positivo",
    "conteo_neutro",
    "conteo_negativo",
    "porc_positivo",
    "porc_neutro",
    "porc_negativo",
    "puntos_dolor",
    "tareas_roadmap"
  ]
} as const;
