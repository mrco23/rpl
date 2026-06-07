-- =============================================================================
-- TiDB Sequence Setup for `pendaftar.id_pendaftar`
-- =============================================================================
-- WHY THIS FILE EXISTS
-- --------------------
-- TiDB does NOT allow adding the AUTO_INCREMENT attribute to an existing column
-- via:
--
--   ALTER TABLE pendaftar MODIFY COLUMN id_pendaftar INT AUTO_INCREMENT;
--
-- Attempting that command will fail with an error similar to:
--   "Unsupported modify column: can't set auto_increment"
--
-- Instead, we use a TiDB SEQUENCE object to generate unique, monotonically
-- increasing IDs at the application layer before inserting a new row.
--
-- INSTRUCTIONS
-- ------------
-- Step 1 — Find the current maximum ID in production:
--
--   SELECT COALESCE(MAX(id_pendaftar), 0) AS max_id
--   FROM pendaftar;
--
-- Step 2 — Set START WITH to (max_id + 1).
--   For example, if max_id = 42 then use START WITH 43.
--   Replace the value in the CREATE SEQUENCE statement below before running it.
--
-- Step 3 — Run the CREATE SEQUENCE statement in TiDB Cloud (SQL Editor).
--
-- Step 4 — Verify the sequence works with NEXTVAL (see bottom of file).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- IMPORTANT: Before running this script, execute the query below and note
-- the returned `max_id` value. Then set START WITH to (max_id + 1).
--
--   SELECT COALESCE(MAX(id_pendaftar), 0) AS max_id
--   FROM pendaftar;
--
-- Example: if max_id = 0 (empty table) → START WITH 1
--          if max_id = 57             → START WITH 58
-- -----------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS seq_pendaftar_id
    START WITH 1        -- ⚠️  ADJUST THIS to MAX(id_pendaftar) + 1 before running
    INCREMENT BY 1
    CACHE 100;

-- -----------------------------------------------------------------------------
-- VERIFY the sequence after creation
-- Run this query to confirm a valid next ID is returned:
-- -----------------------------------------------------------------------------

-- SELECT NEXTVAL(seq_pendaftar_id) AS next_id;

-- -----------------------------------------------------------------------------
-- RESET / RESYNC the sequence (use only when needed)
--
-- SETVAL() lets you manually move the sequence cursor to a specific value.
-- Use this when:
--   - The sequence was created with an incorrect START WITH value.
--   - Data was imported directly into the table bypassing the sequence,
--     and the sequence is now behind the actual MAX(id_pendaftar).
--   - You restored a database backup and need to resynchronize the sequence.
--
-- Example: if MAX(id_pendaftar) is currently 100, reset with:
--   SELECT SETVAL(seq_pendaftar_id, 100);
-- The NEXT call to NEXTVAL will then return 101.
-- -----------------------------------------------------------------------------

-- SELECT SETVAL(seq_pendaftar_id, 0);
-- ⚠️  Replace 0 with the actual MAX(id_pendaftar) value before using SETVAL.
