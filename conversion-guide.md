# CSS px to rem Conversion Guide

## Purpose

This guide explains the process of converting `px` values from design tools like Figma into `rem`
values using CSS variables. This approach ensures consistent and scalable typography across
different projects with varying base font sizes.

## Why Use rem Units?

1. **Scalability:** `rem` units are relative to the root font size, allowing elements to scale
   proportionally if the root font size changes.
2. **Accessibility:** Users can adjust their browser's root font size to improve readability. Using
   `rem` units ensures that your design respects these user settings.
3. **Consistency:** Using a single base font size variable allows you to maintain consistent
   proportions throughout your design system.

## General Formula

To convert a `px` value to a `rem` value dynamically, use the following formula:

```css
calc(px_value / var(--base-font-size) * 1rem)
```
