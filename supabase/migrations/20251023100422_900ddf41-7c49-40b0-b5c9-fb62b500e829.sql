-- Add end_date and end_time columns to events table
ALTER TABLE public.events 
ADD COLUMN end_date date,
ADD COLUMN end_time time without time zone;

-- Add a check to ensure end_date is after or equal to start date
ALTER TABLE public.events
ADD CONSTRAINT events_date_range_check 
CHECK (end_date IS NULL OR end_date >= date);

-- Update existing events to set end_date and end_time equal to start date and time
UPDATE public.events 
SET end_date = date, end_time = time
WHERE end_date IS NULL;