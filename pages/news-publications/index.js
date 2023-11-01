//component
import NewsPublications from "../../container/newsPublications/NewsPublications";
//service
import { fetchService } from "../../services/fetchService";
//constant
import { CONST } from "../../constant";

export default function NewsPublicationsPage({ news, footer }) {
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
      <NewsPublications
        news={news}
        socialMediaIcon={social}
        footerLink={quick}
        otherResoruces={others}
      />
    </>
  );
}

export async function getStaticProps() {
  let newsUrl = process.env.BASE_URL + process.env.PATH.NEWS;
  let footerUrl = process.env.BASE_URL + process.env.PATH.FOOTER;

  const [news, footer] = await Promise.all([
    await fetchService(newsUrl, CONST.API_METHOD.GET),
    await fetchService(footerUrl, CONST.API_METHOD.GET),
  ]);

  return {
    props: {
      news,
      footer,
    },
  };
}
