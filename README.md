# PlanSmart Client

Modern Vue.js frontend for PlanSmart Enterprise - built with Vuetify, TypeScript, and optimized for GitHub Pages deployment.

## 🚀 Features

- ✅ **Vue 3 + TypeScript** - Modern development stack
- ✅ **Vuetify 3** - Material Design components
- ✅ **Pinia** - State management
- ✅ **Vue Router** - Client-side routing with guards
- ✅ **Axios** - API integration with interceptors
- ✅ **GitHub Pages** - Automated deployment
- ✅ **Secure Build** - Code obfuscation and minification
- ✅ **Dark/Light Theme** - Theme switching
- ✅ **Responsive Design** - Mobile-first approach

## 🛠 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build with security features
npm run build-secure

# Deploy to GitHub Pages
npm run deploy
```

## 📱 Pages

- **Dashboard** - Overview with API status and statistics
- **Login** - Authentication with form validation
- **Organizations** - Manage organizations with CRUD operations
- **Analytics** - Data visualization (placeholder)
- **Settings** - Application settings (placeholder)

## 🎨 Theme

Custom PlanSmart theme with:
- **Primary Color**: #ff9900 (Amazon Orange)
- **Secondary Color**: #232f3e (Amazon Dark Blue)
- **Dark Mode Support**: Automatic theme switching
- **Material Design 3**: Modern component styling

## 🔐 Security Features

- **Code Obfuscation** - JavaScript minification and obfuscation
- **Security Headers** - CSP, XSS protection, frame options
- **Integrity Hashes** - File integrity verification
- **Console Removal** - Production console.log removal

## 🌐 API Integration

Connects to PlanSmart API server:
- **Development**: http://localhost:3000
- **Production**: Configurable API endpoint
- **Authentication**: JWT token management
- **Error Handling**: Automatic token refresh and logout

## 📦 Build Output

Optimized build with:
- **Chunk Splitting** - Vendor, UI, and page-specific chunks
- **Asset Optimization** - Images, fonts, and CSS optimization
- **Tree Shaking** - Unused code elimination
- **Lazy Loading** - Route-based code splitting

## 🚀 Deployment

### GitHub Pages (Automatic)

1. Push to main branch
2. GitHub Actions builds and deploys automatically
3. Available at: https://rahgoel2510.github.io/plansmart-client

### Manual Deployment

```bash
# Build and deploy
npm run deploy

# Or build securely and deploy
npm run build-secure
gh-pages -d dist
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=PlanSmart Enterprise
```

### API Configuration

Update `src/services/api.ts` for production API endpoint.

## 📁 Project Structure

```
src/
├── components/     # Reusable Vue components
├── layouts/        # Page layouts
├── plugins/        # Vuetify and other plugins
├── router/         # Vue Router configuration
├── services/       # API services
├── stores/         # Pinia stores
├── views/          # Page components
└── assets/         # Static assets
```

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run tests with coverage
npm run test:unit -- --coverage
```

## 📋 Scripts

- `dev` - Start development server
- `build` - Production build
- `build-secure` - Secure production build with obfuscation
- `preview` - Preview production build
- `deploy` - Deploy to GitHub Pages
- `lint` - ESLint code checking
- `format` - Prettier code formatting
- `test:unit` - Run unit tests

## 🔗 Links

- **Live Demo**: https://rahgoel2510.github.io/plansmart-client
- **API Server**: https://github.com/rahgoel2510/plansmart
- **Documentation**: Built-in component documentation

---

Built with ❤️ using Vue.js and Vuetify