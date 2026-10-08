import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import validate from "../../src/middlewares/validate.middleware.js";
import { assignRolesDto, userIdParamDto } from "../../src/dtos/auth.dto.js";

const ROLE_ID = "ba06a758-ffac-4287-91e1-b2f2601dde84";

const createRes = () => {
  const res = {};
  res.status = mock.fn(() => res);
  res.json = mock.fn(() => res);
  return res;
};

describe("validate middleware", () => {
  const middleware = validate({ params: userIdParamDto, body: assignRolesDto });

  it("sets req.validated and calls next when input is valid", () => {
    const req = {
      params: { id: "3f101555-3082-4588-aa3a-6428d5ae7350" },
      body: { rolesId: [ROLE_ID, ROLE_ID] },
    };
    const res = createRes();
    const next = mock.fn();

    middleware(req, res, next);

    assert.equal(next.mock.callCount(), 1);
    assert.equal(res.status.mock.callCount(), 0);
    // rolesId bi trung se duoc loai bo
    assert.deepEqual(req.validated.body.rolesId, [ROLE_ID]);
    assert.equal(req.validated.params.id, req.params.id);
  });

  it("responds 400 with errors grouped by request key", () => {
    const req = { params: { id: "not-a-uuid" }, body: { rolesId: [] } };
    const res = createRes();
    const next = mock.fn();

    middleware(req, res, next);

    assert.equal(next.mock.callCount(), 0);
    assert.equal(res.status.mock.calls[0].arguments[0], 400);
    const body = res.json.mock.calls[0].arguments[0];
    assert.equal(body.success, false);
    assert.ok(body.message.params.id);
    assert.ok(body.message.body.rolesId);
  });
});
