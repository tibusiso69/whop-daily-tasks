export const metadata = {
  title: "Whop Daily Tasks",
  description: "Daily objectives and streak tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
