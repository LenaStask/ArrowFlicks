"use client";

import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "'Inter', sans-serif",
  primaryColor: 'purple',
  colors: {
    'purple': [
      '#541F9D',
      '#9854F6', 
      '#BD93F7',
      '#D1B4F8',
      '#E5D5FA', 
      '#F2EBF9', 
      '#F2EBF9', 
      '#F2EBF9',
      '#F2EBF9',
      '#F2EBF9',
      '#F2EBF9',
    ],
    'grey': [
      '#000000',
      '#7B7C88',
      '#ACADB9',
      '#D5D6DC',
      '#EAEBED',
      '#F5F5F6',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
    ]
  },
  headings: {
    sizes: {
      h1: { fontSize: rem(24) },
      h2: { fontSize: rem(20) },
    },
  },
});