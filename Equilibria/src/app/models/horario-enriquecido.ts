export interface HorarioEnriquecido {
  dia: number;
  horaInicio: number;
  duracionHoras: number;
  salon?: string;
  materiaColor: string;
  materiaNombre: string;
  materiaSalon?: string | null; // <-- acepta null
}
