export const theme = {
  colors: {
    primary: "bg-black hover:bg-zinc-800 text-white",
    secondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200",
    accent: "text-indigo-600",
    background: "bg-white",
    card: "bg-white",
    input: "bg-gray-50 border-gray-200 focus:border-black focus:ring-black",
  },
  layout: {
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    section: "py-16 sm:py-24",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8",
  },
  components: {
    button:
      "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full shadow-sm transition-all duration-300 transform active:scale-95",
    input:
      "block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all",
  },
};
