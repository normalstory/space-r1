import React, {Component} from 'react';

//컴포넌트(사용자정의 테그)를 만드는 코드영역
class Subject extends Component{
    //class 안에서는 function을 생략할 수 있다.
    render(){
      console.log('sub render');
      return(
        <header>  
          <h1><a href ="/" onClick={function(e){
            e.preventDefault();
            this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;
  