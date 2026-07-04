'use client';
import 'client-only';

// Project-level client API. Prisma calls its server runtime "client",
// so browser-safe exports are intentionally exposed from this file.
export { Prisma } from './generated/browser';
export { ProductStatus } from './generated/enums';

export type {
    Category,
    CategoryParameter,
    Parameter,
    ParameterValue,
    Product,
    ProductParameterValue,
} from './generated/browser';
export type * from './generated/models';
