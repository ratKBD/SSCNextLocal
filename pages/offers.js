//service
import { fetchService } from "../services/fetchService";
//CONSTANT
import { CONST } from "../constant";
//Container
import OffersContainer from "../container/offers/offersContainer";

export default function Reward({ offersData }) {
  return (
    <>
      <OffersContainer offers={offersData} />
    </>
  );
}

// StaticProp
export async function getStaticProps() {
  let offerUrl = process.env.BASE_URL + process.env.PATH.OFFERS;

  const [offersData] = await Promise.all([
    await fetchService(offerUrl, CONST.API_METHOD.GET),
  ]);
  return {
    props: {
      offersData,
    },
  };
}
