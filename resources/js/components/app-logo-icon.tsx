import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/media/belle-guzellik.png"
            alt="Belle Güzellik"
            {...props}
        />
    );
}

