import Link from "next/link";
export default function NotFound() {
  return (
    <main className="wrap error-page">
      <p className="eyebrow">SCYLLA LIGHTING / 404</p>
      <h1>Let’s find your light.</h1>
      <p>This page could not be found. / 页面未找到。</p>
      <Link className="button" href="/en">
        Back to home / 返回首页 →
      </Link>
    </main>
  );
}
