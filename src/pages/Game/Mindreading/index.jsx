import React, { useRef } from 'react'
import { Space, Button, Swiper } from 'antd-mobile'
import './index.css'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'
const Mindreading = () => {
  // 生成一个长度为128的数组
  const arr = Array.from(Array(128).keys());
  // 将数组中的每个数转换成7位二进制数，并用0在左边补齐
  const binaryArr = arr.map(num => num.toString(2).padStart(7, '0'));
  // 定义一个空数组result，用于存储每一位二进制数中为1的数的下标
  const result = [];
  // 定义一个ref，用于获取Swiper组件的实例
  const ref = useRef(null)
  // 遍历每一位二进制数
  for (let i = 0; i < 7; i++) {
    // 定义一个空数组subArr，用于存储当前位为1的数的下标  
    const subArr = [];
    // 遍历所有的二进制数
    for (let j = 0; j < binaryArr.length; j++) {
      // 如果当前位为1，将该数的下标存入subArr数组中
      if (binaryArr[j][i] === '1') {
        subArr.push(j);
      }
    }
    // 将subArr数组存入result数组中
    result.push(subArr);
  }

  return (
    <div className='content'>
      <Swiper allowTouchMove={false} ref={ref} indicator={() => null} loop >
        {
          result.map((innerArray, index) => (
            <Swiper.Item key={index}>
              <ul className='card-content'>
                {
                  innerArray.map((item, index) => (
                    <li className='card-item' key={index} >{item}</li>
                  )
                  )
                }
              </ul>

            </Swiper.Item>

          ))
        }
      </Swiper>
      {/* 添加上一张和下一张按钮 */}
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