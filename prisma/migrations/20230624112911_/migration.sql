BEGIN;

ALTER TABLE "Book" 
ADD COLUMN "price" DECIMAL,
ADD COLUMN "availableStock" INTEGER;

UPDATE "Book" SET 
  "price" = 0.00,
  "availableStock" = 0;

ALTER TABLE "Book" 
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "availableStock" SET NOT NULL;

COMMIT;