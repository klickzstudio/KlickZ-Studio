export const metadata = {
  title: 'AinZ Studio - CMS',
  description: 'Manage your photography portfolio content.',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
