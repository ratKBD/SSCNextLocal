//component
import AboutUs from "../container/aboutUs/AboutUs";
//service
import { fetchService } from "../services/fetchService";
//constant
import { CONST } from "../constant";

export default function AboutUsPage({ sscMemberData, siteVideos, footer }) {
  let social = [];
  let others = [];
  let quick = [];

  footer.data.map((data) => {
    if (data.FooterType === "SocialMedia") {
      social.push(data);
    } else if (data.FooterType === "QuickLinks") {
      quick.push(data);
    } else {
      others.push(data);
    }
  });
  return (
    <>
      <AboutUs
        socialMediaIcon={social}
        sscMemberData={sscMemberData}
        siteVideos={siteVideos}
        footerLink={quick}
        otherResoruces={others}
      />
    </>
  );
}

export async function getStaticProps() {
  let memberUrl = process.env.BASE_URL + process.env.PATH.MEMBERS;
  let siteVideosUrl = process.env.BASE_URL + process.env.PATH.SITEVIDEOS;
  let footerUrl = process.env.BASE_URL + process.env.PATH.FOOTER;

  const [sscMemberData, siteVideos, footer] = await Promise.all([
    await fetchService(memberUrl, CONST.API_METHOD.GET),
    await fetchService(siteVideosUrl, CONST.API_METHOD.GET),
    await fetchService(footerUrl, CONST.API_METHOD.GET),
  ]);

  return {
    props: {
      sscMemberData,
      siteVideos,
      footer,
    },
  };
}
