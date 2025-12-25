#!/bin/sh
cat <<EOF > /etc/nginx/conf.d/default.conf
server {
    listen ${PORT:-8080};
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
echo "window.ENV = { VITE_API_URL: \"\${VITE_API_URL}\", VITE_USE_MOCK: \"false\" };" > /usr/share/nginx/html/env-config.js
