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
import * as migration_20261123_090000_project_woodnest from './20261123_090000_project_woodnest';
import * as migration_20261123_100000_woodnest_mockup from './20261123_100000_woodnest_mockup';
import * as migration_20261123_110000_post_instagram_marketplace from './20261123_110000_post_instagram_marketplace';
import * as migration_20261123_120000_project_hidden from './20261123_120000_project_hidden';
import * as migration_20261124_090000_tier_price_usd from './20261124_090000_tier_price_usd';
import * as migration_20261124_100000_post_php2shell from './20261124_100000_post_php2shell';

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
  {
    up: migration_20261123_090000_project_woodnest.up,
    down: migration_20261123_090000_project_woodnest.down,
    name: '20261123_090000_project_woodnest',
  },
  {
    up: migration_20261123_100000_woodnest_mockup.up,
    down: migration_20261123_100000_woodnest_mockup.down,
    name: '20261123_100000_woodnest_mockup',
  },
  {
    up: migration_20261123_110000_post_instagram_marketplace.up,
    down: migration_20261123_110000_post_instagram_marketplace.down,
    name: '20261123_110000_post_instagram_marketplace',
  },
  {
    up: migration_20261123_120000_project_hidden.up,
    down: migration_20261123_120000_project_hidden.down,
    name: '20261123_120000_project_hidden',
  },
  {
    up: migration_20261124_090000_tier_price_usd.up,
    down: migration_20261124_090000_tier_price_usd.down,
    name: '20261124_090000_tier_price_usd',
  },
  {
    up: migration_20261124_100000_post_php2shell.up,
    down: migration_20261124_100000_post_php2shell.down,
    name: '20261124_100000_post_php2shell',
  },
];
