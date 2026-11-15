import 'server-only';
import { cache } from 'react';

import { getCachedCategoryWithChildrenBySlug } from '@/entities/category/server';

import type { CategoryParameter } from '../../model/categoryPage.types';

import { getCategoryParameters } from './getCategoryParameters';

export const getCategoryParametersBySlug = async (categorySlug: string): Promise<CategoryParameter[] | null> => {
    const category = await getCachedCategoryWithChildrenBySlug(categorySlug);
    if (!category) return null;

    const categoryIds = [category.id, ...category.children.map(child => child.id)];
    return getCategoryParameters(categoryIds);
};

export const getCachedCategoryParametersBySlug = cache(getCategoryParametersBySlug);
