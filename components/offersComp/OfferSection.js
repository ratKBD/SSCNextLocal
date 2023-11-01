import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Col, Row } from "antd";
//Styles
import styles from "./offercomp.module.sass";

export default function OfferSection({ offers }) {
  const [OffersData, setOffersData] = useState(null);
  const base_url = process.env.BASE_URL;

  useEffect(() => {
    let sortedOfferData = offers.data.sort(function (x, y) {
      return x.Priority - y.Priority;
    });
    setOffersData(sortedOfferData);
  }, []);

  return (
    <>
      <Row className={`h-100`}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className={`${styles.offers_container}`}>
            <div
              className={`d-flex justify-content-center align-items-center flex-column`}
            >
              {OffersData &&
                OffersData.length > 0 &&
                OffersData.map((data) => (
                  <div className={`mb-4`}>
                    <Image
                      src={
                        process.env.IMG_URL +
                        data.attributes.Attachments.data[0].attributes.url
                      }
                      alt={"Reward Application Demo"}
                      width={650}
                      height={400}
                      className={`${styles.image}`}
                    />
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
