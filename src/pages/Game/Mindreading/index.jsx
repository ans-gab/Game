import React, { useRef } from 'react'
import { Space,Button,Swiper } from 'antd-mobile'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'
const Mindreading = () => {
  const arr = Array.from(Array(128).keys());
  const binaryArr = arr.map(num => num.toString(2).padStart(7,'0'));
  const result = [];
  const ref = useRef(null)
  for (let i = 0; i < 7; i++) {
    const subArr = [];
    for (let j = 0; j < binaryArr.length; j++) {
      if (binaryArr[j][i] === '1') {
        subArr.push(j);
      }
    }
    result.push(subArr);
  }
  
  return (
    <div className='content'>
      <Swiper allowTouchMove={false} ref={ref} indicator={() => null}  loop >
      {
        result.map((innerArray,index)=>(
          <Swiper.Item key={index}>
          <Space key={innerArray.index} wrap className='card-item' >
            {
              innerArray.map((item,index)=>(
                <Button key={index} >{item}</Button>
              )
              )
            }
          </Space>
          </Swiper.Item>
          
        ))
      }
      </Swiper>
      <Space>
            <Button
              onClick={() => {
                ref.current?.swipePrev()
              }}
            >
              上一张
            </Button>
            <Button
              onClick={() => {
                ref.current?.swipeNext()
              }}
            >
              下一张
            </Button>
          </Space>
    </div>
  )
}

export default Mindreading