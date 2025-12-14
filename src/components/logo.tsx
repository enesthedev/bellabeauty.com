import LogoImage from '@/assets/belle-guzellik.png'
import Image from 'next/image'

export default function Logo({ className }: { className?: string }) {
  return <Image src={LogoImage} alt="Belle Güzellik" className={className} />
}
