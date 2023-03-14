import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import AOS from "aos";
import { getCarCategory } from "../../features/Category/categorySlice";
import "./style.css";
import "aos/dist/aos.css";

export const Home: React.FC = (): JSX.Element => {
  const location = useLocation();
  const fixed = useRef<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.category.arrCar);
  const [scroll, setScroll] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const arr: string[] = [
    "img/modelshome.png",
    "img/model3home.png",
    "img/modelxhome.png",
    "img/modelyhome.png",
    "img/solarroof.png",
    "img/solarpanel.png",
  ];
  const mobile: string[] = [
    "img/modelsmobile.png",
    "img/model3mobile.png",
    "img/modelxmobile.png",
    "img/modelymobile.png",
    "img/solarroofmobile.png",
    "img/solarpanelmobile.png",
  ];

  useEffect(() => {
    const body: any = document.querySelector('body');
    if (location.pathname == '/' && window.innerWidth > 902) {
      body.style.overflowY = 'hidden';
    } else {
      body.style.overflowY = 'auto';
    }
  }, [width]);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.scrollTo(0, 0);
    dispatch(getCarCategory())
      .then((res: any) => null)
      .catch((e: any) => console.log(e));
    AOS.init();
    AOS.refresh();
  }, []);

  window.onresize = () => {
    setWidth(window.innerWidth);
  };

  window.onkeyup = (e) => {
    const { innerHeight } = window;

    if (location.pathname === "/" && window.innerWidth > 902) {
      if (e.key === "ArrowDown") {
        if (scroll === 0) {
          window.scrollTo(0, innerHeight);
          setScroll(scroll + innerHeight);
        } else {
          if (scroll >= innerHeight * 7) {
          } else {
            window.scrollTo(0, scroll + innerHeight);
            setScroll(scroll + innerHeight);
          }
        }
      } else if (e.key == "ArrowUp") {
        if (scroll != 0) {
          window.scrollTo(0, scroll - window.innerHeight);
          setScroll(scroll - window.innerHeight);
        }
      }
    }
  };

  return (
    <div className="home">
      <button
        ref={fixed}
        onClick={() => {
          setScroll(0);
          window.scrollTo(0, 0);
        }}
        className="absolute"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="black"
          className="bi bi-arrow-up"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </button>
      {data ? (
        data[0]?.child.map((e: any, id: number) => {
          return (
            <section
              key={id}
              style={{
                backgroundImage: `url(${width < 740 ? mobile[id] : arr[id]})`,
              }}
            >
              <div
                data-aos="fade-up"
                style={{ display: "grid", justifyContent: "center" }}
              >
                <Button
                  style={{ display: window.innerWidth < 902 ? "none" : "" }}
                  onClick={() => {
                    if (scroll != 0) {
                      window.scrollTo(0, scroll - window.innerHeight);
                      setScroll(scroll - window.innerHeight);
                    }
                  }}
                  variant="link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    className="bi bi-caret-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
                  </svg>
                </Button>
                <h1>{e.name}</h1>
              </div>
              <div style={{ display: "grid", justifyContent: "center" }}>
                <div className="homebuttons">
                  <Button
                    onClick={() => navigate("/buy" + e.path)}
                    data-aos="fade-right"
                    style={{ background: "gray", color: "whitesmoke" }}
                  >
                    Order Now
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/model" + e.path);
                    }}
                    data-aos="fade-left"
                    style={{ background: "whitesmoke", color: "gray" }}
                  >
                    Learn More
                  </Button>
                </div>
                <Button
                  style={{
                    margin: "auto",
                    display: window.innerWidth < 902 ? "none" : "",
                  }}
                  onClick={() => {
                    if (!scroll) {
                      window.scrollTo(0, window.innerHeight);
                      setScroll(scroll + window.innerHeight);
                    } else {
                      window.scrollTo(0, scroll + window.innerHeight);
                      if (scroll >= window.innerHeight * 6) {
                      } else {
                        setScroll(scroll + window.innerHeight);
                      }
                    }
                  }}
                  variant="link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    className="bi bi-caret-down"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                  </svg>
                </Button>
              </div>
            </section>
          );
        })
      ) : (
        <></>
      )}
      <section
        style={{
          height: "90vh",
          backgroundImage: "url('img/accessories.png')",
          gap: "120px",
        }}
      >
        <div
          style={{ display: "grid", justifyContent: "center" }}
          data-aos="fade-down"
        >
          <Button
            style={{
              margin: "0",
              padding: "0",
              display: window.innerWidth < 902 ? "none" : "",
            }}
            onClick={() => {
              if (scroll != 0) {
                window.scrollTo(0, scroll - window.innerHeight);
                setScroll(scroll - window.innerHeight);
              }
            }}
            variant="link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="black"
              className="bi bi-caret-up"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
            </svg>
          </Button>
          <h1>Accessories</h1>
        </div>
        <div style={{ display: "grid" }}>
          <Button
            onClick={() => {
              navigate("/shop");
            }}
            data-aos="fade-up"
            style={{ background: "black", color: "whitesmoke" }}
          >
            Shop Now
          </Button>
        </div>
      </section>
    </div >
  );
};
