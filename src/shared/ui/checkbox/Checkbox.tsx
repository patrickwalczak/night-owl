'use client';

import { createContext, type ReactNode } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils';

import styles from './checkbox.module.scss';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox
// https://dev.to/adbutterfield/custom-styling-radio-buttons-the-modern-way-the-butterfield-way-emk#side-quest-a-brief-history-of-the-appearance-property
// https://dev.to/adbutterfield/custom-styling-checkboxes-the-modern-way-3o42
