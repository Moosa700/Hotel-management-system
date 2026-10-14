import test from "node:test";
import assert from "node:assert/strict";
import { calculateStay, validateStayDates } from "../src/utils/bookingRules.js";

test("accepts a future stay with checkout after check-in", () => {
  const result = validateStayDates(
    "2026-11-18",
    "2026-11-20",
    new Date("2026-10-14T12:00:00Z")
  );

  assert.equal(result.valid, true);
  assert.equal(calculateStay(220, result.checkInDate, result.checkOutDate).nights, 2);
});

test("rejects invalid, past, and zero-length stays", () => {
  const now = new Date("2026-10-14T12:00:00Z");

  assert.equal(validateStayDates("not-a-date", "2026-10-16", now).valid, false);
  assert.equal(validateStayDates("2026-10-13", "2026-10-16", now).valid, false);
  assert.equal(validateStayDates("2026-10-16", "2026-10-16", now).valid, false);
});

test("calculates room charges and rounds tax to cents", () => {
  assert.deepEqual(
    calculateStay(220, new Date("2026-11-18"), new Date("2026-11-20"), 8.25),
    { nights: 2, roomCharges: 440, taxAmount: 36.3, totalPrice: 476.3 }
  );
});