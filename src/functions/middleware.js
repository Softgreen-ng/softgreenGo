export function isNotLoggedIn({ next, router }) {
    if (!localStorage.getItem('userRefreshToken')) {
      return router.push("/login");
    }
  
    return next();
}

export function isLoggedIn({ next, router }) {
  let t = true
  if (t) {
     router.push("/rent");
  }

  return next();
}