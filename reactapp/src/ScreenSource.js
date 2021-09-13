import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);
  const [selectedLang, setSelectedLang] = useState(props.selectedLang);

  const [flagBorderFr, setFlagBorderFr] = useState({
    border: "10px solid grey", borderRadius: "100%"
  });
  const [flagBorderEn, setFlagBorderEn] = useState({});

  

  useEffect(() => {
    const APIResultsLoading = async () => {
      var country = "fr";
      var langue = "fr";

      if (selectedLang == "gb") {
        setFlagBorderEn({ border: "2px solid grey" , borderRadius: "100%" });
        setFlagBorderFr({});
        country = "gb";
        langue = "en";
      } else {
        setFlagBorderEn({});
        setFlagBorderFr({ border: "2px solid grey", borderRadius: "100%" });
      }

      const sendLanguageToDb = await fetch("/addToDb", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `language=${selectedLang}&token=${props.token}`,
      });

      props.changeLang(selectedLang);

      const data = await fetch(
        `https://newsapi.org/v2/sources?&country=${country}&language=${langue}&apiKey=20681a329a334e6d833de01dd3ae1d0d`
      );
      const body = await data.json();
      setSourceList(body.sources);
    };

    APIResultsLoading();
  }, [selectedLang]);

  return (
    <div>
      <Nav />
      <div className="Banner">
        <button className="resetBtn" onClick={() => setSelectedLang("fr")}>
          <img
            style={flagBorderFr}
            className="w-drap"
            src="/images/france.png"
            alt="drapeau français"
          />
        </button>
        <button className="resetBtn" onClick={() => setSelectedLang("gb")}>
          <img
            style={flagBorderEn}
            className="w-drap"
            src="/images/anglais.png"
            alt="drapeau anglais"
          />
        </button>
      </div>

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(source) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${source.category}.png`} />}
                title={
                  <Link to={`/screenarticlesbysource/${source.id}`}>
                    {source.name}
                  </Link>
                }
                description={source.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { selectedLang: state.selectedLang, token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLang: function (selectedLang) {
      dispatch({ type: "changeLang", selectedLang: selectedLang });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
