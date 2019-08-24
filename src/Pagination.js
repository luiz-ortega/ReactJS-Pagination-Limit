import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default class src extends Component {
  state = {
    startList: [],
    pages: 20,
    pagesLimit: 5,
    indexStart: 0,
    indexEnd: this.pagesLimit,
    list: [],
    listLimit: []
  };

  componentDidMount() {
    const startList = [...Array(this.state.pages + 1).keys()].slice(1);

    const pagesLimit = 5;
    const indexStart = 0;
    const indexEnd = pagesLimit;

    this.setState({
      ...this.state,
      list: startList,
      listLimit: startList.slice(indexStart, indexEnd),
      startList: startList,
      indexEnd: indexEnd
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
              <PaginationLink href="#">{i}</PaginationLink>
            </PaginationItem>
          ))}

          {this.state.indexEnd === this.state.pages ? null : (
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
      </div>
    );
  }
}
