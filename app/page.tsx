import Image from "next/image";

export default function Home() {
  return (
    <div className="home-shell">
      <main className="home-main">
        <div className="home-content">
          <h1>To get started, edit the page.tsx file.</h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app">
              Templates
            </a>{" "}
            or the{" "}
            <a href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app">
              Learning
            </a>{" "}
            center.
          </p>
        </div>
      </main>
    </div>
  );
}
