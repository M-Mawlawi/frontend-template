/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'login-bg': "url('./assets/media/misc/auth-bg.png')",
            },
        },
        colors: {
            'primary': '#1B84FF',
            'sec': '#1b85ff',
            'primary-active': '#056EE9',
            'black': '#0d0e12',
            'white': '#ffffff',
            'gray-900': '#071437',
            'gray-800': 'rgba(63,66,84,.35)',
            'gray-700': '#464852',
            'gray-500': '#99A1B7',
            'gray-400': '#9a9cae',
            'gray-300': '#DBDFE9',
            'light': '#F1F1F4',
            'highlight': '#F6C000',
            'red': '#F8285A',
            'text-green-600': 'rgb(34 197 94);'
        },
    },
    plugins: [],
}