import Image from "next/image";
import { useEffect, useState } from "react";
import VideoThumbnail from "react-video-thumbnail";
import moment from "moment";
import { Button } from "antd";
//component
import AppSlider from "../../../common_components/appSlider/AppSlider";
import VideoPlayerModal from "../../../common_components/appModal/videoPlayerModal/VideoPlayerModal";
//css
import styles from "./banner.module.sass";

function isMediaVideo(url) {
  let mediaFormat = url.split(".")[1];
  switch (mediaFormat.toLowerCase()) {
    case "mp4":
      return true;
  }
}

export default function Banner({ bannerData }) {
  const [autoPlay, setAutoPlay] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [play, setPlay] = useState(false);

  //expire date banner should be filtered out
  let filteredBannerData = bannerData.data.filter((banner) => {
    return (
      new Date(banner.attributes.Expiration).getTime() > new Date().getTime()
    );
  });

  return (
    <>
      <AppSlider
        btnIcon={`/context/slider_btn_icon_light.svg`}
        showIndicators={true}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        stopOnHover={true}
      >
        {filteredBannerData?.map((banner, index) => (
          <div className={`${styles.banner_container}`} key={"banner" + index}>
            {banner?.attributes?.BannerType?.toLowerCase() === "image" ? (
              <>
                <div className={`${styles.banner_shade}`}></div>
                <div
                  className={`d-flex justify-content-center align-items-center overflow-hidden`}
                >
                  {banner?.attributes?.Attachments?.data &&
                    banner?.attributes?.Attachments?.data?.map(
                      (data, index) => {
                        return (
                          <div
                            className={`${styles.banner_container_shade} d-block w-100 h-100`}
                            key={"banner" + index}
                          >
                            <Image
                              // src={
                              //   // process.env.BASE_URL + banner.attributes.Image[0].url
                              //   process.env.IMG_URL + data.attributes.url
                              // }
                              src={`${process.env.IMG_URL}${data.attributes.url}`}
                              alt={data.attributes.hash}
                              width={1920}
                              height={1080}
                              layout="responsive"
                            />
                          </div>
                        );
                      }
                    )}
                </div>
              </>
            ) : (
              <>
                <div className={`${styles.video_thumbnail_container}`}>
                  <div
                    className={`${styles.video_play_btn}`}
                    onClick={() => {
                      // console.log(process.env.BASE_URL + banner.Image[0].url);
                      setVideoUrl(banner.attributes.VideoLink);
                      setPlay(true);
                      setModalVisibility(true);
                      setAutoPlay(false);
                    }}
                  >
                    <i
                      className={`fa fa-play ${styles.play_icon}`}
                      aria-hidden="true"
                    ></i>
                  </div>

                  {banner.attributes.Attachments.data &&
                    banner.attributes.Attachments.data.map((data) => {
                      <Image
                        // src={
                        //   // process.env.BASE_URL + banner.attributes.Image[0].url
                        //   process.env.IMG_URL + data.attributes.url
                        // }
                        src={`${process.env.IMG_URL}${data.attributes.url}`}
                        alt={data.attributes.hash}
                        width={1920}
                        height={1080}
                        layout="responsive"
                      />;
                    })}
                </div>
              </>
            )}
            <div className={`legend ${styles.text}`}>
              <div className={`pl-4`}>
                <h1 className={`${styles.text_title} mb-4`}>
                  {banner.attributes.Title && banner.attributes.Title}
                </h1>
                <p className={`${styles.text_des} mb-4`}>
                  {banner.attributes.Description &&
                  banner.attributes.Description.length > 100
                    ? `${banner.attributes.Description.substring(0, 100)}...`
                    : banner.attributes.Description}
                </p>
                <p className={`${styles.text_time}`}>
                  {`${moment(banner.attributes.CreatedDate).format(
                    "MMMM DD"
                  )} - ${moment(banner.attributes.Expiration).format(
                    "MMMM DD"
                  )}`}
                </p>
                {banner.attributes.RegistrationLink && (
                  <Button
                    shape="round"
                    size={"large"}
                    className={`${styles.text_button}`}
                    onClick={() =>
                      window.open(banner.attributes.RegistrationLink)
                    }
                  >
                    Register Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </AppSlider>
      {play && (
        <VideoPlayerModal
          url={videoUrl}
          setVisiblety={setModalVisibility}
          visible={modalVisibility}
          play={play}
          setPlay={setPlay}
          setAutoPlay={setAutoPlay}
        />
      )}
    </>
  );
}
