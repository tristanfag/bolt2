/*
  # Allow anonymous users to insert form submissions

  1. Security Changes
    - Add policy for anonymous users to insert into `form_submissions` table
    - This allows the frontend form to submit data without authentication
    - Only INSERT operations are allowed for anonymous users
    - Authenticated users can still read their own data via existing policies

  2. Notes
    - This is safe for a lead capture form as we want public submissions
    - The policy only allows INSERT, not SELECT/UPDATE/DELETE for anonymous users
*/

-- Create policy to allow anonymous users to insert form submissions
CREATE POLICY "Allow anonymous users to insert form submissions"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);