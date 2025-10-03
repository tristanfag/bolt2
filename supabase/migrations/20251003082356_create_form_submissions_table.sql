/*
  # Create form submissions table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `naam` (text) - Full name of the submitter
      - `email` (text) - Email address
      - `telefoon` (text) - Phone number
      - `postcode` (text) - Postal code (optional)
      - `huisnummer` (text) - House number (optional)
      - `toevoeging` (text, nullable) - House number addition (optional)
      - `oplossing` (text) - Selected solution type (optional)
      - `created_at` (timestamptz) - Timestamp when submission was created
      - `updated_at` (timestamptz) - Timestamp when submission was last updated

  2. Security
    - Enable RLS on `form_submissions` table
    - Public can insert their own submissions (no authentication required for form submission)
    - Only authenticated users (admins) can read all submissions

  3. Important Notes
    - This table stores lead capture form submissions
    - Public insert access allows anonymous form submissions
    - Admin dashboard requires authentication to view submissions
    - All timestamps use UTC timezone
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  naam text NOT NULL,
  email text NOT NULL,
  telefoon text NOT NULL,
  postcode text DEFAULT '',
  huisnummer text DEFAULT '',
  toevoeging text DEFAULT '',
  oplossing text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert form submissions (public form)
CREATE POLICY "Anyone can insert form submissions"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read all submissions (admin access)
CREATE POLICY "Authenticated users can read all submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index on created_at for efficient sorting
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at 
  ON form_submissions(created_at DESC);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_form_submissions_email 
  ON form_submissions(email);