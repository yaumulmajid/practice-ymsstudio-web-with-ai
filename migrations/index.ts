import * as migration_20261121_112610_initial from './20261121_112610_initial';
import * as migration_20261121_112700_seed_content from './20261121_112700_seed_content';

export const migrations = [
  {
    up: migration_20261121_112610_initial.up,
    down: migration_20261121_112610_initial.down,
    name: '20261121_112610_initial'
  },
  {
    up: migration_20261121_112700_seed_content.up,
    down: migration_20261121_112700_seed_content.down,
    name: '20261121_112700_seed_content'
  },
];
