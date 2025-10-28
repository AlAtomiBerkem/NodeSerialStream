import type { Response } from 'express';
const { validateIdTabAndIndexStand } = require('./idTabErrors');

describe('validateIdTabAndIndexStand', () => {
  const mockRes = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    // @ts-ignore
    res.send = jest.fn();
    return res as Response;
  };

  test('returns false and responds when idTab is undefined', () => {
    const res = mockRes();
    const ok = validateIdTabAndIndexStand({ idTab: undefined as unknown as string, IndexStand: 1, res });
    expect(ok).toBe(false);
    expect((res.status as any)).toHaveBeenCalledWith(400);
  });

  test('returns false and responds when IndexStand is not a number', () => {
    const res = mockRes();
    // @ts-ignore
    const ok = validateIdTabAndIndexStand({ idTab: 'abc', IndexStand: 'x', res });
    expect(ok).toBe(false);
    expect((res.status as any)).toHaveBeenCalledWith(400);
  });

  test('returns true for valid input', () => {
    const res = mockRes();
    const ok = validateIdTabAndIndexStand({ idTab: 'abc', IndexStand: 0, res });
    expect(ok).toBe(true);
  });
});


