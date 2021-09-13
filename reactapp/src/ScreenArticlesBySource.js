import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  const [articleList, setArticleList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  var { id } = useParams();

  useEffect(() => {
    const findArticles = async () => {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=20681a329a334e6d833de01dd3ae1d0d`
      );
      const body = await data.json();
      setArticleList(body.articles);
    };

    findArticles()    
  },[]);


  var addArticle =  async (article) => {

    props.addToWishList(article);

    const response = await fetch('/wishlist-article', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `article=${JSON.stringify(article)}&token=${props.token}&language=${props.language}`
    });

  }

  var showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  var handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  var handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  const articleListeMap = articleList.map((article, i) => {
    const found = props.myArticles.find(
      (element) => element.title === article.title
    );
    var colorLike;

    if (found) {
      colorLike = { color: "#e74c3c", cursor: "pointer" };
    } else {
      colorLike = { cursor: "pointer" };
    }

    return (
      <div key={i} style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: 300,
            margin: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          cover={<img alt="example" src={article.urlToImage} />}
          actions={[
              <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content)} />,
              <Icon type="like" key="ellipsis" style={colorLike} onClick={ () => addArticle(article, props.language) } />
          ]}
        >
          <Meta title={article.title} description={article.description} />
        </Card>

        <Modal
          title={title}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{content}</p>
        </Modal>
      </div>
    );
  });

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="Card">{articleListeMap}</div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({ type: "addArticle", objetArticle: article });
    },
  };
}

function mapStateToProps(state) {
  return { myArticles: state.articleWishlist, token: state.token , language: state.selectedLang }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
