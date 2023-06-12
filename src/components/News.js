import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
 static defaultProps=
 {
  country : 'in',
  pageSize: 8,
  category:'general'
 }
 static propTypes ={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
 }

  constructor() {
    super();
    // console.log("I am a constructore")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    //console.log('cdm')
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2c2d1260b594ab4a3d3c152c0d1e404&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading:false
    });
  }
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2c2d1260b594ab4a3d3c152c0d1e404&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  };
  handleNextClick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResult/this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2c2d1260b594ab4a3d3c152c0d1e404&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      });
    }
  };
  render() {
    //console.log('render')
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:"35px 0px"}}>NewsHub - Top Headline</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePreviousClick}
            className="btn btn-dark"
          >
            &laquo; previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
