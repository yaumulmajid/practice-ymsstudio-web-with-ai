import * as migration_20261121_112610_initial from './20261121_112610_initial';
import * as migration_20261121_115322_post_views from './20261121_115322_post_views';
import * as migration_20261121_115325_maps_url from './20261121_115325_maps_url';
import * as migration_20261121_115327_case_studies_leads from './20261121_115327_case_studies_leads';
import * as migration_20261121_115330_seed_content from './20261121_115330_seed_content';
import * as migration_20261121_115400_blog_covers from './20261121_115400_blog_covers';
import * as migration_20261121_120000_admin_password from './20261121_120000_admin_password';
import * as migration_20261121_121400_post_ai_search from './20261121_121400_post_ai_search';
import * as migration_20261122_090000_post_mcp_motion from './20261122_090000_post_mcp_motion';
import * as migration_20261122_142035_lead_pipeline from './20261122_142035_lead_pipeline';

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
    up: migration_20261121_115325_maps_url.up,
    down: migration_20261121_115325_maps_url.down,
    name: '20261121_115325_maps_url',
  },
  {
    up: migration_20261121_115327_case_studies_leads.up,
    down: migration_20261121_115327_case_studies_leads.down,
    name: '20261121_115327_case_studies_leads',
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
  {
    up: migration_20261121_121400_post_ai_search.up,
    down: migration_20261121_121400_post_ai_search.down,
    name: '20261121_121400_post_ai_search',
  },
  {
    up: migration_20261122_090000_post_mcp_motion.up,
    down: migration_20261122_090000_post_mcp_motion.down,
    name: '20261122_090000_post_mcp_motion',
  },
  {
    up: migration_20261122_142035_lead_pipeline.up,
    down: migration_20261122_142035_lead_pipeline.down,
    name: '20261122_142035_lead_pipeline',
  },
];
