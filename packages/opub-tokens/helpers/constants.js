// tokens which are not available in figma
export const extraVariables = `
  --z-1: 100;
  --z-2: 400;
  --z-3: 513;
  --z-4: 514;
  --z-5: 515;
  --z-6: 516;
  --z-7: 517;
  --z-8: 518;
  --z-9: 519;
  --z-10: 520;
  --z-max: 99999;

  --duration-0: 0ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-250: 250ms;
  --duration-300: 300ms;
  --duration-350: 350ms;
  --duration-400: 400ms;
  --duration-450: 450ms;
  --duration-500: 500ms;
  --duration-5000: 5000ms;

  --ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --linear: cubic-bezier(0, 0, 1, 1);
  --ease-in: cubic-bezier(0.42, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.58, 1);
  --ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);

  --font-size-75: 0.75rem;
  --font-size-100: 0.875rem;
  --font-size-200: 1rem;
  --font-size-300: 1.25rem;
  --font-size-400: 1.5rem;
  --font-size-500: 1.75rem;
  --font-size-600: 2rem;
  --font-size-700: 2.5rem;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --font-line-height-0: 0px;
  --font-line-height-1: 16px;
  --font-line-height-2: 20px;
  --font-line-height-3: 24px;
  --font-line-height-4: 28px;
  --font-line-height-5: 32px;
  --font-line-height-6: 40px;
  --font-line-height-7: 48px;
`

// paths to copy the generated files to
export const copyPaths = [
	'examples/district/styles/tokens/',
	'examples/drr/styles/tokens/',
	'examples/data-exchange/styles/tokens/',
	'packages/opub-ui/styles/',
]
