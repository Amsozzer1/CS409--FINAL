import { useState, useCallback } from "react";
import LoginInPage from "/";
import PortalPopup from "./PortalPopup";
import ResultPage from "./ResultPage";
import AdvancedSearchPage from "./AdvancedSearchPage";
import "./MainPage.css";

const MainPage = () => {
  const [isLoginInPageOpen, setLoginInPageOpen] = useState(false);
  const [isResultPageOpen, setResultPageOpen] = useState(false);
  const [isAdvancedSearchPageOpen, setAdvancedSearchPageOpen] = useState(false);
  const [isAdvancedSearchPage1Open, setAdvancedSearchPage1Open] =
    useState(false);

  const onMapIcon1Click = useCallback(() => {
    // Please sync "Bus stop information" to the project
  }, []);

  const openLoginInPage = useCallback(() => {
    setLoginInPageOpen(true);
  }, []);

  const closeLoginInPage = useCallback(() => {
    setLoginInPageOpen(false);
  }, []);

  const onCalendarIcon1Click = useCallback(() => {
    // Please sync "Calender Page" to the project
  }, []);

  const openResultPage = useCallback(() => {
    setResultPageOpen(true);
  }, []);

  const closeResultPage = useCallback(() => {
    setResultPageOpen(false);
  }, []);

  const openAdvancedSearchPage = useCallback(() => {
    setAdvancedSearchPageOpen(true);
  }, []);

  const closeAdvancedSearchPage = useCallback(() => {
    setAdvancedSearchPageOpen(false);
  }, []);

  const openAdvancedSearchPage1 = useCallback(() => {
    setAdvancedSearchPage1Open(true);
  }, []);

  const closeAdvancedSearchPage1 = useCallback(() => {
    setAdvancedSearchPage1Open(false);
  }, []);

  return (
    <>
      <div className="main-page">
        <img className="image-2-icon" alt="" src="/image-2@2x.png" />
        <div className="main-page-child" />
        <img className="map-icon2" alt="" src="/map2.svg" />
        <img className="main-page-item" alt="" src="/ellipse-18.svg" />
        <div className="bus-stop-navigator2">BUS STOP Navigator</div>
        <img className="user-icon2" alt="" src="/user2.svg" />
        <img className="menu-icon2" alt="" src="/menu2.svg" />
        <img className="calendar-icon2" alt="" src="/calendar2.svg" />
        <img className="search-icon2" alt="" src="/search2.svg" />
        <div className="main-page-inner" />
        <div className="main-page-child1" />
        <div className="main-page-child2" />
        <div className="main-page-child3" />
        <div className="main-page-child4" />
        <img className="image-2-icon" alt="" src="/image-3@2x.png" />
        <div className="main-page-child" />
        <img className="search-icon2" alt="" src="/search3.svg" />
        <img
          className="map-icon3"
          alt=""
          src="/map3.svg"
          onClick={onMapIcon1Click}
        />
        <img className="main-page-item" alt="" src="/ellipse-22.svg" />
        <div className="bus-stop-navigator2">BUS STOP Navigator</div>
        <img
          className="user-icon3"
          alt=""
          src="/user3.svg"
          onClick={openLoginInPage}
        />
        <img className="menu-icon2" alt="" src="/menu3.svg" />
        <img
          className="calendar-icon3"
          alt=""
          src="/calendar3.svg"
          onClick={onCalendarIcon1Click}
        />
        <div className="main-page-child7" />
        <img className="rectangle-icon" alt="" src="/rectangle-4225.svg" />
        <img
          className="search-icon4"
          alt=""
          src="/search4.svg"
          onClick={openResultPage}
        />
        <div className="advanced-search" onClick={openAdvancedSearchPage}>
          Advanced search
        </div>
        <div className="ellipse-div" onClick={openAdvancedSearchPage1} />
        <div className="destination">Destination</div>
      </div>
      {isLoginInPageOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeLoginInPage}
        >
          <LoginInPage onClose={closeLoginInPage} />
        </PortalPopup>
      )}
      {isResultPageOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeResultPage}
        >
          <ResultPage onClose={closeResultPage} />
        </PortalPopup>
      )}
      {isAdvancedSearchPageOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAdvancedSearchPage}
        >
          <AdvancedSearchPage onClose={closeAdvancedSearchPage} />
        </PortalPopup>
      )}
      {isAdvancedSearchPage1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAdvancedSearchPage1}
        >
          <AdvancedSearchPage onClose={closeAdvancedSearchPage1} />
        </PortalPopup>
      )}
    </>
  );
};

export default MainPage;
