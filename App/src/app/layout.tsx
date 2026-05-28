import * as React from 'react'

export const metadata = {
  title: 'UCSC Grad Ticket Connector',
  icons: {
    icon: '/2-bump-ticket-filled.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#68676c', margin: 0 }}>{children}</body>
    </html>
  )
}
