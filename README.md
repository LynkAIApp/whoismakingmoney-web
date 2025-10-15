# WhoIsMakingMoney.ai

A comprehensive platform for analyzing successful AI products and providing market-validated blueprints for entrepreneurs.

## Features

- **Real Analysis Data**: Hard-coded analysis of successful AI products like PitchBob.io, AI Shorts Lab, and AssistAI.Lat
- **Multilingual Support**: English and Chinese (Simplified) with next-intl
- **Modern Tech Stack**: Next.js 14+ with App Router, Supabase, shadcn/ui, Tailwind CSS
- **Content Management**: MDX support for future blog and FAQ content
- **Responsive Design**: Mobile-first approach with beautiful UI

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Components**: shadcn/ui
- **Database & Auth**: Supabase
- **Content Management**: MDX with next-mdx-remote
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   
   **重要**: 你需要创建一个 `.env.local` 文件来配置 Supabase 和其他环境变量。
   
   在项目根目录创建 `.env.local` 文件，内容如下：
   ```bash
   # Supabase Configuration
   # 请替换为你的 Supabase 项目配置
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Next.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key
   
   # 其他环境变量
   NODE_ENV=development
   ```
   
   **如何获取 Supabase 配置**:
   1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
   2. 创建新项目或选择现有项目
   3. 在 Settings > API 中找到 Project URL 和 anon key
   4. 复制这些值到 `.env.local` 文件中

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   └── language-switcher.tsx
├── content/              # MDX content
│   └── analyses/         # Analysis reports
├── i18n/                # Internationalization
│   ├── messages/        # Translation files
│   ├── routing.ts       # i18n routing config
│   └── request.ts       # i18n request config
└── lib/                 # Utilities
    ├── supabase.ts      # Supabase client
    └── utils.ts         # Helper functions
```

## Analysis Data

The homepage features three real analysis cases:

### 1. PitchBob.io
- **Tagline**: AI Pitch Deck Generator & Co-Pilot for Startups
- **Business Model**: Mix of one-time purchases and subscription plans
- **Target**: Early-stage startup founders and entrepreneurs

### 2. AI Shorts Lab
- **Tagline**: Create Viral-Worthy Short Videos & AI UGC Content in Minutes
- **Business Model**: SaaS subscription model for content creators
- **Target**: Content creators, social media managers, marketing agencies

### 3. AssistAI.Lat
- **Tagline**: Your AI Assistant for WhatsApp, specialized for Latin American market
- **Business Model**: Geographic niching with monthly subscription
- **Target**: LATAM businesses using WhatsApp for customer communication

## Internationalization

The platform supports English and Chinese (Simplified) with:
- Path-based routing (`/en/`, `/zh/`)
- Automatic locale detection
- Language switcher in header
- All content translated

## Future Enhancements

- User authentication and subscription system
- Detailed analysis reports in MDX format
- Blog and FAQ sections
- User dashboard and analytics
- API for analysis data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential.
