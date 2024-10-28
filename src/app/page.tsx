import Head from 'next/head';
import Image from 'next/image';
import { Cover } from './components/ui/cover';
import { isAuthenticated } from '@/app/libs/isAuthenticated';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"
import { AiPromptForm } from '@/components/ai-prompt-form';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import ShineBorder from '@/components/ui/shine-border';

export default async function Home() {
  const isAuth = await isAuthenticated();
  console.log(isAuth);

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Landing Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <section className="pt-12 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-[55rem] mx-auto text-center">
            <h1 className="px-6 text-lg text-gray-600">Create intelligent, adaptive forms in minutes.</h1>
            <div className="tracking-tighter mt-2 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
              Intelligent Forms, Instant Insights
              <span className="relative inline-block sm:inline">
                <span className="relative"><Cover>AI at Your Fingertips</Cover></span>
              </span>
            </div>

            <div className="px-8 mt-9 flex flex-col sm:flex-row sm:items-center sm:justify-center sm:px-0 sm:space-x-5 space-y-4 sm:space-y-0">
              {isAuth ? (
                <>
                  <Dialog>
                    <DialogTrigger 
                      className="inline-flex items-center justify-center w-full px-6 py-3 text-md font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-md font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      role="button"
                    >
                      Generate Form ✨
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-3xl tracking-tighter font-bold mb-6 text-gray-800">AI Form Generator</DialogTitle>
                        <DialogDescription>Enter your prompt</DialogDescription>
                      </DialogHeader>
                      <AiPromptForm />
                    </DialogContent>
                  </Dialog>

                  <Link 
                    href="/dashboard" 
                    className="inline-flex items-center justify-center border-2 px-6 py-3 border-gray-200 rounded-md hover:bg-gray-50 transition-all duration-200"
                  >
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <Link 
                  href="/auth/login" 
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-md font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-md font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Sign in to get started 🔑
                </Link>
              )}
            </div>

            <p className="my-8 text-base text-gray-500">3 Free trials · No credit card required</p>
          </div>
        </div>

        <div className="pb-12 bg-white">
          <div className="relative">
            <div className="absolute inset-0 h-2/3"></div>
            <div className="relative mx-auto">
              <div className="lg:max-w-6xl lg:mx-auto">
                <ShineBorder
                  borderWidth={2}
                  color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                  <Image
                    className="transform"
                    src="/formgenius_hero.png"
                    alt=""
                    width={1200}
                    height={675}
                  />
                </ShineBorder>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}