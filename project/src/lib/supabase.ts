import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set up your Supabase project.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface FormSubmission {
  id?: string;
  naam: string;
  email: string;
  telefoon: string;
  postcode: string;
  huisnummer: string;
  toevoeging?: string;
  oplossing: string;
  created_at?: string;
  updated_at?: string;
}

// Database functions
export const insertFormSubmission = async (data: Omit<FormSubmission, 'id' | 'created_at' | 'updated_at'>) => {
  const { data: result, error } = await supabase
    .from('form_submissions')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error inserting form submission:', error);
    throw error;
  }

  return result;
};

export const getFormSubmissions = async () => {
  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching form submissions:', error);
    throw error;
  }

  return data;
};