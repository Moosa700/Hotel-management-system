import test from "node:test";
import assert from "node:assert/strict";
import { authorize } from "../src/middleware/role.middleware.js";

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("maps specialist staff roles to staff permissions", () => {
  for (const role of ["manager", "receptionist", "housekeeping"]) {
    const response = createResponse();
    let proceeded = false;
    authorize("staff")({ user: { role } }, response, () => { proceeded = true; });
    assert.equal(proceeded, true);
  }
});

test("does not grant staff roles admin permissions", () => {
  const response = createResponse();
  let proceeded = false;

  authorize("admin")({ user: { role: "manager" } }, response, () => { proceeded = true; });

  assert.equal(proceeded, false);
  assert.equal(response.statusCode, 403);
});

test("rejects requests without an authenticated user", () => {
  const response = createResponse();
  authorize("staff")({}, response, () => {});

  assert.equal(response.statusCode, 401);
});