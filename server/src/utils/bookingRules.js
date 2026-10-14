export function validateStayDates(checkIn, checkOut, now = new Date()) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  if (
    Number.isNaN(checkInDate.getTime()) ||
    Number.isNaN(checkOutDate.getTime()) ||
    checkInDate < today ||
    checkOutDate <= checkInDate
  ) {
    return { valid: false };
  }

  return { valid: true, checkInDate, checkOutDate };
}

export function calculateStay(roomPrice, checkIn, checkOut, taxRate = 0) {
  const nights = Math.ceil((checkOut - checkIn) / 86400000);
  const roomCharges = Number(roomPrice) * nights;
  const taxAmount = Number(((roomCharges * Number(taxRate || 0)) / 100).toFixed(2));

  return {
    nights,
    roomCharges,
    taxAmount,
    totalPrice: roomCharges + taxAmount,
  };
}