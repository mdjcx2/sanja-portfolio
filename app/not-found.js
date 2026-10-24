import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Button from "./components/Button";

export default function NotFound() {
  return (
    <>
      <Nav />

      <main className="not-found-page">
        <div className="container">
          <div className="not-found-inner">
            <span className="not-found-number" aria-hidden="true">404</span>
            <h1 className="not-found-title">Page not found</h1>
            <p className="not-found-sub">
              This page doesn't exist or has been moved.<br />
              Head back and explore the work instead.
            </p>
            <Button href="/" variant="secondary" size="md">
              ← Back to work
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
