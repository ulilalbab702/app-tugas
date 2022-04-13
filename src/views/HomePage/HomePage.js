import React, { useEffect, useState } from "react";
import "./style/index.scss";
import { bgFeature } from "../../assets/images";
import { MENU } from "../../constants/menu";

const idleTimeout = 1800000; // 30 menit
let failedCount = 0;
let loginLocked = false;
let timer = {
  minute: 0,
  second: 10,
};
let interval;
const HomePage = (props) => {
  const [listFitur, setListFitur] = useState([]);
  const [isSeeMore, setIsSeemore] = useState(false);


  

  
  
 

  useEffect(() => {
    async function fetchFitur() {
      await props.fetchGetFiturUTConnect();
    }
    fetchFitur();
  }, [])

  useEffect(() => {
    if (props.dataFitur){
      console.log("DATAMASUK", JSON.stringify(props))
    } else {
      console.log("DATAKELUAR", JSON.stringify(props))
    }
    
  }, [props.dataFitur])



  const _renderPartTransactionOnline = () => {
    if (!listFitur || listFitur?.length === 0) {
      return null;
    } else {
      return (
        <div style={{ marginTop: '2rem' }}>
          <h2
            className="titleLanding"
            style={{ marginTop: 0 }}
          >Tentang UT CONNECT</h2>
          <p className="textLanding">UT Connect adalah aplikasi yang dikembangkan untuk memberikan layanan terbaik bagi pelanggan United Tractors</p>
          <hr className="lineYellow" />
          <div className="con-fitur-list">
            {listFitur.map((fitur, index) => (
              <div className="cardPart" style={{ background: `url(${bgFeature})` }} key={index}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', width: '100%' }}>
                  <div className="borderPart1" />
                  <div className="borderPart2" />
                  <div className="borderPart3" />
                </div>
                <div className="conColor" />
                <div className="decsPart">
                  <img src={fitur.icon} style={{ height: '3.6vw', width: 'auto', margin: '0 auto' }} />
                  <h5>{fitur.name}</h5>
                  <h6>{fitur.description}</h6>
                  <span
                    className="descBtn"
                  >Masuk</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            {isSeeMore ?
              <span
                className="see-more-fitur"
              >Lihat Lebih Banyak</span>
              : null}
          </div>
        </div>
      );
    };
  };
 

  return (
    <>
      <div className='containerHome' style={{ marginTop: '5rem' }}>
        <div style={{ paddingTop: '2rem', backgroundColor: '#F1F1F1' }} />
        {_renderPartTransactionOnline()}
      </div>
    </>
  );
};

export default HomePage;
