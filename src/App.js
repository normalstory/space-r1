import React, {Component} from 'react';
import './App.css';

import TOC from "./component/TOC"
import ReadContent from "./component/Read_Content"
import CreateContent from "./component/Create_Content"
import UpdateContent from "./component/Update_Content"
import Subject from "./component/Subject"
import Control from "./component/Control"


class App extends Component{
  constructor(props){ 
    super(props); 

    this.count_contents_id=3;

    this.state={
      mode :"welcome", 
      welcome : {title:'welcome', desc:'hello react'},

      selected_content_id : 1,

      subject:{title:'WEB', sub:'world wide web !'},
      content:[
        {id:1, title:"HTML", desc:"HTML is HyperText "},
        {id:2, title:"CSS", desc:"Css is for design "},
        {id:3, title:"JS", desc:"javascript is for intrective "}
      ]
    }
  }
  
  getReadContent(){
    console.log('- getReadContent(선택한 콘텐츠 출력)');
    var i =0;
    while(i<this.state.content.length){
      var data = this.state.content[i];
      if(data.id === this.state.selected_content_id){
        return data;
        // _title=data.title; // <- _title는 이제 사용하지 않는다.
        // _desc=data.desc;
        //break;
      }
      i++; 
    }
    //return data;
  }

  getContents(){
    console.log('- getContents()');
    var _title, _desc,_content = null;
    if(this.state.mode === 'welcome'){
      _title=this.state.welcome.title;
      _desc=this.state.welcome.desc;
      _content = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){

      var _cdata = this.getReadContent(); // 함수로 바뀐 부분!의 리턴(data)값을 담기위해 변수를 선언한다.
      //debugger;
      _content = <ReadContent title={_cdata.title} desc={_cdata.desc}></ReadContent>  //_cdata._title가 아니다! ㅋ 
    }else if(this.state.mode === 'create'){
      _content = <CreateContent onSubmit={function(_title, _desc){
        var _new_content = this.state.content.concat({
          id:this.count_contents_id, title:_title, desc:_desc
        });
        this.setState({
          content: _new_content,
          mode:"read"
        });
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){
      _cdata = this.getReadContent(); 
      _content = <UpdateContent 
      data={_cdata}
      onSubmit={function(_id, _title, _desc){ 

        var _ucontents = Array.from(this.state.content);
        var i =0;
        while(i<_ucontents.length){
          if(_ucontents[i].id ===_id){  
            _ucontents[i]={id:_id, title:_title, desc:_desc};
            break;
          }
          i++;
        }
        this.setState({
          content: _ucontents,
          mode:"read"
        });
      }.bind(this)}></UpdateContent>
    }

    return _content;
  }

  render(){
    console.log('APP render');
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}

          onChangePage={function(){
            this.setState({
              mode:'welcome'
            });
          }.bind(this)}
          >
        </Subject>

         <TOC 
          data={this.state.content}
          onChangePage={function(id){
            this.setState({
              mode : 'read',
              selected_content_id : Number(id)
            })
          }.bind(this)}
         ></TOC>

        <Control onChangeMode={function(_mode){
          if(_mode==='delete'){
            if(window.confirm('really?')){
              var _dcontent = Array.from(this.state.content);
              var i =0;
              while(i<_dcontent.length){
                if(_dcontent[i].id === this.state.selected_content_id){
                  _dcontent.splice(i,1);
                  break;
                }
                i++;
              }
              this.setState({
                mode:"welcome",
                content:_dcontent
              })
            }
          }else{
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>

        {/* {_content} */}
        {this.getContents()}
      </div>
    );
  }
}
export default App;
