import HeroHome from '@/components/home/HeroHome'
import HomeServices from '@/components/home/HomeServices'
import HowToHome from '@/components/home/HowToHome'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroHome />
      <HomeServices />
      <HowToHome />
    </main>
  )
}
