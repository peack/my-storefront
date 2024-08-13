import * as migration_20240813_132845 from './20240813_132845';
import * as migration_20240813_140712 from './20240813_140712';
import * as migration_20240813_141810 from './20240813_141810';
import * as migration_20240813_144455 from './20240813_144455';

export const migrations = [
  {
    up: migration_20240813_132845.up,
    down: migration_20240813_132845.down,
    name: '20240813_132845',
  },
  {
    up: migration_20240813_140712.up,
    down: migration_20240813_140712.down,
    name: '20240813_140712',
  },
  {
    up: migration_20240813_141810.up,
    down: migration_20240813_141810.down,
    name: '20240813_141810',
  },
  {
    up: migration_20240813_144455.up,
    down: migration_20240813_144455.down,
    name: '20240813_144455'
  },
];
