//component
import Landing from "../container/landing/Landing";
//service
import { fetchService } from "../services/fetchService";
//constant
import { CONST } from "../constant";

// import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
// import { useEffect, useState } from "react";

export default function Home({
  eventsData,
  servicesActivities,
  footer,
  news,
  bannerData,
  testimonialsData,
  // siteVideos,
  IsDBGroupLogo,
}) {
  let social = [];
  let others = [];
  let quick = [];

  footer?.data?.map((data) => {
    if (data.attributes.FooterType === "SocialMedia") {
      social.push(data);
    } else if (data.attributes.FooterType === "QuickLinks") {
      quick.push(data);
    } else {
      others.push(data.attributes);
    }
  });

  console.log(
    "apiCheck-->",
    eventsData,
    servicesActivities,
    footer,
    news,
    bannerData,
    testimonialsData,
    // siteVideos,
    IsDBGroupLogo
  );

  return (
    <>
      {/* <ErrorBoundary> */}

      <Landing
        news={news}
        bannerData={bannerData}
        eventsData={eventsData}
        servicesActivities={servicesActivities}
        socialMediaIcon={social}
        testimonialsData={testimonialsData}
        // siteVideos={siteVideos}
        footerLink={quick}
        otherResoruces={others}
        IsDBGroupLogo={IsDBGroupLogo}
      />

      {/* </ErrorBoundary> */}
    </>
  );
}

export async function getStaticProps() {
  let newsUrl = process.env.BASE_URL + process.env.PATH.NEWS;
  let bannerUrl = process.env.BASE_URL + process.env.PATH.BANNER;
  let eventsUrl = process.env.BASE_URL + process.env.PATH.EVENTS;
  let servicesActivitiesUrl =
    process.env.BASE_URL + process.env.PATH.SERVICES_ACTIVITIES;
  let testimonialsUrl = process.env.BASE_URL + process.env.PATH.TESTIMONIS;
  // let siteVideosUrl = process.env.BASE_URL + process.env.PATH.SITEVIDEOS;
  let footerUrl = process.env.BASE_URL + process.env.PATH.FOOTER;
  let groupLogoUrl = process.env.BASE_URL + process.env.PATH.ISDBGROUPLOGO;

  // try {
  const [
    news,
    bannerData,
    eventsData,
    servicesActivities,
    testimonialsData,
    // siteVideos,
    footer,
    IsDBGroupLogo,
  ] = await Promise.all([
    await fetchService(newsUrl, CONST.API_METHOD.GET),
    await fetchService(bannerUrl, CONST.API_METHOD.GET),
    await fetchService(eventsUrl, CONST.API_METHOD.GET),
    await fetchService(servicesActivitiesUrl, CONST.API_METHOD.GET),
    await fetchService(testimonialsUrl, CONST.API_METHOD.GET),
    // await fetchService(siteVideosUrl, CONST.API_METHOD.GET),
    await fetchService(footerUrl, CONST.API_METHOD.GET),
    await fetchService(groupLogoUrl, CONST.API_METHOD.GET),
  ]);

  return {
    props: {
      news,
      bannerData,
      eventsData,
      servicesActivities,
      testimonialsData,
      // siteVideos,
      footer,
      IsDBGroupLogo,
    },
  };
  /*  } catch (error) {
    console.error("Error in data fetching:", error);
    return {
      props: {
        news: [],
        bannerData: {},
        eventsData: {},
        servicesActivities: {},
        testimonialsData: [],
        siteVideos: {},
        footer: {},
        IsDBGroupLogo: {},
      },
    };
  } */
}
