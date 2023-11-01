//component
import EventsDetails from "../../container/eventsActivities/EventsDetails";
//service
import { fetchService } from "../../services/fetchService";
//constant
import { CONST } from "../../constant";
//router
// import { useRouter } from "next/router";

export default function ServiceTypes({
  eventData,
  eventsData,
  servicesActivities,
  footer,
}) {
  let social = [];
  let others = [];
  let quick = [];

  footer?.data?.map((data) => {
    if (data.FooterType === "SocialMedia") {
      social.push(data);
    } else if (data.FooterType === "QuickLinks") {
      quick.push(data);
    } else {
      others.push(data);
    }
  });
  return (
    <EventsDetails
      eventData={eventData}
      eventsData={eventsData.data}
      servicesActivities={servicesActivities}
      socialMediaIcon={social}
      footerLinkUrl={quick}
      otherResoruces={others}
    />
  );
}

// StaticPath
export async function getStaticPaths() {
  let eventsUrl = process.env.BASE_URL + process.env.PATH.EVENTS;
  const [eventsData] = await Promise.all([
    await fetchService(eventsUrl, CONST.API_METHOD.GET),
  ]);
  const paths = eventsData.data.map((eventData) => {
    return {
      params: {
        id: eventData.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

// StaticProp
export async function getStaticProps(context) {
  let eventsUrl = process.env.BASE_URL + process.env.PATH.EVENTS;
  let servicesActivitiesUrl =
    process.env.BASE_URL + process.env.PATH.SERVICES_ACTIVITIES;
  let footerUrl = process.env.BASE_URL + process.env.PATH.FOOTER;

  const [eventsData, servicesActivities, footer] = await Promise.all([
    await fetchService(eventsUrl, CONST.API_METHOD.GET),
    await fetchService(servicesActivitiesUrl, CONST.API_METHOD.GET),
    await fetchService(footerUrl, CONST.API_METHOD.GET),
  ]);
  const id = context.params.id;
  //Finding Ids
  const eventData = eventsData?.data?.find(
    (eventData) => eventData.id.toString() === id
  );
  // Id Not Found
  if (!eventData) {
    return {
      redirect: {
        destination: "/events",
        permanent: false,
      },
    };
  }

  return {
    props: {
      eventData,
      eventsData,
      servicesActivities,
      footer,
    },
    revalidate: 1,
  };
}
