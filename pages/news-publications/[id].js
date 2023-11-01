import { useEffect, useState } from "react";
//service
import { fetchService } from "../../services/fetchService";
//constant
import { CONST } from "../../constant";
//router
import { useRouter } from "next/router";
//Components
import NewsDetails from "../../container/newsPublications/NewsDetails";

export default function NewsTypes({ newsDetails, news, footer }) {
  // const router =useRouter();

  // const id =router.query.id

  //  const newsDetails = news.find(
  //       newsD => newsD.id.toString() === id.toString(),
  //     );

  let social = [];
  let others = [];
  let quick = [];

  footer.data.map((data) => {
    if (data.attributes.FooterType === "SocialMedia") {
      social.push(data);
    } else if (data.attributes.FooterType === "QuickLinks") {
      quick.push(data);
    } else {
      others.push(data);
    }
  });

  return (
    <>
      <NewsDetails
        newsDetails={newsDetails}
        news={news}
        socialMediaIcon={social}
        footerLink={quick}
        otherResoruces={others}
      />
    </>
  );
}

//Static Path
export async function getStaticPaths() {
  let newsUrl = process.env.BASE_URL + process.env.PATH.NEWS;
  const [news] = await Promise.all([
    await fetchService(newsUrl, CONST.API_METHOD.GET),
  ]);
  const paths = news.data.map((newsData) => {
    return {
      params: {
        id: newsData.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

// Static Props
export async function getStaticProps(context) {
  let newsUrl = process.env.BASE_URL + process.env.PATH.NEWS;
  let footerUrl = process.env.BASE_URL + process.env.PATH.FOOTER;

  const [news, footer] = await Promise.all([
    await fetchService(newsUrl, CONST.API_METHOD.GET),
    await fetchService(footerUrl, CONST.API_METHOD.GET),
  ]);
  const id = context.params.id;
  //Finding Ids
  const newsDetails = news.data.find((newsD) => newsD.id.toString() === id);
  if (!newsDetails) {
    return {
      redirect: {
        destination: "/news",
        permanent: false,
      },
    };
  }

  return {
    props: {
      newsDetails,
      news,
      footer,
    },
  };
}
