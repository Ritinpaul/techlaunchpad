/**
 * Format Indian currency
 */
export function formatINR(paise) {
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString('en-IN')}`;
}

/**
 * Format rupees directly
 */
export function formatRupees(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

/**
 * Get initials from a name
 */
export function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

/**
 * Calculate group discount
 * 2 = 30%, 3 = 35%, 4 = 40%, 5 = 45%
 */
export function calcGroupPrice(basePrice, groupSize) {
  const discounts = { 2: 0.30, 3: 0.35, 4: 0.40, 5: 0.45 };
  const discount = discounts[groupSize] || 0;
  return {
    perPerson: Math.round(basePrice * (1 - discount)),
    total: Math.round(basePrice * groupSize * (1 - discount)),
    savings: Math.round(basePrice * groupSize * discount),
    discountPct: discount * 100,
  };
}

/**
 * Truncate text
 */
export function truncate(str, n) {
  return str.length > n ? str.slice(0, n) + '...' : str;
}

/**
 * Get cookie
 */
export function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

/**
 * Set cookie with expiry hours
 */
export function setCookie(name, value, hours = 24) {
  const expires = new Date(Date.now() + hours * 3600 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

/**
 * WhatsApp enrollment link
 */
export function makeWhatsAppLink(name, phone, program) {
  const msg = encodeURIComponent(
    `Hi, I'm ${name} and I'd like to enroll in: ${program}. My WhatsApp: ${phone}`
  );
  return `https://wa.me/917042732092?text=${msg}`;
}
