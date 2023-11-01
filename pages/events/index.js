//component
import EventsActivities from "../../container/eventsActivities/EventsActivities";
//service
import { fetchService } from "../../services/fetchService";
//constant
import { CONST } from "../../constant";

export default function EventsActivitiesPage({
  eventsData,
  servicesActivities,
  footer,
}) {
  let social = [];
  let others = [];
  let quick = [];

  footer.data.map((data) => {
    if (data.attributes.FooterType === "SocialMedia") {
      social.push(data);
    } else if (data.attributes.FooterType === "QuickLinks") {
      quick.push(data);
    } else {
      others.push(data.attributes);
    }
  });
  console.log("test-->", eventsData);
  return (
    <>
      <EventsActivities
        eventsData={eventsData}
        servicesActivities={servicesActivities}
        socialMediaIcon={social}
        footerLink={quick}
        otherResoruces={others}
      />
    </>
  );
}

export async function getStaticProps() {
  let eventsUrl = process.env.BASE_URL + process.env.PATH.EVENTS;
  let servicesActivitiesUrl =
    process.env.BASE_URL + process.env.PATH.SERVICES_ACTIVITIES;
  let footerUrl = process.env.BASE_URL + process.env.PATH.FOOTER;

  const [eventsData, servicesActivities, footer] = await Promise.all([
    await fetchService(eventsUrl, CONST.API_METHOD.GET),
    await fetchService(servicesActivitiesUrl, CONST.API_METHOD.GET),
    await fetchService(footerUrl, CONST.API_METHOD.GET),
  ]);

  return {
    props: {
      eventsData,
      servicesActivities,
      footer,
    },
  };
}
