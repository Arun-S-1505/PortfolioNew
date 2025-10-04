# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring smooth animations, dark mode support, and a contact form with email integration.

## 🚀 Features

- ✨ Modern UI with glassmorphism effects
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🎨 Smooth animations with Framer Motion
- 📧 Contact form with Resend email integration
- ⚡ Built with Next.js 15 and React 19
- 🎯 TypeScript for type safety
- 💅 Styled with Tailwind CSS

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Email:** Resend
- **Icons:** Lucide React
- **UI Components:** Radix UI
- **Type Safety:** TypeScript

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd prototype-1
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Resend API key:

```env
RESEND_API_KEY=your_resend_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Email Setup

1. Sign up for a free account at [Resend](https://resend.com/)
2. Get your API key from the dashboard
3. Add the API key to your `.env.local` file
4. Update the recipient email in `app/api/send-email/route.ts`

### Customization

- Update your personal information in the components:
  - `components/hero-section.tsx` - Name and intro
  - `components/about-section.tsx` - About me section
  - `components/contact-section.tsx` - Contact info and social links
  - `components/footer.tsx` - Footer credits
- Replace the photo in `public/Photo.jpg` with your own

## 📁 Project Structure

```
├── app/
│   ├── api/send-email/     # Email API route
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── hero-section.tsx   # Hero section
│   ├── about-section.tsx  # About section
│   ├── projects-section.tsx # Projects showcase
│   ├── skills-section.tsx  # Skills display
│   ├── contact-section.tsx # Contact form
│   └── ...                # Other components
├── public/                # Static assets
└── ...

```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Add your environment variables in the Vercel dashboard
5. Deploy!

## 📝 License

MIT License - Feel free to use this template for your own portfolio!

## 👤 Author

**Arun Saravanan S**

- GitHub: [@Arun-S-1505](https://github.com/Arun-S-1505)
- LinkedIn: [arun-saravanan-s](https://www.linkedin.com/in/arun-saravanan-s/)
- Twitter: [@arunsarava68426](https://x.com/arunsarava68426)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Email service by [Resend](https://resend.com/)
