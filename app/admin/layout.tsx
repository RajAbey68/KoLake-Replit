export const metadata = { title: "Admin · Ko Lake Villa" };

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section style={{padding:"1.5rem",fontFamily:"system-ui"}}>
      <header style={{marginBottom:"1rem"}}>
        <h2>Admin</h2>
      </header>
      {children}
    </section>
  );
}
