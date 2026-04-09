// Single source of truth for the coloring book.
// `count` is the number of `<id>_<n>.webp` images that exist on disk.
// `slot` controls where the thumbnail sits in the gallery layout (see styles.css).
// `code` is the per-category unlock string; the literal "unlock" is a global override.
export const categories = [
  { id: 'mermaids', label: 'Unicorns and Mermaids', code: 'talya', count: 4,  slot: 'top-left'     },
  { id: 'shapes',   label: 'Shapes',                code: '2012',  count: 6,  slot: 'top-right'    },
  { id: 'trees',    label: 'Trees and Unicorns',    code: 'thea',  count: 8,  slot: 'bottom-left'  },
  { id: 'panda',    label: 'Animals',               code: 'sadie', count: 11, slot: 'center'       },
  { id: 'insects',  label: 'Insects',               code: 'maren', count: 11, slot: 'bottom-right' },
];
