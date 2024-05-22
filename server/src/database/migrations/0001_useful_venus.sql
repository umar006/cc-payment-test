CREATE TABLE IF NOT EXISTS "transaction_histories" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"amount" numeric NOT NULL,
	"type" varchar NOT NULL,
	"status" integer NOT NULL,
	"name" varchar NOT NULL
);
