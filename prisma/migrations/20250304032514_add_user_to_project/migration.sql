/*
  Warnings:

  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/

-- First, ensure we have at least one user to assign projects to
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM "User" LIMIT 1) THEN
        INSERT INTO "User" ("id", "email", "name", "createdAt", "updatedAt")
        VALUES ('default-user-id', 'admin@example.com', 'Default Admin', NOW(), NOW());
    END IF;
END $$;

-- Get the ID of the first user to use as default
DO $$
DECLARE
    default_user_id TEXT;
BEGIN
    SELECT id INTO default_user_id FROM "User" LIMIT 1;
    
    -- Add the column as nullable first
    ALTER TABLE "Project" ADD COLUMN "userId" TEXT;
    
    -- Update existing projects to use the default user
    UPDATE "Project" SET "userId" = default_user_id;
    
    -- Now make the column NOT NULL
    ALTER TABLE "Project" ALTER COLUMN "userId" SET NOT NULL;
END $$;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
