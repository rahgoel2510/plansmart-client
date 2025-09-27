#!/bin/bash

echo "🔒 Starting secure production build..."

# Clean previous builds
rm -rf dist/

# Set production environment
export NODE_ENV=production

# Build with obfuscation
npm run build-only

# Additional security measures
echo "🛡️ Applying additional security measures..."

# Remove source maps if any exist
find dist/ -name "*.map" -delete 2>/dev/null || true

# Remove any remaining console logs from built files (macOS compatible)
if [[ "$OSTYPE" == "darwin"* ]]; then
  find dist/ -name "*.js" -exec sed -i '' 's/console\.[a-zA-Z]*([^)]*);*//g' {} \; 2>/dev/null || true
else
  find dist/ -name "*.js" -exec sed -i 's/console\.[a-zA-Z]*([^)]*);*//g' {} \; 2>/dev/null || true
fi

# Add security headers to index.html
if [ -f "dist/index.html" ]; then
  sed -i '' '/<head>/a\
  <meta http-equiv="Content-Security-Policy" content="default-src '\''self'\''; script-src '\''self'\''; style-src '\''self'\'' '\''unsafe-inline'\''; img-src '\''self'\'' data:; font-src '\''self'\''; connect-src '\''self'\'' http://ec2-15-206-93-130.ap-south-1.compute.amazonaws.com;">\
  <meta http-equiv="X-Content-Type-Options" content="nosniff">\
  <meta http-equiv="X-Frame-Options" content="DENY">\
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">\
  <meta name="referrer" content="no-referrer">
  ' dist/index.html
fi

# Create integrity hashes for critical files
echo "🔐 Generating integrity hashes..."
find dist/ -name "*.js" -o -name "*.css" | while read file; do
  hash=$(openssl dgst -sha384 -binary "$file" | openssl base64 -A)
  echo "$(basename "$file"): sha384-$hash" >> dist/integrity.txt
done

echo "✅ Secure build completed!"
echo "📁 Build output: dist/"
echo "🔍 Integrity hashes: dist/integrity.txt"