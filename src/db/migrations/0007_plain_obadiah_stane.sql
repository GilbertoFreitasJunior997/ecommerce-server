ALTER TABLE "product_image" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_image" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product_image" ADD COLUMN "size" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "product_image" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product_image" ADD COLUMN "key" text;--> statement-breakpoint
ALTER TABLE "product_image" ADD COLUMN "is_default" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "product_image" DROP COLUMN "description";