const PageViewEvent = data => {
  const {
    pageProps: {
      router: { query },
      isSignedIn,
    },
    page,
    isGrid,
    isList,
  } = data

  const { categoryOneSlug, categoryTwoSlug, categoryThreeSlug, categoryFourSlug, sort } = query
  const filter = categoryThreeSlug || categoryFourSlug

  const trackingData = {
    pageData: {
      pageType: page,
      breakpoint: 'Version 1',
      deviceType: navigator.platform,
      browserType: navigator.userAgent,
      userType: isSignedIn ? 'registered' : 'guest',
      viewType: isGrid || isList ? 'Grid' : '',
      ...(categoryOneSlug ? { pageCategory: categoryOneSlug.replace('-', ' ') } : {}),
      ...(categoryTwoSlug ? { pageSubCategory: categoryTwoSlug.replace('-', ' ') } : {}),
      ...(filter ? { filter: filter.replace('-', ' ') } : {}),
      ...(sort ? { sortOrder: sort } : {}),
    },
  }
  return trackingData
}

export default PageViewEvent
