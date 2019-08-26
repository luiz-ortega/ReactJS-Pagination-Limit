import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default class src extends Component {
  state = {
    startList: [],
    pages: 20,
    pagesLimit: 10,
    indexStart: 0,
    indexEnd: this.pagesLimit,
    list: [],
    listLimit: [],
    currentPage: 0
  };

  componentDidMount() {
    const pages = 23;
    const startList = [...Array(pages + 1).keys()].slice(1);

    const pagesLimit = 5;
    const indexStart = 0;
    const indexEnd = pagesLimit;

    const listLimit = startList.slice(indexStart, indexEnd);

    this.setState({
      ...this.state,
      pages: pages,
      list: startList,
      listLimit: listLimit,
      startList: startList,
      indexEnd: indexEnd,
      pagesLimit: pagesLimit,
      currentPage: 1
    });
  }

  handleCurrentPageUpdate() {
    const currentPage = this.state.listLimit[
      Math.floor(this.state.listLimit.length / 2)
    ];

    this.setState({
      ...this.state,
      currentPage: currentPage
    });
  }

  handleNext() {
    const listLimitUpdate = this.state.startList.slice(
      this.state.indexStart + this.state.pagesLimit,
      this.state.indexEnd + this.state.pagesLimit
    );

    this.setState({
      ...this.state,
      indexStart: this.state.indexStart + this.state.pagesLimit,
      indexEnd: this.state.indexEnd + this.state.pagesLimit,
      // this.state.pagesLimit.lenght + 1 <= this.state.pages
      //   ? this.state.indexEnd + this.state.pagesLimit
      //   : this.state.indexEnd + this.state.pagesLimit,
      listLimit: listLimitUpdate
    });
  }

  handlePrevious() {
    const listLimitUpdate = this.state.startList.slice(
      this.state.indexStart - this.state.pagesLimit,
      this.state.indexEnd - this.state.pagesLimit
    );

    this.setState({
      ...this.state,
      indexStart: this.state.indexStart - this.state.pagesLimit,
      indexEnd: this.state.indexEnd - this.state.pagesLimit,
      listLimit: listLimitUpdate
    });
  }

  handleOnPageChange(pageNumber, e) {
    this.setState({
      ...this.state,
      currentPage: pageNumber
    });
  }

  render() {
    return (
      <div>
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous href="#" />
          </PaginationItem>

          {this.state.indexStart === 0 ? null : (
            <PaginationItem>
              <PaginationLink onClick={() => this.handlePrevious()}>
                {" "}
                ...{" "}
              </PaginationLink>
            </PaginationItem>
          )}

          {this.state.listLimit.map(i => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={event => this.handleOnPageChange(event.target.text)}
                href="#"
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}

          {this.state.indexEnd >= this.state.pages ? null : (
            <PaginationItem>
              <PaginationLink onClick={() => this.handleNext()}>
                {" "}
                ...{" "}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last href="#" />
          </PaginationItem>
        </Pagination>
        <p> Current page = {this.state.currentPage}</p>

        {/* <p>{this.state.indexEnd}</p>
        <p>{this.state.pages}</p> */}
      </div>
    );
  }
}
