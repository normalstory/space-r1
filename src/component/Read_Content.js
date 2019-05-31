import React, {Component} from 'react';

//컴포넌트(사용자정의 테그)를 만드는 코드영역
class ReadContent extends Component{
    //class 안에서는 function을 생략할 수 있다.
    render(){
      console.log('app render');
      return(
        <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      );
    }
  }
  export default ReadContent;