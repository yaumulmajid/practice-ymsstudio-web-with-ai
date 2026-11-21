import * as migration_20261121_112610_initial from './20261121_112610_initial';
import * as migration_20261121_115322_post_views from './20261121_115322_post_views';
import * as migration_20261121_115330_seed_content from './20261121_115330_seed_content';
import * as migration_20261121_115400_blog_covers from './20261121_115400_blog_covers';
import * as migration_20261121_120000_admin_password from './20261121_120000_admin_password';

// Data migrations (seed_content, blog_covers) are idempotent: they skip anything that
// already has content, so re-running them on an existing database changes nothing.
export const migrations = [
  {
    up: migration_20261121_112610_initial.up,
    down: migration_20261121_112610_initial.down,
    name: '20261121_112610_initial',
  },
  {
    up: migration_20261121_115322_post_views.up,
    down: migration_20261121_115322_post_views.down,
    name: '20261121_115322_post_views',
  },
  {
    up: migration_20261121_115330_seed_content.up,
    down: migration_20261121_115330_seed_content.down,
    name: '20261121_115330_seed_content',
  },
  {
    up: migration_20261121_115400_blog_covers.up,
    down: migration_20261121_115400_blog_covers.down,
    name: '20261121_115400_blog_covers',
  },
  {
    up: migration_20261121_120000_admin_password.up,
    down: migration_20261121_120000_admin_password.down,
    name: '20261121_120000_admin_password',
  },
];
