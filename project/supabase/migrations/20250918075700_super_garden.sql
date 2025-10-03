/*
  # Create form submissions table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key)
      - `naam` (text, required)
      - `email` (text, required)
      - `telefoon` (text, required)
      - `postcode` (text, required)
      - `huisnummer` (text, required)
      - `toevoeging` (text, optional)
      - `oplossing` (text, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for service role to insert data
    - Add policy for authenticated users to read data

  3. Changes
    - Creates a comprehensive table for storing all form submission data
    - Includes proper indexing for email and created_at for efficient queries
    - Sets up proper security policies
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  naam text NOT NULL,
  email text NOT NULL,
  telefoon text NOT NULL,
  postcode text NOT NULL,
  huisnummer text NOT NULL,
  toevoeging text DEFAULT '',
  oplossing text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow service role to insert form submissions"
  ON form_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read form submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_form_submissions_updated_at
    BEFORE UPDATE ON form_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();