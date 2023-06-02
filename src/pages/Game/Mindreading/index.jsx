import React, { useRef, useState } from 'react'
import { Space, Button, Swiper, ProgressBar, Modal } from 'antd-mobile'
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
  // 记录当前页数
  const [pages, setPages] = useState(0);
  // 使用useState来跟踪用户的点击，并将1或0添加到clicks数组中
  const [clicks, setClicks] = useState([]);
  // 存储转换后的十进制数
  const [decimal, setDecimal] = useState(null);
  // 处理用户点击按钮的函数
  const handleClick = (value) => {
    // 仅在数组长度小于7时添加值
    if (clicks.length < 7) {
      setClicks([...clicks, value]);
    }
  }
  // 将二进制数转换为十进制数的函数
  const binaryToDecimal = (binary) => {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
      decimal += binary[i] * Math.pow(2, binary.length - 1 - i);
    }
    return decimal;
  }
  return (
    <div className='content'>
      <Space block direction='vertical'>
        <ProgressBar
          percent={pages * 100 / 7}
          text={'已完成' + pages + '/7 页'}
          text-width='100'
          style={{
            '--fill-color': 'var(--adm-color-success)',
          }}
        />
      </Space>
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
      <Space align='center'>
        <Button disabled={pages >= 7} onClick={() => {
          handleClick(1); ref.current?.swipeNext(); setPages(pages + 1);
        }}>
          有
        </Button>
        <Button disabled={pages >= 7} onClick={() => {
          handleClick(0); ref.current?.swipeNext(); setPages(pages + 1);
        }}>
          没有
        </Button>
        <Button onClick={() => {
          pages >= 7 ? (Modal.show({
            content: '您猜中的数字为' + binaryToDecimal(clicks),
            closeOnMaskClick: true,
          })) : (Modal.show({
            content: '请选择完毕之后再点击确认',
            closeOnMaskClick: true,
          }))
          pages >= 7 && setPages(0);
          pages >= 7 && setClicks([]);
          console.log(clicks, pages);
        }}>
          确认
        </Button>
      </Space>
    </div >
  )
}

export default Mindreading