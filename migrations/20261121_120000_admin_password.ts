// Sets a known password for the first admin (admin@ymsstudio.id), handed to the owner
// privately. Only the salted PBKDF2 hash is stored here, never the password itself.
// Change the password in the CMS after logging in (Pengguna → your account).
import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

const EMAIL = 'admin@ymsstudio.id'
const SALT = '7718c51d37dcd5c0b3af1ec704275a3e47d8803ec4d4ccff61cea44ed44a2cde'
const HASH = 'pbkdf2-sha256-v1:d4ea6b310b0a3500ff5a86b5ac54fd6a26ff226e223e156d0131c149063fc727'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    update users
    set salt = ${SALT}, hash = ${HASH}, login_attempts = 0, lock_until = null, updated_at = now()
    where email = ${EMAIL}`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Nothing to undo.
}
