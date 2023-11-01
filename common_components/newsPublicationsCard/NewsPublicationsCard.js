import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Skeleton } from "antd";
import useInView from "react-cool-inview";
//animation
import { fadeIn } from "react-animations";
import { StyleSheet, css } from "aphrodite";
//css
import styles from "./news-publications-card.module.sass";

const animationStyles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: "2s",
  },
});

export default function NewsPublicationsCard({ data }) {
  const router = useRouter();
  const base_url = process.env.BASE_URL;
  // const { observe, unobserve, inView, scrollDirection, entry } = useInView({
  //   threshold: 0.25, // Default is 0
  //   onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
  //     // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]

  //     unobserve(); // To stop observing the current target element
  //     observe(); // To re-start observing the current target element
  //   },
  //   onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
  //     // Triggered when the target enters the viewport
  //   },
  //   onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
  //     // Triggered when the target leaves the viewport
  //   },
  //   // More useful options...
  // });

  return (
    <div /* ref={observe} className={inView ? css(animationStyles.fadeIn) : ""} */
    >
      <div className={`${styles.whats_new_card} m-auto p-4`}>
        <div
          className={`${styles.whats_new_card_image} position-relative mb-3 overflow-hidden`}
        >
          {data && data.attributes.Attachments.data[0].attributes.url ? (
            <Image
              // src={base_url + data.Image[0].url}
              src={`${process.env.IMG_URL}${data.attributes.Attachments.data[0].attributes.url}`}
              alt="card-img"
              width={800}
              height={800}
              layout="responsive"
              // layout="fill"
            />
          ) : (
            <Skeleton.Image className={`${styles.skeleton_Img}`} />
          )}
        </div>
        {
          <div className={`${styles.whats_new_card_text}`}>
            <h3>
              {data && data.attributes.Title ? (
                data.attributes.Title
              ) : (
                <Skeleton.Input />
              )}
            </h3>
            <div className={`${styles.news_des}`}>
              {data.attributes.Description ? (
                data.attributes.Description
              ) : (
                <Skeleton />
              )}
            </div>
          </div>
        }
        <Button
          className={`${styles.whats_new_card_btn}`}
          onClick={(e) => {
            router.push(`/news-publications/${data.id}`);
          }}
        >
          <h6 className={`m-0`}>READ MORE</h6>
        </Button>
      </div>
    </div>
  );
}
