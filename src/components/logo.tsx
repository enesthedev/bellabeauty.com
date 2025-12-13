import Image from 'next/image'
import LogoImage from '../seed/assets/belle-guzellik.png'

export default function Logo({ className }: { className?: string }) {
  return <Image src={LogoImage} alt="Belle Güzellik" className={className} />
}
