import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon} from 'antd';
import Nav from './Nav';

const { Meta } = Card;



function ScreenMyArticles(props) {

  const [langFiltre, setLangFiltre] = useState('fr');

  var filtreLang = (lang) => {
    setLangFiltre(lang);
    console.log(langFiltre);
  }

  var removeToWishList =  async (title) => {

    props.removeToWishListStore(title);

    
    const response = await fetch(`/wishlist-article/${title}/${props.token}`, {
      method: 'DELETE'
    });

  }

  useEffect(() => {
    async function loadData() {

      const response = await fetch('/wishlist-article-view', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.token}&language=${langFiltre}`
      });

      const jsonResponseWish = await response.json();

      console.log('jsonResponseWish.articlesWhishlist', jsonResponseWish.articlesWhishlist);
      props.saveArticles(jsonResponseWish.articlesWhishlist);
    }
    loadData();
  }, [langFiltre]);

  if (props.myArticles.length === 0) {
    return (
      <div>
          
        <Nav/>

        <div className="Banner">
        <button
            className="resetBtn"  onClick={() => filtreLang('fr') }
          >
            <img
              className="w-drap"
              src="/images/france.png"
              alt="drapeau français"
            />
          </button>
          <button
            className="resetBtn"  onClick={() => filtreLang('gb') } 
          >
            <img
              className="w-drap"
              src="/images/anglais.png"
              alt="drapeau anglais"
            />
          </button>
          </div>
        <div className="Card">
          <p>No articles</p>
        </div>

      </div>
    )
  } else {

    return (
      <div>
          
        <Nav/>

        <div className="Banner">
        <button
            className="resetBtn"  onClick={() => filtreLang('fr') } 
          >
            <img
              className="w-drap"
              src="/images/france.png"
              alt="drapeau français"
            />
          </button>
          <button
            className="resetBtn"  onClick={() => filtreLang('gb') } 
          >
            <img
              className="w-drap"
              src="/images/anglais.png"
              alt="drapeau anglais"
            />
          </button>
          </div>

        <div className="Card">
          {props.myArticles.map((article,i) => (
            <div key={i} style={{display:'flex',justifyContent:'center'}}>
              <Card
                style={{  
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                cover={
                <img
                    alt="example"
                    src={article.urlToImage}
                />
                
                }
                
                actions={[
                  <Icon type="read" key="ellipsis2" />,
                  <Icon type="delete" key="ellipsis" onClick={ () => removeToWishList(article.title) } />
                ]}
                >
                  
                <Meta
                  title={article.title}
                  description={article.description}
                />

              </Card>

            </div>
          
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { myArticles: state.articleWishlist, token: state.token}
}

function mapDispatchToProps(dispatch) {
  return {
    removeToWishListStore: function(articleTitle) { 
      dispatch( {type: 'removeArticle', title: articleTitle} );
    },
    saveArticles: function(articles){
      dispatch({type: 'saveArticles',
        articles: articles
      });
    }
  }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ScreenMyArticles);







