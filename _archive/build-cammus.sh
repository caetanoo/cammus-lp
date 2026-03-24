#!/bin/bash

# Header HTML
cat > "/Users/caetanovizel/Desktop/LP CAMMUS/cammus-v2-final.html" << 'HTML_START'
<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CAMMUS — Content Intelligence Platform</title>
    <meta name="description" content="Pare de criar conteúdo no escuro. CAMMUS analisa +10.000 posts de alto engajamento.">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Theme init -->
    <script>
        (function() {
            const savedTheme = localStorage.getItem('theme');
            const theme = savedTheme || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
        })();
    </script>
    
HTML_START

# Add extracted CSS
cat "/Users/caetanovizel/Desktop/LP CAMMUS/design-system-temp.css" >> "/Users/caetanovizel/Desktop/LP CAMMUS/cammus-v2-final.html"

# Body HTML
cat >> "/Users/caetanovizel/Desktop/LP CAMMUS/cammus-v2-final.html" << 'HTML_END'
    </style>
</head>
<body>
<!-- HTML content here -->
<p>Test page using design system CSS</p>
</body>
</html>
HTML_END

echo "File created at cammus-v2-final.html"
