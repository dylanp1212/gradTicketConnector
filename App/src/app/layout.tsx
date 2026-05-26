import * as React from 'react'

export const metadata = {
  title: 'Grad Ticket Connector',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
