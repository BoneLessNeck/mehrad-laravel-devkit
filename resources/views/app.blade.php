<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Mehrad Laravel Devkit') }}</title>

        <script>
            (function () {
                try {
                    const mode = localStorage.getItem('mehrad-appearance') || 'light';
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (mode === 'dark' || (mode === 'system' && prefersDark)) {
                        document.documentElement.classList.add('dark');
                    }
                } catch (e) {}
            })();
        </script>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=dm-sans:400,500,600|jetbrains-mono:400,500|plus-jakarta-sans:500,600,700" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
