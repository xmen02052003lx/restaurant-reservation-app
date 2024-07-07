import React from "react"
import Rating from "../components/Rating"
import restaturantImage from "../assets/hinhanhnhahang.jpg"
import tableImage from "../assets/hinhanhbanan.jpg"
import plateImage from "../assets/diathucan.jpg"
import vegetablesTableImage from "../assets/hinhanhbanraucu.jpg"
import chicken from "../assets/chicken.jpg"
import pastawithfish from "../assets/pastawithfish.jpg"
import ramen from "../assets/ramen.jpg"
import spaghetti from "../assets/spaghetti.jpg"
import vegetariansoup from "../assets/vegetariansoup.jpg"
import thitca from "../assets/thitca.jpg"
import steak from "../assets/steak.jpg"
import rautuoi from "../assets/rautuoi.jpg"
import "./HomeScreen.css"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import Row from "react-bootstrap/Row"
import { TfiCheckBox } from "react-icons/tfi"
import { PiChefHatThin } from "react-icons/pi"
import { IoFastFoodOutline } from "react-icons/io5"
import { SiCodechef } from "react-icons/si"

const HomeScreen = () => {
  return (
    <>
      <div className="entry mt-5">
        <div className="image-container">
          <div className="block-superior">
            <Image
              className="entry-image"
              src={restaturantImage}
              fluid
              alt="hinh anh nha hang"
            />
          </div>
          <div className="centered-text">
            <h1 className="entry-title special-font">Nhà Hàng</h1>
            <p className="mt-2" style={{ fontWeight: "500" }}>
              STEAK HOUSE
            </p>
            <button className="custom-button mt-4">Đặt bàn</button>
          </div>
        </div>
      </div>
      <Row className="mt-1">
        <Col md={6} xs={6}>
          <p className="ps-4">
            <span className="fw-bold">ĐỊA CHỈ</span>{" "}
            <span>: Số 1 Đường Bùi Thị Xuân Quận 1 TP.HCM</span>
          </p>
        </Col>
        <Col md={6} xs={6}>
          <p className="text-end pe-4">
            <span className="fw-bold">EMAIL</span>
            <span>: datban@restaurant.com</span>
          </p>
        </Col>
      </Row>
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6}>
            <h2 className="ps-4 special-font display-5">Về CHÚNG TÔI</h2>
            <h3 className="ps-5">STEAK HOUSE</h3>
            <Row className="ps-5">
              <Col md={6}>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Iusto, ullam. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </p>
              </Col>
              <Col md={6}>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Iusto, ullam. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </p>
              </Col>
            </Row>
            <button
              className="custom-button ms-5 mt-3"
              style={{ fontWeight: "light" }}
            >
              Đặt bàn
            </button>
            <Row className="pt-5">
              <Col md={4} className="mb-3">
                <Image src={thitca} fluid />
              </Col>
              <Col md={4} className="mb-3">
                <Image src={steak} fluid />
              </Col>
              <Col md={4} className="mb-3">
                <Image src={rautuoi} fluid style={{ height: "100%" }} />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Image src={tableImage} className="tableImage" fluid />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xl={6} className="service">
            <Image src={plateImage} />
          </Col>
          <Col xl={6} className="service">
            <div>
              <h3 className="specialities">
                <PiChefHatThin color="orange" /> Vẻ đẹp nghệ thuật trong dịch vụ
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis maxime harum maiores consequatur amet architecto
                libero temporibus accusamus exercitationem veniam!
              </p>
            </div>
            <Container>
              <Row>
                <Col md={6}>
                  <Row className="">
                    <Col md={3} className="p-0">
                      <IoFastFoodOutline color="orange" size={70} />
                    </Col>
                    <Col md={9} xs={12} className="column-with-border">
                      <p className="mb-1 sub-specialities">
                        Chất lượng Thực phẩm tổt nhất
                      </p>
                      <p>Phong cách trang trí nghệ thuật</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={3} className="p-0">
                      <SiCodechef color="orange" size={70} />
                    </Col>
                    <Col md={9} className="">
                      <p className="mb-1 sub-specialities">
                        Đầu bếp chuyên nghiệp
                      </p>
                      <p>Thực hiện món ăn của bạn</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <button className="custom-button mt-5">Đặt bàn</button>
          </Col>
        </Row>
      </Container>
      <Row className="mb-5 pt-5">
        <Col md={6} className="text-center dark-background text-white">
          <p className="fs-5 fw-bold">LIÊN HỆ CHÚNG TÔI TẠI :</p>
          <p>Số 1 đường Bùi Thị Xuân Q1 TP.HCM</p>
          <p>SĐT</p>
          <p>datban@email.com</p>
        </Col>
        <Col md={6} className="mt-3 text-center pink-background text-white">
          <p className="fs-5 fw-bold">GIỜ MỞ CỬA :</p>
          <p>THỨ 2 ĐẾN THỨ 6: 14:00 ĐẾN 24:00 </p>
          <p>THỨ 7/CHỦ NHẬT: 20:00 ĐẾN 4:00 </p>
        </Col>
      </Row>
      <Container className="mb-5">
        <h2 className="text-center mb-5 specialities">Đặc Sản</h2>
        <Row className="mb-3">
          <Col md={6}>
            <Row>
              <Col md={4}>
                <Image src={pastawithfish} fluid />
              </Col>
              <Col md={4} xs={6}>
                <p className="price">Mì ống cá</p>
                <Rating value={5} />
              </Col>
              <Col md={4} xs={6} className="text-end price">
                49K
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={4}>
                <Image src={ramen} fluid />
              </Col>
              <Col md={4} xs={6}>
                <p className="price">RAMEN</p>
                <Rating value={5} />
              </Col>
              <Col md={4} className="text-end price" xs={6}>
                49K
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Row>
              <Col md={4}>
                <Image src={steak} fluid />
              </Col>
              <Col md={4} xs={6}>
                <p className="price">Steak</p>
                <Rating value={5} />
              </Col>
              <Col md={4} xs={6} className="text-end price">
                49K
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={4}>
                <Image src={chicken} fluid />
              </Col>
              <Col md={4} xs={6}>
                <p className="price">Ức Gà</p>
                <Rating value={5} />
              </Col>
              <Col md={4} xs={6} className="text-end price">
                49K
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Row>
              <Col md={4}>
                <Image src={spaghetti} fluid />
              </Col>
              <Col md={4} xs={6}>
                <p className="price">Mì Ý</p>
                <Rating value={5} />
              </Col>
              <Col md={4} xs={6} className="text-end price">
                49K
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={4}>
                <Image src={vegetariansoup} fluid />
              </Col>
              <Col md={4} xs={6}>
                <p className="price">Súp Rau Củ</p>
                <Rating value={5} />
              </Col>
              <Col md={4} xs={6} className="text-end price">
                49K
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="image-container">
        <div className="block-inferior mb-5">
          <Image className="image-inferior" src={vegetablesTableImage} fluid />
        </div>
        {/* <div className="overlay"></div> */}
        <Row className="overlay-content">
          <Col md={6}>
            <Row>
              <Col md={6} className="text-end">
                <TfiCheckBox size={50} />
              </Col>
              <Col md={6}>
                <p>LIÊN HỆ ĐẶT BÀN : SĐT</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <button className="custom-button">Đặt bàn</button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeScreen
