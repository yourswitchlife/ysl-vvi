export default async function mainCheckLogin(context) {
  const res = await fetch('http://localhost:3005/api/member/auth-status', {
    credentials: 'include',
    headers: {
      Cookie: context.req.headers.cookie || '',
    },
  });

  const data = await res.json();
  console.log(data);

/*   if (!data.isLoggedIn) {
    return {
      redirect: {
        destination: '/member/login',
        permanent: false,
      },
    };
  } */

  if (data.isLoggedIn) {
    if (context.req.url === '/member/login' || context.req.url === '/member/register') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
