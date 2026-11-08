const pesoFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const eventDateFormatter = new Intl.DateTimeFormat('en-PH', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Asia/Manila',
});

export function formatPeso(amount: number): string {
  if (!Number.isFinite(amount)) {
    throw new RangeError('Amount must be a finite number.');
  }

  return pesoFormatter.format(amount);
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError('Event date must be a valid date string.');
  }

  return eventDateFormatter.format(date);
}
