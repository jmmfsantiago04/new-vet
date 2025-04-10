ALTER TABLE "pets" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN "ownerName";--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN "ownerPhone";