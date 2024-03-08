export default async function mainCheckToLogin(context) {
  const res = await fetch('http://localhost:3005/api/member/auth-status', {
    credentials: 'include',
    headers: {
      Cookie: context.req.headers.cookie || '',
      /* 'Content-Type': 'application/json', */
    },
  });

  const data = await res.json();
  console.log(data);

  if (!data.isLoggedIn) {
    return {
      redirect: {
        destination: '/member/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
