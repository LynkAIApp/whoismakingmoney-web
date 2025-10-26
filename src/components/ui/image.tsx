import NextImage from 'next/image'
import { cn } from '@/lib/utils'

interface CustomImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function CustomImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  ...props
}: CustomImageProps) {
  return (
    <span className={cn("relative inline-block overflow-hidden rounded-lg shadow-lg my-6", className)} style={{ display: 'block' }}>
      <NextImage
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 400}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className="w-full h-auto object-cover"
        {...props}
      />
      {alt && (
        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-sm block">
          {alt}
        </span>
      )}
    </span>
  )
}

// 用于MDX的简化版本
export function Image({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
  return <CustomImage src={src} alt={alt} {...props} />
}
