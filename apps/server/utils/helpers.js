// @flow

import type { $Response } from 'express';

export const sendResponse = (statusCode: number, body: any, res: $Response) =>
  res.status(statusCode).json(body);

export const replaceDotsWithSpace = (input: string) =>
  input.replace(/\./g, ' ');
