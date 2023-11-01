import OfferSection from "../../components/offersComp/OfferSection";
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
//css
import styles from "./offers.module.sass";

export default function OffersContainer({ offers }) {
  return (
    <>
      <Layout
        // socialMediaIcon={socialMediaIcon}
        // footerLink={footerLink}
        // otherResoruces={otherResoruces}
        ogTitle={`IsDB - Rewards Application`}
        title={`Rewards App`}
      >
        <div className={`position-relative`}>
          <div className={`${styles.bg_color}`}></div>
          <div
            className={`${styles.bg_pattern}`}
            style={{
              backgroundImage: `url(/hero.svg),url(/Dotted-line-path-301.svg)`,
            }}
          ></div>
          <div className="container">
            <InnerPageTitleSection title={"Reward Application"} />
          </div>
          <OfferSection offers={offers} />
        </div>
      </Layout>
    </>
  );
}
