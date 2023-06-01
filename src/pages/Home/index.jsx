import React from 'react';
import { Button} from 'antd-mobile';
import './index.css'
import duxin from '../../assets/img/icon/duxin.png'
import name from '../../assets/img/icon/name.png'

const Home = () => {
  const buttonList = [
    {
      title: '猜百家姓',
      link: '/guessingsurnames',
      tubiao:name
    },
    {
      title: '数字读心术',
      link: '/mindreading',
      tubiao:duxin
    },
  ];

  return (
   
      <div className="background">
         <div className="overlay">
        {buttonList.map((item) => (
            <Button key={item.title} shape='rounded' className='list-item' onClick={() => window.location.href = item.link} >
                 {/* <Space className='tubiao'><img style={{width:50}} src={item.tubiao} alt="myIcon" /></Space> */}
                 {item.title}</Button>
        ))}
        </div>
      </div>
  );
};

export default Home;
