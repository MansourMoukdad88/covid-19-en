import React, { Component } from 'react'
import "../App.css"
export default class InstructionTicker extends Component {

  state={
    title:null,
    url:null
  }

  componentDidMount = () => {
    fetch("https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=f869bbb8172a4c53b25182b5fed0ca61")
    .then(response => response.json())
    .then(data => {
      let articleTitle = [];
      let articleURL =[]
      let articles = data.articles.forEach((article) => {
        if(article.title.includes("corona" || "covid-19")) {
          let title = "| " + article.title + " |"
          let url = article.url + " ";

          articleTitle.push(title);
          articleURL.push(url);
        } 
        this.setState({title:articleTitle, url:articleURL})
      })      
    })
  }

  // clickHandler = (e) => {
  //   e.preventDefault()
  //   console.log( "ddddddddddd",e, this.state.url);
    
  // }
  render() {
    let {title, url} = this.state;
    // console.log("title", title);
    // console.log("URL", url);
    
    return (
      <div className="tcontainer">
        <div className="ticker-wrap">
        <div className="ticker-move">
          <div className="ticker-item"><a className="news" href={url}>{title}</a> </div>
        </div>
      </div>
      </div>
    )
  }
}


