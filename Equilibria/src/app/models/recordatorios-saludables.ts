// recordatorios-saludables.ts
import { Recordatorio } from '../models/recordatorio';

export const RecordatorioSaludable: Recordatorio[] = [
  new Recordatorio(1, 'Bebe agua', 'azul', 'daily', 'on', true),
  new Recordatorio(2, 'Cuida tu postura', 'verde', 'daily', 'on', true),
  new Recordatorio(3, 'Toma un descanso activo', 'naranja', 'once','on', true),
  new Recordatorio(4, 'Descansa la vista', 'morado', 'once','on', true),
];
