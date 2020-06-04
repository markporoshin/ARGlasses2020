import React, {Component} from 'react';
import  './FaceTest.css';
class FaceTest extends Component{
    constructor(){
        super();
        this.state = {
            imgs:[
                './images/faces/face1.jpg',
                './images/faces/face2.jpg',
                './images/faces/face3.jpg',
                './images/faces/face4.jpg',
                './images/faces/face.jpg'
               ],   
          showIndex: 0, // Show the first few pictures
          timer: null,  
          show: false   // Front and back button display
        }
    }
    render(){
        return (
            <div className="FaceTest">
                <div className="contain" 
                     onMouseEnter={()=>{this.stop()}} //Mouse enters to stop automatic playback
                     onMouseLeave={()=>{this.start()}}  //Mouse exits auto play
                >
                    <ul className="ul">
                        {
                            this.state.imgs.map((value, index) => {
                                return (
                                    <li className={index === this.state.showIndex ? 'show' : ''}
                                        key={index} 
                                    > 
                                        <img src={require(value + '')} alt="Carousel" />
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="dots" style={{width: this.state.imgs.length * 20 + 'px'}}> 
                        {
                            this.state.imgs.map((value, index) => {
                                return (
                                    <li key={index}  
                                        className={index === this.state.showIndex ? 'active' : ''} 
                                        onClick={()=>{this.change(index)}}>
                                    </li>)
                            })
                        }
                        
                    </ul>
                    <div className="control">
                        <span className="left"  onClick={(e)=>{this.previous(e)}}>left</span>
                        <span className="right" onClick={(e)=>{this.next(e)}}>right</span>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){ //一开始自动播放
        this.start();
    }
    componentWillUnmount() { //销毁前清除定时器
        this.stop();
    }
    stop = () => { 
        let {timer} = this.state;
        clearInterval(timer);
    }
    start = () => { 
        let {timer} = this.state;
        timer = setInterval(() => {
            this.next();
        }, 2000);
        this.setState({
            timer
        })
    }
    change = (index) => { // Click the button below to switch the currently displayed picture
        let {showIndex} = this.state;
        showIndex = index;
        this.setState({
            showIndex
        })
    }
    previous = (e) => { //previous
        let ev = e || window.event;
        let {showIndex, imgs} = this.state;
        if(showIndex <= 0){
            showIndex = imgs.length - 1;
        }else{
            showIndex --;
        }
        this.setState({
            showIndex
        })
    }
    next = (e) => { //next
        let ev = e || window.event;
        let {showIndex, imgs} = this.state;
        if(showIndex >= imgs.length - 1){
            showIndex = 0;
        }else{
            showIndex ++;
        }
        this.setState({
            showIndex
        })
    }
}
export default FaceTest;

