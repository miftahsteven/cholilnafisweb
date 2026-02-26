import React from "react";

export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)" }}>
      {children}
    </div>
  );
}
