import { theme } from '@theming/Provider'

const sizes = {
  phone: theme.breakpoints.values.sm,
  tablet: theme.breakpoints.values.md,
  desktop: theme.breakpoints.values.lg,
  giant: theme.breakpoints.values.xl,
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use px in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const pxSize = sizes[label]

  accumulator[label] = styles => `
    @media (min-width: ${pxSize}px) {${styles}}
  `
  return accumulator
}, {})
