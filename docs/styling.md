# Styling Guide

This guide describes how to choose between global typography classes, design tokens, local module styles, and utilities.

The goal is not to avoid local CSS. The goal is to make repeated decisions look intentional and keep component styles small.

## General Rule

Use the highest-level styling tool that describes your intent:

1. Use a semantic HTML element for document meaning.
2. Use a global typography class when the text matches a reusable text style.
3. Use tokens inside a CSS module when the component needs local styling.
4. Use utilities only for tiny layout or behavior helpers.

Example:

```tsx
<h3 className={cn(styles.title, 'h4', 'font-playfair')}>{title}</h3>
<p className={cn(styles.description, 'p')}>{description}</p>
```

The HTML describes meaning, the global class describes typography, and the module class handles component-specific layout, color, spacing, or responsive changes.

## Headings

Use real heading elements for structure:

```tsx
<h1 />
<h2 />
<h3 />
```

Use `.h1`, `.h2`, `.h3`, `.h4` for visual size:

```tsx
<h2 className={cn(styles.categoryName, 'h4')}>{name}</h2>
```

This is useful when the semantic level and visual size are different. For example, a page section may need an `h2`, but visually it should look like the reusable `.h4` style.

Use a CSS module when the heading needs component-specific styling:

```scss
.title {
  color: var(--color-text-inverted);
  text-align: center;
}
```

Do not create local heading sizes unless the component is genuinely special, such as a hero headline.

Good:

```scss
.headline {
  font-size: clamp(var(--font-size-54), calc(12vw + 0.1rem), var(--font-size-76));
  line-height: 1.3;
}
```

Avoid:

```scss
.title {
  font-size: 23px;
  font-weight: 450;
}
```

## Paragraphs

Use `.p` for standard paragraph copy:

```tsx
<p className={cn(styles.description, 'p')}>{description}</p>
```

Use `.text-xs`, `.text-sm`, `.text-md`, `.text-lg` for short text that needs a body text size but is not really a paragraph:

```tsx
<span className="text-sm">{productCount}</span>
```

These classes set the full text rhythm: size, line-height, and letter-spacing.

Use tokens in a CSS module when the text belongs to a specific component part:

```scss
.meta {
  color: var(--color-text-secondary);
  font-size: var(--typography-body-s-size);
  line-height: var(--typography-body-s-line-height);
  letter-spacing: var(--typography-body-s-letter-spacing);
}
```

Avoid styling ordinary paragraphs with raw values:

```scss
.description {
  font-size: 14px;
  line-height: 20px;
}
```

## Labels

A label can mean a real form label or a small UI label. Treat those slightly differently.

For form controls, prefer the shared UI component when one exists:

```tsx
<Checkbox label={value} name={name} value={value} />
```

If the label needs visual adjustments, pass class names into the shared component and style with tokens:

```tsx
<Checkbox
  label={value}
  name={name}
  value={value}
  classNames={{
    label: styles.checkboxLabel,
  }}
/>
```

```scss
.checkboxLabel {
  color: var(--color-text-secondary);
  font-size: var(--typography-body-s-size);
  line-height: var(--typography-body-s-line-height);
  letter-spacing: var(--typography-body-s-letter-spacing);
}
```

For non-form UI labels, use a semantic element that matches the context, then apply local styling:

```tsx
<span className={styles.label}>{label}</span>
```

```scss
.label {
  color: var(--color-text-muted);
  font-size: var(--typography-body-xs-size);
  line-height: var(--typography-body-xs-line-height);
  letter-spacing: var(--letter-spacing-label);
}
```

Use `--letter-spacing-label` only for tiny label-like text where the spacing is part of the visual language. Do not apply it to regular body copy.

## Utilities

Use utilities for small, obvious layout helpers:

```tsx
<div className={cn(styles.wrapper, 'flex', 'align-center', 'gap-1')} />
```

Good utility use:

```txt
flex
flex-col
align-center
justify-between
gap-1
button-empty
sr-only
truncate
list-reset
transition-colors-200
```

Prefer a CSS module when several utilities start to describe a component layout:

```tsx
<div className={styles.content} />
```

```scss
.content {
  display: grid;
  justify-items: center;
  gap: 1rem;
  max-width: 46rem;
}
```

Do not use utilities to replace every CSS module. Utilities are for tiny repeated decisions; modules are for component design.

## Tokens

Use tokens instead of raw values when the value belongs to the design system:

```scss
color: var(--color-text-secondary);
font-size: var(--typography-body-s-size);
border-color: var(--color-border-primary);
```

Raw values are acceptable when the value is structural, highly local, or tied to a specific layout:

```scss
height: 100vh;
max-width: 46rem;
grid-template-columns: 1fr 1fr;
```

Avoid raw values for colors and repeated typography:

```scss
color: #5f5f5f;
font-size: 14px;
```

## Decision Checklist

Before adding a style, ask:

1. Is this semantic structure? Use HTML.
2. Is this a reusable text style? Use `typography.scss` classes.
3. Is this a tiny layout helper? Use a utility.
4. Is this component-specific? Use the component module.
5. Is this a repeated design value? Use a token.
6. Is this truly one-off layout math? A local raw value is fine.
