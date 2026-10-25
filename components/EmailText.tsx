// Renders an email address that, if it must wrap, breaks just before the "@" rather than mid-word.
export default function EmailText({ email }: { email: string }) {
  const at = email.indexOf("@");
  if (at < 0) return <>{email}</>;
  return (
    <>
      {email.slice(0, at)}
      <wbr />
      {email.slice(at)}
    </>
  );
}
