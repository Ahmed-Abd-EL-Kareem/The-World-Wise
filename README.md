# WorldWise - تطبيق السفر العالمي 🌍✈️

## English Description

**WorldWise** is a modern travel application built with React and Vite that allows users to explore cities around the world, track visited places, and plan future adventures. The app features an interactive map interface, city information, and a personal travel journal.

### Features

- 🌍 Interactive world map with city markers
- 🏙️ Detailed city information and photos
- 📍 Track visited cities
- 📝 Personal travel journal
- 🎨 Modern, responsive UI design
- ⚡ Fast performance with Vite

### Technologies Used

- **Frontend**: React 19, Vite 7
- **Styling**: CSS Modules
- **State Management**: React Context API
- **Build Tool**: Vite
- **Linting**: ESLint 9 (Flat Config)
- **Maps**: Leaflet & React-Leaflet
- **Routing**: React Router DOM 7

---

## الوصف بالعربية

**WorldWise** هو تطبيق سفر حديث مبني بـ React و Vite يتيح للمستخدمين استكشاف المدن حول العالم، وتتبع الأماكن التي تم زيارتها، وتخطيط المغامرات المستقبلية. يتميز التطبيق بواجهة خريطة تفاعلية، ومعلومات عن المدن، ومجلة سفر شخصية.

### المميزات

- 🌍 خريطة عالمية تفاعلية مع علامات المدن
- 🏙️ معلومات مفصلة عن المدن والصور
- 📍 تتبع المدن التي تمت زيارتها
- 📝 مجلة سفر شخصية
- 🎨 تصميم واجهة حديث ومتجاوب
- ⚡ أداء سريع مع Vite

### التقنيات المستخدمة

- **الواجهة الأمامية**: React 19, Vite 7
- **التصميم**: CSS Modules
- **إدارة الحالة**: React Context API
- **أداة البناء**: Vite
- **فحص الكود**: ESLint 9 (إعدادات مسطحة)
- **الخرائط**: Leaflet & React-Leaflet
- **التنقل**: React Router DOM 7

---

## Getting Started / البدء

### English

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

### العربية

1. استنسخ المستودع
2. ثبت التبعيات: `npm install`
3. ابدأ خادم التطوير: `npm run dev`
4. افتح [http://localhost:5173](http://localhost:5173)

---

## Available Scripts / الأوامر المتاحة

- `npm run dev` - Start development server / بدء خادم التطوير
- `npm run build` - Build for production / بناء للإنتاج
- `npm run preview` - Preview production build / معاينة البناء النهائي
- `npm run lint` - Run ESLint / تشغيل ESLint
- `npm run server` - Start JSON server for data / بدء خادم JSON للبيانات

---

## Troubleshooting / استكشاف الأخطاء وإصلاحها

### Build Issues / مشاكل البناء

- ✅ **ESLint Version Conflict**: Resolved by updating to ESLint 9 with Flat Config
- ✅ **Import Path Issues**: Fixed HomePage import path to match actual filename (Homepage.jsx)
- ✅ **Component Import Paths**: Fixed all component imports from "../components/" to "../Components/" (case-sensitive)
- ✅ **Dependency Conflicts**: Removed incompatible eslint-config-react-app

### Common Solutions / الحلول الشائعة

- Ensure all import paths match exact filenames (case-sensitive)
- Check component folder names: `Components` (capital C) not `components` (lowercase c)
- Use `npm run lint` to check for code issues before building
- Clear `node_modules` and reinstall if dependency issues persist

### File Structure / هيكل الملفات

```
src/
├── Components/          # Capital C - React components
├── pages/              # Lowercase p - Page components
├── contexts/           # Lowercase c - Context providers
└── hooks/              # Lowercase h - Custom hooks
```

---

## Deployment Status / حالة النشر

- ✅ **Local Build**: Working correctly
- ✅ **ESLint**: No errors found
- ✅ **Vercel Ready**: All build issues resolved
- ✅ **JSON Server Issue**: Resolved with local data fallback
- ✅ **Autocomplete Warnings**: Fixed for form inputs

---

## Deployment Solutions / حلول النشر

### JSON Server Issue / مشكلة خادم JSON

- **Problem**: `localhost:3001/cities` not accessible in production
- **Solution**: Added local data fallback using `import.meta.env.PROD`
- **Result**: App works offline in production with sample cities

### Form Accessibility / إمكانية الوصول للنماذج

- **Problem**: Missing `autocomplete` attributes on form inputs
- **Solution**: Added `autoComplete="username"` and `autoComplete="current-password"`
- **Result**: Better UX and no browser warnings

### Environment Detection / اكتشاف البيئة

```javascript
// Development: Uses JSON server
// Production: Uses local data
const BASE_URL = import.meta.env.PROD ? null : "http://localhost:3001/cities";
```
